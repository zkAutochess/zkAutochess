import { create } from 'zustand'

export interface Position {
    x: number
    y: number
}

export interface Character {
    id: string | number
    position: Position
    team: 'my' | 'enemy'
    name: string
}

interface IGameFormStore {
    characters: Character[]
    moveCharacter: (characterId: string, newPosition: Position) => void
    addCharacter: (payload: { name: string; position: Position }) => void
    removeCharacter: (characterId: string | number) => void
    clearCharacter: () => void
}

export const useGameFormStore = create<IGameFormStore>((set) => ({
    characters: [],
    moveCharacter: (characterId: string, newPosition: Position) =>
        set((state: any) => ({
            characters: state.characters.map((character: Character) =>
                character.id === characterId ? { ...character, position: newPosition } : character,
            ),
        })),
    addCharacter: (payload: { name: string; position: Position }) =>
        set((state: any) => ({
            characters: [
                ...state.characters,
                {
                    name: payload.name,
                    position: payload.position,
                    id: new Date().getTime(),
                    team: 'my',
                },
            ],
        })),
    removeCharacter: (characterId: string | number) =>
        set((state: any) => ({
            characters: state.characters.filter(
                (character: Character) => character.id !== characterId,
            ),
        })),
    clearCharacter: () => set(() => ({ characters: [] })),
}))
