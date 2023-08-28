pipeline {
  agent any
  stages {
    stage('') {
      steps {
        sh '''touch .env
echo \'REACT_APP_API_HOST=http://192.168.68.119\' >> .env
echo "Chennai@119" | sudo -S docker buld -t react-app-image .
echo "Chennai@119" | sudo -S docker run -d -p 3001:3000 --name dns-manager  react-app-image'''
      }
    }

  }
}