import re

source_file = r'c:\dora-metrics\public\engineering-notes\posts\aws-eks-terraform-helm.html'
dest_file = r'c:\dora-metrics\public\engineering-notes\posts\k8s-deployment-strategies.html'

with open(source_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

head_part = html_content.split('<main id="content">')[0]
tail_part = '</main>\n</body>\n</html>'

# Let's adjust the head part for the new title
head_part = head_part.replace('<title lang="en">AWS EKS Cluster Setup with Terraform, Helm, and Complete Observability</title>', '<title lang="en">Deployment Strategy as the "Rules of the Game": How Kubernetes Replaces Your Old Code</title>')
head_part = head_part.replace('<title lang="fr">Configuration d\'un Cluster AWS EKS avec Terraform, Helm et Observabilité Complète</title>', '<title lang="fr">Stratégie de Déploiement : Les "Règles du Jeu" de Kubernetes pour Remplacer Votre Code</title>')

new_en_content = """
        <!-- ENGLISH VERSION -->
        <div lang="en">
            <article>
        <header>
            <div class="meta">April 2026 • Container Orchestration • 5 min read</div>
            <h1>Deployment Strategy as the "Rules of the Game": How Kubernetes Replaces Your Old Code</h1>
        </header>

        <section id="introduction">
            <h2>The "Rules of the Game"</h2>
            <p>Every time you push a new version of your application to a Kubernetes cluster, you need a strategy to ensure the old code is seamlessly replaced by the new code. These strategies act as the <em>Rules of the Game</em>.</p>
            <p>Here, we will break down a specific resource-constrained configuration (the "Tight Cluster"), compare it against the standard strategies available in Kubernetes natively, and explore advanced paradigms.</p>
        </section>

        <section id="tight-cluster-strategy">
            <h2>1. The "Tight Cluster" Strategy</h2>
            <p>In environments with heavy workloads—such as large AI models—where your nodes have virtually no spare CPU, a standard deployment can lead to "Insufficient CPU" errors. To solve this, we adjust the deployment strategy parameters.</p>
            
<pre><code class="language-yaml">strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 0
    maxUnavailable: 1</code></pre>

            <ul>
                <li><strong><code>maxSurge: 0</code></strong>: This tells Kubernetes: <em>"Do not create any extra pods."</em> Usually, Kubernetes tries to start the new pod before killing the old one (to avoid downtime). By setting this to 0, you force it to wait.</li>
                <li><strong><code>maxUnavailable: 1</code></strong>: This tells Kubernetes: <em>"It is okay if 1 pod is offline during the update."</em></li>
            </ul>

            <h3>The Result</h3>
            <p>Because you have no extra CPU space on your nodes, Kubernetes intentionally kills the old pod first (releasing its CPU reservation), and then starts the new pod in that freshly emptied space.</p>
            <ul>
                <li><strong>PRO:</strong> Solves "Insufficient CPU" errors completely.</li>
                <li><strong>CON:</strong> If you only have 1 replica, you will experience a fleeting 10–30 seconds of downtime while the old pod stops and the new model loads.</li>
            </ul>
        </section>

        <section id="main-strategies">
            <h2>2. The Two Main Kubernetes Strategies</h2>
            
            <h3>Type A: RollingUpdate (The Default &amp; Professional Choice)</h3>
            <p>This is the standard for modern web applications. It replaces pods incrementally, ensuring minimal disruption.</p>
            <ul>
                <li><strong>Default Behavior:</strong> Usually <code>maxSurge: 25%</code> and <code>maxUnavailable: 25%</code>.</li>
                <li><strong>Use Case:</strong> High-availability apps where you demand Zero Downtime.</li>
                <li><strong>Requirement:</strong> Your cluster must have enough "spare" capacity (CPU/RAM) to run a few extra pods during the transition.</li>
            </ul>

            <h3>Type B: Recreate (The "Clean Slate" Choice)</h3>
            <p>This is a brutal but sometimes necessary "Kill all, then Start all" approach.</p>
            <ul>
                <li><strong>Mechanism:</strong> It completely shuts down all version 1 pods, waits for them to terminate, and only then starts the version 2 pods.</li>
                <li><strong>Use Case (Singleton Apps):</strong> If your application (like a legacy database engine) cannot tolerate two versions running simultaneously without corrupting state.</li>
                <li><strong>Use Case (Resource Constrained):</strong> When the cluster is exceptionally small and absolutely cannot afford any surge.</li>
                <li><strong>Downside:</strong> Guaranteed total downtime during the swap.</li>
            </ul>
        </section>

        <section id="comparison">
            <h2>3. Comparison &amp; Use Cases</h2>
            <div style="overflow-x:auto;">
                <table style="width:100%; text-align:left; border-collapse: collapse; margin-bottom: 24px;">
                    <tr style="border-bottom: 1px solid var(--border);">
                        <th style="padding: 12px 8px;">Strategy</th>
                        <th style="padding: 12px 8px;">maxSurge</th>
                        <th style="padding: 12px 8px;">maxUnavailable</th>
                        <th style="padding: 12px 8px;">Downtime?</th>
                        <th style="padding: 12px 8px;">Best For...</th>
                    </tr>
                    <tr style="border-bottom: 1px dashed var(--border);">
                        <td style="padding: 12px 8px;"><strong>Standard Rolling</strong></td>
                        <td style="padding: 12px 8px;">25%</td>
                        <td style="padding: 12px 8px;">25%</td>
                        <td style="padding: 12px 8px; color: #10b981;">None</td>
                        <td style="padding: 12px 8px;">Web APIs, Frontends, Microservices.</td>
                    </tr>
                    <tr style="border-bottom: 1px dashed var(--border);">
                        <td style="padding: 12px 8px;"><strong>Tight Rolling</strong> <em>(The AI Setup)</em></td>
                        <td style="padding: 12px 8px;">0</td>
                        <td style="padding: 12px 8px;">1</td>
                        <td style="padding: 12px 8px; color: #f59e0b;">Short</td>
                        <td style="padding: 12px 8px;">Heavy AI Engines, tightly-packed clusters.</td>
                    </tr>
                    <tr style="border-bottom: 1px dashed var(--border);">
                        <td style="padding: 12px 8px;"><strong>Recreate</strong></td>
                        <td style="padding: 12px 8px;">N/A</td>
                        <td style="padding: 12px 8px;">N/A</td>
                        <td style="padding: 12px 8px; color: #ef4444;">Longer</td>
                        <td style="padding: 12px 8px;">Batch jobs, DB migrations, Singleton apps.</td>
                    </tr>
                </table>
            </div>
        </section>

        <section id="advanced-strategies">
            <h2>4. Advanced "Pro" Strategies (Argo Rollouts)</h2>
            <p>Standard Kubernetes natively supports only the strategies mentioned above. However, by introducing tools like <strong>Argo Rollouts</strong> (often paired with ArgoCD), you can implement "Next Level" robust release pipelines:</p>

            <h3>Blue/Green Deployments</h3>
            <p>You spin up a completely isolated second environment (Green). You test it thoroughly. Once validated, you flip a switch at the Service or Ingress layer to route all traffic there instantly.</p>
            <ul>
                <li><strong>Pro:</strong> Instant, zero-friction rollback.</li>
                <li><strong>Con:</strong> Temporarily consumes double the hardware resources (CPU/RAM) during the test phase.</li>
            </ul>

            <h3>Canary Deployments</h3>
            <p>You bleed exactly 10% of traffic to the new version while 90% stays on the old. Check the metrics. If there are no 500 errors, dial it up to 50%, then 100%.</p>
            <ul>
                <li><strong>Pro:</strong> Unquestionably the safest way to release code to production.</li>
            </ul>
        </section>

        <section id="best-practices">
            <h2>5. Best Practice Recommendations</h2>
            <ul>
                <li><strong>For Heavy AI Engines:</strong> Stick to the <code>maxSurge: 0</code> &amp; <code>maxUnavailable: 1</code> setup. Because your pods are heavy, trying to "surge" will predictably fail on saturated nodes unless you drastically autoscale your cluster.</li>
                <li><strong>For Small Web Apps:</strong> Use the default <code>RollingUpdate</code> (remove the maxSurge/maxUnavailable lines completely). The seamless cutover provides the best UX.</li>
                <li><strong>Always Use Probes:</strong> No matter your strategy, if you omit <code>readinessProbes</code>, Kubernetes assumes the new pod is "Ready" the millisecond the container process starts—even if your heavyweight AI model is still loading 5GB into RAM into memory. This leads to dropped traffic.</li>
            </ul>
        </section>

        <section id="conclusion">
            <h2>Summary</h2>
            <p>If you're operating on a cluster that's almost full, the "Tight Cluster" (RollingUpdate with 0 surge) configuration is a thoroughly professional way to handle high-resource pods. It guarantees the "old" hardware reservation is physically deleted <em>before</em> the "new" reservation is demanded, safeguarding your cluster from frustrating sizing deadlocks.</p>
        </section>
            </article>
        </div>
"""

new_fr_content = """
        <!-- FRENCH VERSION -->
        <div lang="fr">
            <article>
        <header>
            <div class="meta">Avril 2026 • Orchestration de Conteneurs • 5 min de lecture</div>
            <h1>Stratégie de Déploiement : Les "Règles du Jeu" de Kubernetes pour Remplacer Votre Code</h1>
        </header>

        <section id="introduction-fr">
            <h2>Les "Règles du Jeu"</h2>
            <p>Chaque fois que vous poussez une nouvelle version de votre application sur un cluster Kubernetes, vous avez besoin d'une stratégie pour que l'ancien code soit remplacé de manière transparente. Ces stratégies sont les véritables <em>Règles du Jeu</em>.</p>
            <p>Ici, nous détaillerons une configuration spécifique pour les contraintes de ressources (le "Tight Cluster"), la comparerons aux stratégies standards de Kubernetes et aborderons des paradigmes plus avancés.</p>
        </section>

        <section id="tight-cluster-strategy-fr">
            <h2>1. La Stratégie du "Tight Cluster"</h2>
            <p>Dans les environnements avec de lourdes charges—comme de gros modèles IA—où vos nœuds n'ont pratiquement aucun CPU libre, un déploiement standard provoque des erreurs "Insufficient CPU". Pour contourner cela, nous ajustons les paramètres.</p>
            
<pre><code class="language-yaml">strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 0
    maxUnavailable: 1</code></pre>

            <ul>
                <li><strong><code>maxSurge: 0</code></strong>: Cela dit à Kubernetes: <em>"Ne crée aucun pod supplémentaire."</em> Habituellement, Kubernetes essaie de démarrer le nouveau avant de tuer l'ancien. À 0, on le force à attendre.</li>
                <li><strong><code>maxUnavailable: 1</code></strong>: Cela dit à Kubernetes: <em>"Il est acceptable qu'1 pod soit hors ligne pendant la mise à jour."</em></li>
            </ul>

            <h3>Le Résultat</h3>
            <p>Comme vous n'avez pas d'espace CPU supplémentaire, Kubernetes tue intentionnellement l'ancien pod d'abord (libérant sa réservation CPU), puis démarre le nouveau dans cet espace fraîchement vidé.</p>
            <ul>
                <li><strong>POUR :</strong> Résout complètement les erreurs "Insufficient CPU".</li>
                <li><strong>CONTRE :</strong> S'il n'y a qu'un seul réplica, vous aurez une courte coupure de 10-30 secondes le temps que le nouveau modèle se charge.</li>
            </ul>
        </section>

        <section id="main-strategies-fr">
            <h2>2. Les Deux Stratégies Principales de Kubernetes</h2>
            
            <h3>Type A : RollingUpdate (Le Choix par Défaut &amp; Professionnel)</h3>
            <p>Le standard pour les applications web, remplaçant les pods progressivement.</p>
            <ul>
                <li><strong>Comportement :</strong> Généralement <code>maxSurge: 25%</code> et <code>maxUnavailable: 25%</code>.</li>
                <li><strong>Cas d'usage :</strong> Applications à haute disponibilité visant le "Zéro Temps d'Arrêt" (Zero Downtime).</li>
                <li><strong>Pré-requis :</strong> Le cluster doit avoir assez de capacité "CPU/RAM de réserve" pour faire tourner les pods supplémentaires.</li>
            </ul>

            <h3>Type B : Recreate (L'Approche "Table Rase")</h3>
            <p>Une approche plus agressive : "Tuer tout, puis Tout démarrer".</p>
            <ul>
                <li><strong>Mécanisme :</strong> Éteint totalement l'ancienne version, attend, et enclenche la version 2 une fois l'espace libéré.</li>
                <li><strong>Cas d'usage :</strong> Applications qui ne peuvent physiquement pas tolérer la coexistence de deux versions (par ex. pour l'intégrité d'une base de données).</li>
                <li><strong>Inconvénient :</strong> Une indisponibilité totale garantie le temps de la transition.</li>
            </ul>
        </section>

        <section id="advanced-strategies-fr">
            <h2>3. Stratégies "Pro" Avancées (Argo Rollouts)</h2>
            <p>Avec Kubernetes seul, on s'arrête là. Mais avec <strong>Argo Rollouts</strong> (souvent couplé à ArgoCD), on accède aux déploiements de "Niveau Supérieur" :</p>

            <h3>Blue/Green Deployments</h3>
            <p>Vous montez un deuxième environnement complet et isolé (Vert). Vous testez. Si tout va bien, basculez le trafic via le Service d'un coup.</p>
            <ul>
                <li><strong>Avantage :</strong> Rollback instantané.</li>
                <li><strong>Inconvénient :</strong> Requiert temporairement le double de ressources matérielles pendant le test.</li>
            </ul>

            <h3>Canary Deployments</h3>
            <p>Envoyez 10% du trafic vers la nouvelle version. Surveillez les métriques d'erreur. Si c'est ok, passez à 50%, puis 100%.</p>
            <ul>
                <li><strong>Avantage :</strong> Le moyen le plus sûr et progressif de libérer du code.</li>
            </ul>
        </section>

        <section id="best-practices-fr">
            <h2>4. Recommandations de Bonnes Pratiques</h2>
            <ul>
                <li><strong>Moteurs IA Lourds :</strong> Restez sur <code>maxSurge: 0</code> et <code>maxUnavailable: 1</code>. Un "surge" échouera systématiquement à cause de la taille écrasante des conteneurs.</li>
                <li><strong>Petites Apps Web :</strong> Servez-vous du RollingUpdate classique (effacez maxSurge). Ce sera bien plus transparent pour l'utilisateur.</li>
                <li><strong>Utilisez les Probes :</strong> Peu importe votre stratégie, n'oubliez pas les <code>readinessProbes</code> ! Sans cela, Kubernetes enverra du trafic à une intelligence artificielle dont la RAM ou le modèle ne sont pas encore chargés.</li>
            </ul>
        </section>

        <section id="conclusion-fr">
            <h2>En Résumé</h2>
            <p>Garder votre configuration actuelle "Tight Cluster" (RollingUpdate avec 0 surge) est la façon la plus mature de gérer des pods surdimensionnés sur un cluster quasi complet. Cela assure que l'ancienne allocation soit supprimée AVANT qu'une nouvelle ne soit requise, évitant que votre cluster ne se retrouve coincé.</p>
        </section>
            </article>
        </div>
"""

final_html = head_part + '<main id="content">\n' + new_en_content + new_fr_content + tail_part

with open(dest_file, 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Created " + dest_file)
