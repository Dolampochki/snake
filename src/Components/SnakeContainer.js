import React, { useState, useEffect } from 'react'
import './SnakeContainer.scss'

const height = 29
const width = 29
const rows = [...Array(height).keys()]
const columns = [...Array(width).keys()]
const directionPairs = [['l', 'r'], ['u', 'd']]

let direction = 'l'
let food = { x: 0, y: 0 }

export const SnakeContainer = () => {
    const [snake, setSnake] = useState([{ x: 14, y: 14 }])

    const getNextCoords = {
        l: (coords) => ({ x: coords.x - 1, y: coords.y}),
        r: (coords) => ({ x: coords.x + 1, y: coords.y}),
        u: (coords) => ({ x: coords.x, y: coords.y - 1}),
        d: (coords) => ({ x: coords.x, y: coords.y + 1})
    }

    const keyDirection = {
        'ArrowUp': 'u',
        'ArrowDown': 'd',
        'ArrowLeft': 'l',
        'ArrowRight': 'r'
    }

    const getRandomCoord = (max) => {
        return Math.floor(Math.random() * max)
    }

    const showFood = () => {
        let x, y
        let goodFood = false
        while (!goodFood) {
            x = getRandomCoord(width)
            y = getRandomCoord(height)
            if (!snake.find(coords => coords.x === x && coords.y === y)) goodFood = true
        }
        food = { x, y }
    }

    const checkEnterBorders = (coords) => {
        if (!rows.includes(coords.x) || !columns.includes(coords.y)) return true
        return false
    }

    const getNewSnake = (ateFood) => {
        let newSnake
        if (ateFood) {
            newSnake = [getNextCoords[direction](snake[0]), ...snake]
        } else {
            newSnake = [...snake]
            for (let i = 0; i < snake.length; i++) {
                const { x, y } = getNextCoords[direction](newSnake[i])
                newSnake[i].x = x
                newSnake[i].y = y
            }
        }
        return newSnake
    }

    const checkAteFood = (coords) => {
        if (coords.x === food.x && coords.y === food.y) return true
        return false
    }

    const gameOver = () => {
        console.log('Game Over')
    }

    const keyPress = (key) => {
        const newDirection = keyDirection[key]
        const currentPair = directionPairs.find(p => p.includes(direction))
        if (!currentPair.includes(newDirection)) direction = newDirection
    }

    useEffect(() => {
        showFood()
        const interval = setInterval(() => {
            const nextCoords = getNextCoords[direction](snake[0])
            const enterBorders = checkEnterBorders(nextCoords)
            const ateFood = checkAteFood(snake[0])
            const newSnake = getNewSnake(ateFood)
            if (enterBorders) {
                clearInterval(interval)
                gameOver()
            } else {
                setSnake(newSnake)
            }
        }, 500)

        const keyDownHandler = event => {
            keyPress(event.key)
        }

        document.addEventListener('keydown', keyDownHandler)


        return () => {
            clearInterval(interval)
            document.removeEventListener('keydown', keyDownHandler)
        }
    }, [])


    return (
        <div className='snake'>
            <ul className='snake-rows'>
                {rows.map(row => <li key={row}>
                    <ul className='snake-columns'>
                        {columns.map(column => {
                            const isSnake = snake.map(i => i.y).includes(row) && snake.map(i => i.x).includes(column)
                            const isFood = food.y === row && food.x === column
                            return (<li key={column}>
                                <div className={`cell ${isSnake ? 'cell-snake' : ''} ${isFood ? 'cell-food' : ''}`}></div>
                            </li>)}
                        )}
                    </ul>
                </li>)}
            </ul>
        </div>
    )
}

export default SnakeContainer