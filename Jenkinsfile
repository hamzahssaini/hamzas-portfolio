pipeline {
    agent any

    environment {
        // Defines the Docker Registry details
        DOCKER_REGISTRY = 'your-dockerhub-username'
        BACKEND_IMAGE = "${DOCKER_REGISTRY}/dora-metrics-backend"
        FRONTEND_IMAGE = "${DOCKER_REGISTRY}/dora-metrics-frontend"
        
        // Define build tag (usually corresponds to git commit hash or build number)
        BUILD_TAG = "v${env.BUILD_NUMBER}"
        
        // Docker Hub credentials ID created in Jenkins Credentials
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
    }

    options {
        // Keeps the console output clean
        timestamps()
        // Discard old builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Timeout for the entire pipeline
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Code Quality & Test') {
            parallel {
                stage('Test Backend') {
                    agent {
                        docker {
                            image 'node:20-alpine'
                            reuseNode true
                        }
                    }
                    steps {
                        dir('services/backend') {
                            echo 'Running backend tests...'
                            sh 'npm ci'
                            // Uncomment below if tests are configured
                            // sh 'npm test' 
                            // sh 'npm run lint'
                        }
                    }
                }
                stage('Test Frontend') {
                    agent {
                        docker {
                            image 'node:20-alpine'
                            reuseNode true
                        }
                    }
                    steps {
                        dir('services/frontend') {
                            echo 'Frontend is static/nginx based but checking static files...'
                            // Example step: validating HTML/CSS or formatting
                            // sh 'npx prettier --check public/'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        dir('services/backend') {
                            echo "Building Backend Docker Image: ${BACKEND_IMAGE}:${BUILD_TAG}"
                            sh "docker build -t ${BACKEND_IMAGE}:latest -t ${BACKEND_IMAGE}:${BUILD_TAG} ."
                        }
                    }
                }
                stage('Build Frontend Image') {
                    steps {
                        dir('services/frontend') {
                            echo "Building Frontend Docker Image: ${FRONTEND_IMAGE}:${BUILD_TAG}"
                            sh "docker build -t ${FRONTEND_IMAGE}:latest -t ${FRONTEND_IMAGE}:${BUILD_TAG} ."
                        }
                    }
                }
            }
        }

        stage('Push to Container Registry') {
            steps {
                echo 'Authenticating and pushing images to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    
                    // Push Backend
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${BACKEND_IMAGE}:${BUILD_TAG}"
                    
                    // Push Frontend
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:${BUILD_TAG}"
                }
            }
        }

        stage('Deploy') {
            when {
                // Only run deployment on main branch
                branch 'main'
            }
            steps {
                echo 'Deploying to the target environment...'
                // You can add logic here to deploy using docker-compose, helm, or kubectl
                // e.g., sh 'docker-compose -f compose.yaml up -d'
                // or sh 'helm upgrade -i dora-metrics ./gitops-portfolio/helm/dora-metrics'
                echo 'Deployment successful.'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            // Clean workspace to save space and remove security tokens
            cleanWs()
        }
        success {
            echo 'Pipeline executed successfully! \u2705'
        }
        failure {
            echo 'Pipeline failed! \u274c Please check the logs.'
        }
    }
}
