import React, { useState, useEffect } from 'react'
import './SnakeContainer.scss'

const height = 29
const width = 29
const rows = [...Array(height).keys()]
const columns = [...Array(width).keys()]
const directionPairs = [['l', 'r'], ['u', 'd']]


export const SnakeContainer = () => {
    const [snake, setSnake] = useState([{ x: 14, y: 14 }])
    const [food, setFood] = useState({ x: 0, y: 0 })
    const [direction, setDirection] = useState('l')
    console.log(snake)
    let interval
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

    const updateFoodCoords = () => {
        let x, y
        let goodFood = false
        while (!goodFood) {
            x = getRandomCoord(width)
            y = getRandomCoord(height)
            if (!snake.find(coords => coords.x === x && coords.y === y)) goodFood = true
        }
        return { x, y }
    }

    const checkEnterBorders = (coords) => {
        if (!rows.includes(coords.x) || !columns.includes(coords.y)) return true
        return false
    }

    const getNewSnake = (prevSnake, ateFood, nextCoords) => {
        let newSnake = [nextCoords, ...prevSnake]
        if (!ateFood) {
            newSnake.pop()
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

    const keyPress = (prevDirection, key) => {
        const newDirection = keyDirection[key]
        if (!newDirection) return
        const currentPair = directionPairs.find(p => p.includes(prevDirection))
        if (!currentPair.includes(newDirection)) return newDirection
        return prevDirection
    }

    const updateSnake = () => {
        interval = setInterval(() => {
            const nextCoords = getNextCoords[direction](snake[0])
            const enterBorders = checkEnterBorders(nextCoords)
            const ateFood = checkAteFood(nextCoords)
            if (enterBorders) {
                clearInterval(interval)
                gameOver()
            } else {
                if (ateFood) {
                    console.log('yammy!')
                    setFood(updateFoodCoords())
                }
                setSnake(prevSnake => getNewSnake(prevSnake, ateFood, nextCoords))
            }
        }, 500)
    }

    useEffect(() => {
        setFood(updateFoodCoords())
        const keyDownHandler = event => setDirection(prevDirection => keyPress(prevDirection, event.key))
        document.addEventListener('keydown', keyDownHandler)
        return () => document.removeEventListener('keydown', keyDownHandler)
    }, [])

    useEffect(() => {
        updateSnake()
        return () => clearInterval(interval)
    }, [snake])


    return (
        <div className='snake'>
            <ul className='snake-rows'>
                {rows.map(row => <li key={row}>
                    <ul className='snake-columns'>
                        {columns.map(column => {
                            const isSnake = snake.find(coords => coords.x === column && coords.y === row)
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