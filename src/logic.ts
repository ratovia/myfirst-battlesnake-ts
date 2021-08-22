import { InfoResponse, GameState, MoveResponse, Game } from "./types"

export function info(): InfoResponse {
    console.log("INFO")
    const response: InfoResponse = {
        apiversion: "1",
        author: "ratovia",
        color: "#49da78",
        head: "silly",
        tail: "bolt"
    }
    return response
}

export function start(gameState: GameState): void {
    console.log(`${gameState.game.id} START`)
}

export function end(gameState: GameState): void {
    console.log(`${gameState.game.id} END\n`)
}

export function move(gameState: GameState): MoveResponse {
    let possibleMoves = {
        up: true,
        down: true,
        left: true,
        right: true
    }

    // 自分自身にぶつからない
    const myHead = gameState.you.head
    const myNeck = gameState.you.body[1]
    if (myNeck.x < myHead.x) {
        possibleMoves.left = false
    } else if (myNeck.x > myHead.x) {
        possibleMoves.right = false
    } else if (myNeck.y < myHead.y) {
        possibleMoves.down = false
    } else if (myNeck.y > myHead.y) {
        possibleMoves.up = false
    }

    // 壁にぶつからない
    const boardWidth = gameState.board.width
    const boardHeight = gameState.board.height

    if (myHead.x === 0) {
        possibleMoves.left = false
    } 
    if (myHead.x === boardWidth - 1) {
        possibleMoves.right = false
    }
    if (myHead.y === 0) {
        possibleMoves.down = false
    }
    if (myHead.y === boardHeight - 1) {
        possibleMoves.up = false
    }
    // 自分の体に当たらない
    const mybody = gameState.you.body
    mybody.forEach((body) =>{
      if (myHead.x - 1 === body.x && myHead.y === body.y) {
        possibleMoves.left = false
      }
      if (myHead.x + 1 === body.x && myHead.y === body.y) {
        possibleMoves.right = false
      }
      if (myHead.x === body.x && myHead.y - 1 === body.y) {
        possibleMoves.down = false
      }
      if (myHead.x === body.x && myHead.y + 1 === body.y) {
        possibleMoves.up = false
      }
    })
    // TODO: Step 3 - Don't collide with others.
    // Use information in gameState to prevent your Battlesnake from colliding with others.

    // TODO: Step 4 - Find food.
    // Use information in gameState to seek out and find food.

    // Finally, choose a move from the available safe moves.
    // TODO: Step 5 - Select a move to make based on strategy, rather than random.
    const safeMoves = Object.keys(possibleMoves).filter(key => possibleMoves[key as keyof typeof possibleMoves])
    const response: MoveResponse = {
        move: safeMoves[Math.floor(Math.random() * safeMoves.length)],
    }

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`)
    return response
}
