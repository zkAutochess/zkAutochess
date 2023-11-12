import { exec } from 'child_process'
import { Wallet, ethers, getDefaultProvider } from 'ethers'
import { ValidConfig } from '../config'
import { CONTRACT_ABI, CONTRACT_METHOD_VERIFY } from '../config/config.const'

export const runShellScript = (scriptPath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error when run shell script ${error}`)
        return
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
      }
      resolve(stdout)
    })
  })
}

export const findFiles = (dir: string, pattern: RegExp): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    exec(`find ${dir} -type f -regex "${pattern}"`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error when find files ${error}`)
        return
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
      }
      resolve(stdout.split('\n').filter((file) => file))
    })
  })
}

export const readFile = (path: string): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    exec(`cat ${path}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error when read file ${error}`)
        return
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
      }

      const json = JSON.parse(stdout)
      resolve(json)
    })
  })
}

export const writeJsonFile = (path: string, data: Record<any, any>): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(`echo "${JSON.stringify(data)}" > ${path}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error when write file ${error}`)
        return
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
      }
      resolve()
    })
  })
}

export const executeContractMethod = async (args: { blob: string; init_params: number[]; columns_rotations: number[][]; public_input: number[]; gate_argument: string }) => {
  try {
    const provider = getDefaultProvider(ValidConfig.RPC_URL)
    const wallet = new Wallet(ValidConfig.PRIV_KEY, provider)

    const contract = new ethers.Contract(ValidConfig.CONTRACT_ADDRESS, CONTRACT_ABI, wallet)

    const txData = await contract[CONTRACT_METHOD_VERIFY].populateTransaction(args)
    const populateByWallet = await wallet.sendTransaction(txData)
    const signTx = await wallet.signTransaction(populateByWallet)
    const tx = await wallet.provider?.broadcastTransaction(signTx)
    await tx?.wait()

    return tx?.hash
  } catch (err: any) {
    console.log(`Error when execute contract method: ${err}`)
    return undefined
  }
}
