import { exec } from 'child_process'

function runShellScript(scriptPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Ошибка выполнения: ${error}`)
        return
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
      }
      resolve(stdout)
    })
  })
}

// Пример использования функции
const scriptPath = 'путь/к/вашему/скрипту.sh'

runShellScript(scriptPath)
  .then((output) => console.log(`Результат выполнения: ${output}`))
  .catch((error) => console.error(error))
