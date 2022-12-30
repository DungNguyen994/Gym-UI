pipeline{
    agent any

    stages{
        stage('build'){
            sh 'yarn'
            sh 'yarn build'
        }
        
        stage('test'){
            sh 'yarn test'
        }
    }
}
