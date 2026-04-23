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
                // Jenkins에 Secret File로 등록된 .env.production 크리덴셜을 꺼내서
                // 빌드 컨텍스트에 .env.production 파일로 복사
                // Vite는 npm run build 시 .env.production을 읽어 환경변수를 번들에 포함시킴
                withCredentials([file(credentialsId: 'ENV_PRODUCTION_NOTE_FRONT', variable: 'ENV_FILE')]) {
                    // 기존 파일이 읽기 전용으로 남아있을 수 있어 먼저 삭제 후 복사
                    sh 'rm -f .env.production && cp $ENV_FILE .env.production'
                }
                // Docker 이미지 빌드 (Dockerfile 기준)
                sh 'docker build -t note-app-front .'
            }
        }

        stage('Deploy') {
            steps {
                // 기존에 실행 중인 컨테이너가 있으면 중지 (없어도 오류 무시)
                sh 'docker stop note-app-front || true'
                // 기존 컨테이너 삭제 (없어도 오류 무시)
                sh 'docker rm note-app-front || true'
                // 새 컨테이너 실행 (호스트 3000 → 컨테이너 3000 포트 매핑)
                sh 'docker run -d --name note-app-front -p 3000:3000 note-app-front'
            }
        }
    }
}