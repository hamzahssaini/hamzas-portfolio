import re

source_file = r'c:\dora-metrics\public\engineering-notes\posts\aws-eks-terraform-helm.html'
dest_file = r'c:\dora-metrics\public\engineering-notes\posts\k8s-ray-ingress-troubleshooting.html'

with open(source_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

head_part = html_content.split('<main id="content">')[0]
tail_part = '</main>\n</body>\n</html>'

new_en_content = """
        <!-- ENGLISH VERSION -->
        <div lang="en">
            <article>
        <header>
            <div class="meta">March 2026 • Infrastructure & Networking • 6 min read</div>
            <h1>Architecting Resilient Connectivity for Ray Clusters on Kubernetes: A Troubleshooting Guide</h1>
        </header>

        <section id="executive-summary">
            <h2>Executive Summary</h2>
            <p>In distributed computing, Ray has become the standard for scaling AI and Python workloads. However, exposing a Ray Cluster (Dashboard, Client, and Serve) via an NGINX Ingress Controller often presents "Heisenbugs"—errors that appear and disappear after cluster restarts.</p>
            <p>This technical report documents a real-world scenario where a Ray Ingress setup failed due to security-hardened webhooks, missing Layer 4 mappings, and Node IP drift. It provides a "Best Practice" blueprint for a production-ready, static-entry configuration.</p>
        </section>

        <section id="the-challenge">
            <h2>1. The Challenge: "It worked yesterday, but not today."</h2>
            <p>A common symptom in Kubernetes is a configuration that works during the initial session but fails after a node reboot or pod reschedule. In this case, three distinct layers failed:</p>
            <ul>
                <li><strong>The Security Layer:</strong> Modern NGINX controllers (v1.10+) block <code>configuration-snippet</code> annotations to prevent code injection.</li>
                <li><strong>The Protocol Layer:</strong> Ray requires both HTTP (Dashboard/Serve) and raw TCP (Ray Client/GCS) traffic. Standard Ingress only handles HTTP.</li>
                <li><strong>The Infrastructure Layer:</strong> Hardcoded <code>externalIPs</code> in the Service became invalid as the underlying Node IPs changed during cluster lifecycle events.</li>
            </ul>
        </section>

        <section id="technical-deep-dive">
            <h2>2. Technical Deep-Dive: Root Cause Analysis</h2>
            
            <h3>A. The Admission Webhook Conflict</h3>
            <p>When trying to fix header issues, the use of <code>nginx.ingress.kubernetes.io/configuration-snippet</code> triggered a BadRequest.</p>
            <p><strong>Error:</strong> <code>admission webhook "validate.nginx.ingress.kubernetes.io" denied the request: risky annotation.</code></p>
            <p><strong>Cause:</strong> Security hardening in NGINX Ingress blocks custom snippets by default.</p>

            <h3>B. Missing Endpoints for TCP</h3>
            <p>The NGINX logs showed: <code>Service does not have any active Endpoint for TCP port 9000.</code></p>
            <p><strong>Cause:</strong> While the Ingress handled HTTP traffic on port 80, the NGINX controller was not configured to "listen" or "route" the specific Ray TCP ports (10001, 9000, 6379) via its internal ConfigMap.</p>

            <h3>C. The Static IP Problem</h3>
            <p>By using a list of multiple <code>externalIPs</code>, the architecture was fragile. If the node hosting the Ingress Controller moved, the traffic entry point broke.</p>
        </section>

        <section id="best-practice-solution">
            <h2>3. The Best-Practice Solution: "Pinned Gateway" Architecture</h2>
            <p>To resolve this, we implemented a Pinned Gateway Architecture. This ensures the Ingress Controller always lands on a specific, reliable node (IP .33) and utilizes the Host Network for maximum stability.</p>
            
            <h3>Step 1: Node Labeling (Persistence)</h3>
            <p>First, we mark our target gateway node to ensure Kubernetes always schedules the Ingress Controller there.</p>
<pre><code class="language-bash">kubectl label node &lt;your-node-name&gt; ingress-ready=true</code></pre>

            <h3>Step 2: Protocol Bridging (TCP ConfigMap)</h3>
            <p>We create a dedicated mapping for Ray's internal TCP protocols. This allows NGINX to handle non-HTTP traffic.</p>
<pre><code class="language-yaml">apiVersion: v1
kind: ConfigMap
metadata:
  name: tcp-services
  namespace: ingress-nginx
data:
  "10001": "raycluster/ray-cluster-kuberay-head-svc:10001"
  "9000": "raycluster/ray-cluster-kuberay-head-svc:9000"
  "6379": "raycluster/ray-cluster-kuberay-head-svc:6379"</code></pre>

            <h3>Step 3: Hardened Ingress Controller Deployment</h3>
            <p>We update the Ingress Controller to use <code>hostNetwork</code> and <code>nodeSelector</code>. This "pins" the controller to IP 192.168.1.33.</p>
<pre><code class="language-yaml">spec:
  template:
    spec:
      hostNetwork: true            # Use the physical Node IP directly
      dnsPolicy: ClusterFirstWithHostNet
      nodeSelector:
        ingress-ready: "true"      # Only run on our labeled .33 node
      containers:
      - args:
        - /nginx-ingress-controller
        - --tcp-services-configmap=$(POD_NAMESPACE)/tcp-services
        # ... other args</code></pre>

            <h3>Step 4: Clean, Snippet-Free Ingress Spec</h3>
            <p>By using <code>pathType: ImplementationSpecific</code> and the <code>rewrite-target</code> annotation, we avoid using "risky" snippets while maintaining full functionality for the Dashboard and Ray Serve.</p>
<pre><code class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ray-head-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  ingressClassName: nginx
  rules:
  - http:
      paths:
      - path: /ray(/|$)(.*)
        backend:
          service:
            name: ray-cluster-kuberay-head-svc
            port: { number: 8265 }</code></pre>
        </section>

        <section id="operational-best-practices">
            <h2>4. Operational Best Practices</h2>
            <p>To prevent future "Day 2" failures, follow these rules:</p>
            <ul>
                <li><strong>Prefer ingressClassName over Annotations:</strong> Modern K8s clusters require the <code>spec.ingressClassName</code> field for proper routing.</li>
                <li><strong>Trailing Slashes Matter:</strong> When using <code>rewrite-target</code>, always access the dashboard via <code>http://&lt;IP&gt;/ray/</code>. Missing the final <code>/</code> will cause CSS/JS assets to fail to load.</li>
                <li><strong>Avoid Hardcoded External IPs:</strong> Instead of listing IPs in the Service, use <code>nodeSelector</code> and <code>hostNetwork</code> for bare-metal clusters, or a proper LoadBalancer (like MetalLB) for virtual clusters.</li>
                <li><strong>Security Over Snippets:</strong> If you need custom Nginx headers, enable them globally in the Controller ConfigMap rather than locally in the Ingress object to pass security webhooks.</li>
            </ul>
        </section>

        <section id="conclusion">
            <h2>5. Conclusion</h2>
            <p>Connectivity issues in Kubernetes are rarely about a single broken line of code; they are usually about the interaction between security webhooks, network protocols, and scheduling logic. By pinning the Ingress Controller and properly mapping TCP services, we transform a fragile setup into a robust, production-ready AI gateway.</p>
            <p><em>Tools Used: Kubernetes, KubeRay, NGINX Ingress, YAML Engineering.</em></p>
            <p>This documentation is part of my DevOps Portfolio, showcasing my ability to resolve complex cloud-native networking challenges.</p>
        </section>
            </article>
        </div>
"""

new_fr_content = """
        <!-- FRENCH VERSION -->
        <div lang="fr">
            <article>
        <header>
            <div class="meta">Mars 2026 • Infrastructure & Réseaux • 6 min de lecture</div>
            <h1>Architecturer une Connectivité Résiliente pour les Clusters Ray sur Kubernetes : Guide de Dépannage</h1>
        </header>

        <section id="introduction-fr">
            <h2>Résumé Exécutif</h2>
            <p>Dans l'informatique distribuée, Ray est devenu la norme pour faire évoluer les charges de travail IA et Python. Cependant, exposer un Cluster Ray (Dashboard, Client et Serve) via un contrôleur d'ingress NGINX présente souvent des "Heisenbugs"—des erreurs qui apparaissent et disparaissent après le redémarrage du cluster.</p>
            <p>Ce rapport technique documente un scénario réel où une configuration Ray Ingress a échoué en raison de webhooks de sécurité renforcés, de mappages de couche 4 manquants et de la dérive des adresses IP des nœuds. Il fournit un modèle de "Meilleure Pratique" pour une configuration d'entrée statique prête pour la production.</p>
        </section>

        <section id="le-defi-fr">
            <h2>1. Le Défi : "Ça marchait hier, mais pas aujourd'hui."</h2>
            <p>Un symptôme courant dans Kubernetes est une configuration qui fonctionne lors de la session initiale mais échoue après le redémarrage d'un nœud ou la reprogrammation d'un pod. Dans ce cas, trois couches distinctes ont échoué :</p>
            <ul>
                <li><strong>La Couche Sécurité :</strong> Les contrôleurs NGINX modernes (v1.10+) bloquent les annotations <code>configuration-snippet</code> pour empêcher l'injection de code.</li>
                <li><strong>La Couche Protocole :</strong> Ray nécessite la gestion du trafic HTTP (Dashboard/Serve) ET TCP brut (Ray Client/GCS). L'Ingress standard ne gère que le HTTP.</li>
                <li><strong>La Couche Infrastructure :</strong> Les adresses <code>externalIPs</code> codées en dur dans le Service devenaient invalides lorsque les adresses IP des nœuds sous-jacents changeaient.</li>
            </ul>
        </section>

        <section id="technique-fr">
            <h2>2. Analyse Technique : Causes Profondes</h2>
            
            <h3>A. Le Conflit du Webhook d'Admission</h3>
            <p>En essayant de corriger les problèmes d'en-tête, l'utilisation de <code>nginx.ingress.kubernetes.io/configuration-snippet</code> a déclenché un BadRequest.</p>
            <p><strong>Erreur :</strong> <code>admission webhook "validate.nginx.ingress.kubernetes.io" denied the request: risky annotation.</code></p>
            <p><strong>Cause :</strong> Le renforcement de la sécurité dans NGINX Ingress bloque les extraits personnalisés par défaut.</p>

            <h3>B. Points de Terminaison Manquants pour TCP</h3>
            <p>Les journaux NGINX montraient : <code>Service does not have any active Endpoint for TCP port 9000.</code></p>
            <p><strong>Cause :</strong> Bien que l'Ingress gérait le trafic HTTP sur le port 80, le contrôleur NGINX n'était pas configuré pour router les ports TCP spécifiques de Ray (10001, 9000, 6379) via son ConfigMap interne.</p>

            <h3>C. Le Problème de l'IP Statique</h3>
            <p>En utilisant une liste de plusieurs <code>externalIPs</code>, l'architecture était fragile. Si le nœud hébergeant le contrôleur Ingress se déplaçait, le point d'entrée du trafic se cassait.</p>
        </section>

        <section id="solution-fr">
            <h2>3. La Solution : Architecture de "Passerelle Épinglée"</h2>
            <p>Pour résoudre ce problème, nous avons implémenté une architecture de passerelle épinglée. Cela garantit que le contrôleur Ingress atterrit toujours sur un nœud spécifique et fiable (IP .33) et utilise le réseau hôte (Host Network) pour une stabilité maximale.</p>
            
            <h3>Étape 1 : Étiquetage des Nœuds (Persistance)</h3>
            <p>Tout d'abord, nous marquons notre nœud cible pour nous assurer que Kubernetes y planifie toujours le contrôleur Ingress.</p>
<pre><code class="language-bash">kubectl label node &lt;votre-nom-de-noeud&gt; ingress-ready=true</code></pre>

            <h3>Étape 2 : Pontage de Protocole (TCP ConfigMap)</h3>
            <p>Nous créons un mappage dédié pour les protocoles TCP internes de Ray. Cela permet à NGINX de gérer le trafic non HTTP.</p>
<pre><code class="language-yaml">apiVersion: v1
kind: ConfigMap
metadata:
  name: tcp-services
  namespace: ingress-nginx
data:
  "10001": "raycluster/ray-cluster-kuberay-head-svc:10001"
  "9000": "raycluster/ray-cluster-kuberay-head-svc:9000"
  "6379": "raycluster/ray-cluster-kuberay-head-svc:6379"</code></pre>

            <h3>Étape 3 : Déploiement Renforcé du Contrôleur</h3>
            <p>Nous mettons à jour le contrôleur Ingress pour utiliser <code>hostNetwork</code> et <code>nodeSelector</code>. Cela "épingle" le contrôleur à l'IP 192.168.1.33.</p>
<pre><code class="language-yaml">spec:
  template:
    spec:
      hostNetwork: true            # Utilise directement l'IP physique du noeud
      dnsPolicy: ClusterFirstWithHostNet
      nodeSelector:
        ingress-ready: "true"      # Exécute uniquement sur notre noeud labellisé
      containers:
      - args:
        - /nginx-ingress-controller
        - --tcp-services-configmap=$(POD_NAMESPACE)/tcp-services</code></pre>

            <h3>Étape 4 : Spécification Ingress Propre</h3>
            <p>En utilisant <code>pathType: ImplementationSpecific</code> et l'annotation <code>rewrite-target</code>, nous évitons d'utiliser des scripts "risqués" tout en conservant toutes les fonctionnalités pour le Dashboard et Ray Serve.</p>
<pre><code class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ray-head-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  ingressClassName: nginx
  rules:
  - http:
      paths:
      - path: /ray(/|$)(.*)
        backend:
          service:
            name: ray-cluster-kuberay-head-svc
            port: { number: 8265 }</code></pre>
        </section>

        <section id="bonnes-pratiques-fr">
            <h2>4. Bonnes Pratiques Opérationnelles</h2>
            <ul>
                <li><strong>Préférez ingressClassName aux Annotations :</strong> Les clusters K8s modernes nécessitent le champ <code>spec.ingressClassName</code> pour un routage approprié.</li>
                <li><strong>Les Barres Obliques Finales Comptent :</strong> Lors de l'utilisation de <code>rewrite-target</code>, accédez toujours au dashboard via <code>http://&lt;IP&gt;/ray/</code>. S'il manque le <code>/</code> final, les actifs CSS/JS ne se chargeront pas.</li>
                <li><strong>Évitez les IP Externes Codées en Dur :</strong> Utilisez <code>nodeSelector</code> et <code>hostNetwork</code> pour les clusters bare-metal, ou un LoadBalancer approprié (comme MetalLB).</li>
                <li><strong>Sécurité avant les Scripts :</strong> Si vous avez besoin d'en-têtes Nginx personnalisés, activez-les globalement dans le ConfigMap du contrôleur.</li>
            </ul>
        </section>

        <section id="conclusion-fr">
            <h2>5. Conclusion</h2>
            <p>Les problèmes de connectivité dans Kubernetes concernent rarement une seule ligne de code cassée ; ils concernent généralement l'interaction entre les webhooks de sécurité, les protocoles réseau et la logique de planification. En épinglant le contrôleur Ingress et en mappant correctement les services TCP, nous transformons une configuration fragile en une passerelle IA robuste et prête pour la production.</p>
            <p><em>Outils : Kubernetes, KubeRay, NGINX Ingress, YAML Engineering.</em></p>
        </section>
            </article>
        </div>
"""

head_part = head_part.replace('<title lang="en">Architecting for Infinite Scale: Provisioning AWS EKS with Terraform & Helm</title>', '<title lang="en">Architecting Resilient Connectivity for Ray Clusters on Kubernetes</title>')
head_part = head_part.replace('<title lang="fr">Architecturer pour une Échelle Infinie : Provisionnement d\'AWS EKS avec Terraform & Helm</title>', '<title lang="fr">Architecturer une Connectivité Résiliente pour les Clusters Ray sur Kubernetes</title>')

with open(dest_file, 'w', encoding='utf-8') as f:
    f.write(head_part + '<main id="content">\n' + new_en_content + new_fr_content + tail_part)
