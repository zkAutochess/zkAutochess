export interface Game {
    states: {
        tick: number
        warriors: {
            id: number
            team: number
            health: number
            x: number
            y: number
        }[]
    }[]
    winner: number
}
