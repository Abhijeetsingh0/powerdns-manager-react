pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        sh '''touch .env
echo \'REACT_APP_API_HOST=http://192.168.68.119\' >> .env
docker buld -t react-app-image .
docker run -d -p 3001:3000 --name dns-manager  react-app-image'''
      }
    }

  }
}