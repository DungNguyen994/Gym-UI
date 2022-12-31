pipeline{
    agent {
    // this image provides everything needed to run Cypress
         docker {
            image 'cypress/base:latest'
        }
    }

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
             environment {
                CYPRESS_RECORD_KEY = credentials('cypress-record-key')
            } 
            steps{
              sh "yarn test:ci:record"
            }
        }
    }
}
