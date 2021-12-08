import { Card } from "./Card";

export interface Board{
    id: number
    board: Piles
}

export interface Piles{
    faceUp0: Card[]
    faceUp1: Card[]
    faceUp2: Card[]
    faceUp3: Card[]
    faceUp4: Card[]
    faceUp5: Card[]
    faceUp6: Card[]

    win0: Card[]
    win1: Card[]
    win2: Card[]
    win3: Card[]

    drawUp: Card[]
    drawDown: number

    faceDown0: number
    faceDown1: number
    faceDown2: number
    faceDown3: number
    faceDown4: number
    faceDown5: number
    faceDown6: number
}