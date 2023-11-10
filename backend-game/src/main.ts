type Warrior = {
  health: number
  attack: number
  team: number // Identifies the team of the warrior (1 or 2)
  x: number // X-coordinate on the field
  y: number // Y-coordinate on the field
}

class GameField {
  private warriors: Warrior[]
  private width: number = 8 // Field width
  private height: number = 8 // Field height

  constructor(warriors: Warrior[]) {
    this.warriors = warriors
  }

  // Checks if the target position is free
  private isPositionFree(x: number, y: number): boolean {
    return !this.warriors.some((warrior) => warrior.x === x && warrior.y === y)
  }

  // Checks if there is an enemy nearby the warrior
  private isEnemyNearby(warrior: Warrior): Warrior | null {
    for (const enemy of this.warriors) {
      if (enemy.team !== warrior.team && Math.abs(enemy.x - warrior.x) <= 1 && Math.abs(enemy.y - warrior.y) <= 1) {
        return enemy
      }
    }
    return null
  }

  // Moves the warrior forward based on the team, considering field boundaries
  private moveWarrior(warrior: Warrior): boolean {
    let newX = warrior.x
    let newY = warrior.team === 1 ? warrior.y + 1 : warrior.y - 1

    if (newY >= 0 && newY < this.height && this.isPositionFree(newX, newY)) {
      warrior.x = newX
      warrior.y = newY
      console.log(`Warrior from Team ${warrior.team} moves to (${warrior.x}, ${warrior.y})`)
      return true
    } else {
      return false
    }
  }

  // Performs an attack if an enemy is nearby
  private attackIfPossible(warrior: Warrior): boolean {
    const enemy = this.isEnemyNearby(warrior)
    if (enemy) {
      enemy.health -= warrior.attack
      console.log(`Warrior from Team ${warrior.team} attacks an enemy from Team ${enemy.team}`)
      return true
    } else {
      return false
    }
  }

  // Simulates one tick (step) of the game
  public simulateTick(): boolean {
    let actionOccurred = false

    this.warriors.forEach((warrior) => {
      const initialPosition = { x: warrior.x, y: warrior.y }
      const isMove = this.moveWarrior(warrior)
      const isAttack = this.attackIfPossible(warrior)

      if (isMove || isAttack) {
        actionOccurred = true
      }
    })

    this.warriors = this.warriors.filter((warrior) => warrior.health > 0)

    return actionOccurred
  }

  // Checks if the game is over (only one team left or no action in a tick)
  public isGameOver(lastTickAction: boolean): boolean {
    const teams = new Set(this.warriors.map((warrior) => warrior.team))
    return teams.size <= 1 || !lastTickAction
  }

  // Runs the game until it's over
  public runGame() {
    let tickCount = 0
    let actionOccurred: boolean

    do {
      console.log(`Tick ${++tickCount}`)
      actionOccurred = this.simulateTick()
    } while (!this.isGameOver(actionOccurred))

    const winningTeam = this.warriors.length > 0 ? this.warriors[0].team : 'None'
    console.log(`Game Over. Winning team: ${winningTeam}`)
  }
}

// Example of usage
const initialWarriors: Warrior[] = [
  { health: 100, attack: 10, team: 1, x: 0, y: 0 },
  { health: 200, attack: 10, team: 2, x: 0, y: 8 },
]

const game = new GameField(initialWarriors)
game.runGame()
