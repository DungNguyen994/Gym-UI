pipeline{
    agent any
    
    parameters{
        string(name: 'SPEC', defaultValue: "cypress/e2e/**/**", description: "Enter the script path that you want to execute")
        choice(name: "BROWSER", choices: ['chrome', 'edge', 'firefox'], description: "Choose the browser where you want to execute the scripts")
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
            steps{
              sh "yarn run cypress open --browser ${BROWSER} --spec ${SPEC}"
            }
        }
    }

    post{
        always{
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
        }
    }
}
