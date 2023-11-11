import { GameState, TeamEnum, Warrior, WarriorInput, WarriorState, WinnerEnum } from './game.interface'

export class GameField {
  private warriors: Warrior[] = []
  private width: number = 8
  private height: number = 8
  private gameStates: {
    states: GameState[]
    winner: WinnerEnum
  } = {
    states: [],
    winner: WinnerEnum.None,
  }
  private nextWarriorId: number = 0

  public addWarrior(warriorInput: WarriorInput) {
    const newWarrior: Warrior = {
      id: this.nextWarriorId++,
      health: 100,
      attack: 20,
      team: warriorInput.team,
      x: warriorInput.x,
      y: warriorInput.y,
    }
    this.warriors.push(newWarrior)
  }

  private isPositionFree(x: number, y: number): boolean {
    return !this.warriors.some((warrior) => warrior.x === x && warrior.y === y)
  }

  private isEnemyNearby(warrior: Warrior): Warrior | null {
    for (const enemy of this.warriors) {
      if (enemy.team !== warrior.team && Math.abs(enemy.x - warrior.x) <= 1 && Math.abs(enemy.y - warrior.y) <= 1) {
        return enemy
      }
    }
    return null
  }

  private moveWarrior(warrior: Warrior): boolean {
    let newX = warrior.x
    let newY = warrior.team === TeamEnum.Blue ? warrior.y + 1 : warrior.y - 1

    if (newY >= 0 && newY < this.height && this.isPositionFree(newX, newY)) {
      warrior.x = newX
      warrior.y = newY
      console.log(`Warrior ${warrior.id} from Team ${warrior.team} moves to (${warrior.x}, ${warrior.y})`)
      return true
    } else {
      return false
    }
  }

  private attackIfPossible(warrior: Warrior): boolean {
    const enemy = this.isEnemyNearby(warrior)
    if (enemy) {
      enemy.health -= warrior.attack
      console.log(`Warrior ${warrior.id} from Team ${warrior.team} attacks an enemy ${enemy.id} from Team ${enemy.team}`)
      return true
    } else {
      return false
    }
  }

  public simulateTick(): boolean {
    let actionOccurred = false

    this.warriors.forEach((warrior) => {
      const isMove = this.moveWarrior(warrior)
      const isAttack = this.attackIfPossible(warrior)

      if (isMove || isAttack) {
        actionOccurred = true
      }
    })

    this.warriors = this.warriors.filter((warrior) => warrior.health > 0)

    return actionOccurred
  }

  public isGameOver(lastTickAction: boolean): boolean {
    const teams = new Set(this.warriors.map((warrior) => warrior.team))
    return teams.size <= 1 || !lastTickAction
  }

  public runGame() {
    this.logField() // Log initial state
    let tickCount = 0
    let actionOccurred: boolean

    do {
      console.log(`Tick ${++tickCount}`)
      actionOccurred = this.simulateTick()
      this.logField()
    } while (!this.isGameOver(actionOccurred))

    this.gameStates.winner = this.determineWinner()
    console.log(`Game Over. Winning team: ${this.gameStates.winner}`)
  }

  private determineWinner(): WinnerEnum {
    const teamCounts = this.warriors.reduce((counts: Record<string, number>, warrior) => {
      counts[warrior.team] = (counts[warrior.team] || 0) + 1
      return counts
    }, {})

    if (teamCounts[TeamEnum.Blue] === teamCounts[TeamEnum.Red]) {
      return WinnerEnum.None // Ничья
    }

    const winner = Object.keys(teamCounts).reduce((a, b) => (teamCounts[a] > teamCounts[b] ? a : b))
    console.log(`Team ${winner} wins`)

    return Number(winner)
  }

  private logField(): void {
    const field: string[][] = Array.from({ length: this.height }, () => Array(this.width).fill('.'))
    const warriorStates: WarriorState[] = []

    this.warriors.forEach((warrior) => {
      field[warrior.y][warrior.x] = warrior.team === TeamEnum.Blue ? 'B' : 'R'
      warriorStates.push({
        id: warrior.id,
        team: warrior.team,
        health: warrior.health,
        x: warrior.x,
        y: warrior.y,
      })
    })

    const gameState: GameState = {
      tick: this.gameStates.states.length + 1,
      field,
      warriors: warriorStates,
    }

    this.gameStates.states.push(gameState)
  }

  public getGameStates(): { states: GameState[]; winner: WinnerEnum } {
    return this.gameStates
  }
}

export class GameRoom {
  private gameField: GameField
  private playersCount: number = 0

  constructor() {
    this.gameField = new GameField()
  }

  public addPlayer(playerId: string, warriors: WarriorInput[], team: TeamEnum) {
    warriors.forEach((warriorInput) => {
      this.gameField.addWarrior({ ...warriorInput, team }) // Добавить команду к воинам
    })
    this.playersCount++
  }

  public startGame(): {
    states: GameState[]
    winner: WinnerEnum
  } {
    if (this.playersCount < 2) {
      throw new Error('Not enough players to start the game')
    }

    this.gameField.runGame()
    return this.gameField.getGameStates()
  }

  public getGameStates(): {
    states: GameState[]
    winner: WinnerEnum
  } {
    return this.gameField.getGameStates()
  }

  public getPlayersCount(): number {
    return this.playersCount
  }
}

export class GameManager {
  private rooms: { [roomId: string]: GameRoom } = {}

  public createRoom(playerId: string, warriors: WarriorInput[]): string {
    const roomId = this.generateRoomId()
    const newRoom = new GameRoom()
    newRoom.addPlayer(playerId, warriors, TeamEnum.Blue)
    this.rooms[roomId] = newRoom
    return roomId
  }

  public joinRoom(
    roomId: string,
    playerId: string,
    warriors: WarriorInput[],
  ): {
    states: GameState[]
    winner: WinnerEnum
  } {
    if (!this.rooms[roomId]) {
      throw new Error('Room does not exist')
    }

    this.rooms[roomId].addPlayer(playerId, warriors, TeamEnum.Red)
    return this.rooms[roomId].startGame()
  }

  public getRoomState(roomId: string):
    | {
        states: GameState[]
        winner: WinnerEnum
      }
    | undefined {
    const room = this.rooms[roomId]
    return room ? room.getGameStates() : undefined
  }

  private generateRoomId(): string {
    return Math.random().toString(36).substring(2, 9)
  }

  public getAvailableRooms(): string[] {
    return Object.entries(this.rooms)
      .filter(([roomId, room]) => room.getPlayersCount() < 2)
      .map(([roomId, room]) => roomId)
  }
}
