pipeline {
    agent any

    environment {
        IMAGE = "ghcr.io/dwils/user-service"
    }

    stages {
        stage('Test') {
            agent {
                docker {
                    image 'maven:3.9-eclipse-temurin-25'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                    reuseNode true
                }
            }
            steps {
                dir('user-service') {
                    sh 'mvn -B test -Dtest=\'!UserServiceApplicationTests,!UserRepositoryIntegrationTest\' -DfailIfNoTests=false'
                }
            }
        }

        stage('Build image') {
            steps {
                dir('user-service') {
                    sh "docker build -t ${IMAGE}:${env.BUILD_NUMBER} -t ${IMAGE}:latest ."
                }
            }
        }

        stage('Push image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ghcr-credentials', usernameVariable: 'GHCR_USER', passwordVariable: 'GHCR_TOKEN')]) {
                    sh 'echo $GHCR_TOKEN | docker login ghcr.io -u $GHCR_USER --password-stdin'
                    sh "docker push ${IMAGE}:${env.BUILD_NUMBER}"
                    sh "docker push ${IMAGE}:latest"
                }
            }
        }
    }
}
