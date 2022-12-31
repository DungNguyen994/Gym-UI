pipeline{
    agent any
    tools{
        nodejs "Node"
    }
    stages{
        stage('build'){
            steps{
                sh 'yarn'      
            }
        }
        
        stage('Testing'){ 
            agent {
                // this image provides everything needed to run Cypress
                docker {
                    image 'cypress/base:latest'
                }
            }
            environment {
                CYPRESS_RECORD_KEY = credentials('cypress-record-key')
            } 
            steps{
              sh "yarn test:ci:record"
            }
        }
    }
}
