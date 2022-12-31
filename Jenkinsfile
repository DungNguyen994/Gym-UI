pipeline{
    agent any
    tools{
        nodejs "Node"
        docker "docker"
    }
    stages{
        stage('build'){
            steps{
                sh 'yarn'      
            }
        }
        
        stage('Testing'){ 
             environment {
                CYPRESS_RECORD_KEY = credentials('cypress-record-key')
            } 
            steps{
              sh "yarn test:ci:record"
            }
        }
    }
}
