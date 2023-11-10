enum team {
  blue = 1,
  red = 2,
}

type Warrior = {
  health: number
  attack: number
  team: team // Identifies the team of the warrior (1 or 2)
  x: number // X-coordinate on the field
  y: number // Y-coordinate on the field
  name?: string
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
      console.log(`Warrior ${warrior.name} from Team ${warrior.team} moves to (${warrior.x}, ${warrior.y})`)
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
      console.log(`Warrior ${warrior.name} from Team ${warrior.team} attacks an enemy ${enemy.name} from Team ${enemy.team}`)
      return true
    } else {
      return false
    }
  }

  // Simulates one tick (step) of the game
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

    // Counting remaining warriors of each team
    const teamCounts = this.warriors.reduce((counts: Record<string, number>, warrior) => {
      console.log(`Warrior ${warrior.name} from Team ${warrior.team} is alive`)

      counts[warrior.team] = (counts[warrior.team] || 0) + 1
      return counts
    }, {})

    console.log(teamCounts)

    // Determining the winning team based on the number of remaining warriors
    const winningTeam = Object.keys(teamCounts).reduce((a, b) => (teamCounts[a] > teamCounts[b] ? a : b), 'None')

    console.log(`Game Over. Winning team: ${winningTeam}`)
  }
}

// Example of usage
const initialWarriors: Warrior[] = [
  { health: 100, attack: 10, team: team.blue, x: 0, y: 0, name: 'first1' },
  { health: 10, attack: 10, team: team.red, x: 0, y: 8, name: 'first2' },
  { health: 10, attack: 10, team: team.red, x: 8, y: 8, name: 'second2' },
]

const game = new GameField(initialWarriors)
game.runGame()
