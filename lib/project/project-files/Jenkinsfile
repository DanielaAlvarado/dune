node {
    stage('Checkout') {
        checkout scm
    }
    stage('Build') {
        docker.image('node').inside {
            sh 'npm install'
        }
    }
    stage('Test') {
        docker.image('node').inside {
            sh 'npm run test'
        }
    }
}
