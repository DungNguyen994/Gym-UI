pipeline{
    agent any
    stages{
        stage('build'){
            steps{
                nodejs("Node"){
                    sh 'yarn'      
                    sh 'yarn'      
                }
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
