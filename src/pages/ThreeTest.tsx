import React, { useRef, useState, useEffect, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

class BasicPlayer {
  mesh: THREE.Mesh
  health: number

  constructor(color: number, positionX: number) {
    this.health = 100
    const geometry = new THREE.BoxGeometry(1, 2, 1)
    const material = new THREE.MeshBasicMaterial({ color })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.x = positionX
  }

  attack(opponent: BasicPlayer) {
    if (this.mesh.position.distanceTo(opponent.mesh.position) < 1.5) {
      opponent.health -= 10
      console.log(`Hit! Opponent Health: ${opponent.health}`)
    }
  }
}

const Game = () => {
  const player1Ref = useRef<BasicPlayer>(new BasicPlayer(0xff0000, -2))
  const player2Ref = useRef<BasicPlayer>(new BasicPlayer(0x0000ff, 2))
  const [player1Health, setPlayer1Health] = useState(100)
  const [player2Health, setPlayer2Health] = useState(100)
  const [timeLeft, setTimeLeft] = useState(60)
  const keys = useRef({
    ArrowLeft: false,
    ArrowRight: false,
    KeyA: false,
    KeyD: false,
  })

  const handleKeyDown = (event: KeyboardEvent) => {
    keys.current[event.code] = true
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    keys.current[event.code] = false
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0))
    }, 1000)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      clearInterval(interval)
    }
  }, [])

  const updatePositions = useCallback(() => {
    const player1 = player1Ref.current
    const player2 = player2Ref.current

    const originalPosition1 = player1.mesh.position.clone()
    const originalPosition2 = player2.mesh.position.clone()

    const movePlayer = (player, direction) => {
      if (direction === "left") player.mesh.position.x -= 0.1
      if (direction === "right") player.mesh.position.x += 0.1

      // 화면 밖으로 나가지 않도록 제한
      const screenWidth = window.innerWidth / 50
      player.mesh.position.x = Math.max(
        Math.min(player.mesh.position.x, screenWidth / 2 - 0.5),
        -screenWidth / 2 + 0.5,
      )
    }

    if (keys.current["ArrowLeft"]) movePlayer(player1, "left")
    if (keys.current["ArrowRight"]) movePlayer(player1, "right")
    if (keys.current["KeyA"]) movePlayer(player2, "left")
    if (keys.current["KeyD"]) movePlayer(player2, "right")

    // 충돌 방지 로직
    const playerWidth = 1
    const distance = player1.mesh.position.distanceTo(player2.mesh.position)
    if (distance < playerWidth) {
      if (keys.current["ArrowLeft"] || keys.current["ArrowRight"]) {
        player1.mesh.position.copy(originalPosition1)
      }
      if (keys.current["KeyA"] || keys.current["KeyD"]) {
        player2.mesh.position.copy(originalPosition2)
      }
    }

    if (keys.current["ArrowUp"]) player1.attack(player2)
    if (keys.current["KeyW"]) player2.attack(player1)

    setPlayer1Health(player1.health)
    setPlayer2Health(player2.health)
  }, [])

  return (
    <div>
      <div>Player 1 Health: {player1Health}</div>
      <div>Player 2 Health: {player2Health}</div>
      <div>Time Left: {timeLeft}</div>
      <Canvas
        orthographic
        camera={{ zoom: 50, position: [0, 0, 10] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <GameScene
          player1Ref={player1Ref}
          player2Ref={player2Ref}
          updatePositions={updatePositions}
          timeLeft={timeLeft}
        />
      </Canvas>
    </div>
  )
}

const GameScene = ({ player1Ref, player2Ref, updatePositions, timeLeft }) => {
  useFrame(() => {
    if (timeLeft > 0) {
      updatePositions()
    } else {
      const player1 = player1Ref.current
      const player2 = player2Ref.current
      if (player1.health > player2.health) {
        console.log("Player 1 Wins!")
      } else if (player2.health > player1.health) {
        console.log("Player 2 Wins!")
      } else {
        console.log("Draw!")
      }
    }
  })

  return (
    <>
      <primitive object={player1Ref.current.mesh} />
      <primitive object={player2Ref.current.mesh} />
    </>
  )
}

const App = () => {
  return (
    <div>
      <h1>2D Fighter Game</h1>
      <Game />
    </div>
  )
}

export default App
