export const DEFAULT_HTTP_PORT = 3000
export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'blob',
        type: 'bytes',
      },
      {
        internalType: 'uint256[]',
        name: 'init_params',
        type: 'uint256[]',
      },
      {
        internalType: 'int256[][]',
        name: 'columns_rotations',
        type: 'int256[][]',
      },
      {
        internalType: 'uint256[]',
        name: 'public_input',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: 'gate_argument',
        type: 'address',
      },
    ],
    name: 'verify',
    outputs: [
      {
        internalType: 'bool',
        name: 'result',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export const CONTRACT_METHOD_VERIFY = 'verify'
