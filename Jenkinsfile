pipeline {
    agent any

    stages {
        // GitHub에서 코드 가져오기
        stage('Clone') {
            steps {
                checkout scm
            }
        }

         stage('Docker Build') {
             steps {
                 sh 'docker build -t note-app-front .'
             }
         }

        stage('Deploy') {
            steps {
                sh 'docker stop note-app-front || true'
                sh 'docker rm note-app-front || true'
                sh 'docker run -d --name note-app-front -p 3000:3000 note-app-front'
            }
        }
    }
}