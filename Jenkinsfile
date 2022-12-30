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
        
        stage('test'){
            steps{
                nodejs("Node"){
                    sh 'yarn test'
                }
            }
        }
    }
}
