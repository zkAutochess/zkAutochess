export enum TeamEnum {
  Blue = 1,
  Red = 2,
}

export enum WinnerEnum {
  Blue = 1,
  Red = 2,
  None = 3,
}

export type Warrior = {
  id: number
  health: 100
  attack: 20
  team: TeamEnum
  x: number
  y: number
}

export type WarriorInput = {
  team: TeamEnum
  x: number
  y: number
}

export type WarriorState = {
  id: number
  team: TeamEnum
  health: number
  x: number
  y: number
}

export type GameState = {
  tick: number
  field: string[][]
  warriors: WarriorState[]
}
