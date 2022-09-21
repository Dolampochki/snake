import React, { useState, useEffect } from 'react'
import './SnakeContainer.scss'

const height = 29
const width = 29
const rows = [...Array(height).keys()]
const columns = [...Array(width).keys()]
const directionPairs = [['l', 'r'], ['u', 'd']]

let interval
const starterSnake = [{ x: Math.floor(width / 2), y: Math.floor(height / 2) }]

const gameOverText = [{x:12,y:11},{x:12,y:10},{x:12,y:9},{x:12,y:8},{x:12,y:7},{x:12,y:6},{x:11,y:5},{x:10,y:5},{x:9,y:6},{x:9,y:7},{x:9,y:8},{x:9,y:9},{x:9,y:10},{x:9,y:11},{x:10,y:9},{x:11,y:9},{x:7,y:5},{x:6,y:5},{x:5,y:5},{x:7,y:9},{x:6,y:9},{x:7,y:10},{x:7,y:11},{x:6,y:11},{x:5,y:11},{x:4,y:11},{x:4,y:10},{x:4,y:9},{x:4,y:8},{x:4,y:7},{x:4,y:6},{x:4,y:5},{x:7,y:6},{x:14,y:11},{x:14,y:10},{x:14,y:9},{x:14,y:8},{x:14,y:7},{x:14,y:6},{x:14,y:5},{x:15,y:6},{x:16,y:7},{x:17,y:6},{x:18,y:5},{x:18,y:6},{x:18,y:7},{x:18,y:8},{x:18,y:9},{x:18,y:10},{x:18,y:11},{x:20,y:5},{x:20,y:6},{x:20,y:7},{x:20,y:8},{x:20,y:9},{x:20,y:10},{x:20,y:11},{x:21,y:11},{x:22,y:11},{x:23,y:11},{x:21,y:5},{x:22,y:5},{x:23,y:5},{x:21,y:8},{x:22,y:8},{x:7,y:14},{x:6,y:14},{x:5,y:14},{x:4,y:14},{x:4,y:15},{x:4,y:16},{x:4,y:17},{x:4,y:18},{x:4,y:19},{x:4,y:20},{x:7,y:15},{x:7,y:16},{x:7,y:17},{x:7,y:18},{x:7,y:19},{x:7,y:20},{x:6,y:20},{x:5,y:20},{x:9,y:14},{x:9,y:15},{x:9,y:16},{x:9,y:17},{x:9,y:18},{x:9,y:19},{x:10,y:20},{x:11,y:20},{x:12,y:19},{x:12,y:18},{x:12,y:17},{x:12,y:16},{x:12,y:15},{x:12,y:14},{x:14,y:14},{x:14,y:15},{x:14,y:16},{x:14,y:17},{x:14,y:18},{x:14,y:19},{x:14,y:20},{x:15,y:20},{x:16,y:20},{x:17,y:20},{x:16,y:17},{x:15,y:17},{x:15,y:14},{x:16,y:14},{x:17,y:14},{x:19,y:14},{x:20,y:14},{x:21,y:14},{x:22,y:14},{x:23,y:15},{x:23,y:16},{x:22,y:17},{x:21,y:17},{x:20,y:17},{x:19,y:17},{x:19,y:16},{x:19,y:15},{x:19,y:18},{x:19,y:19},{x:19,y:20},{x:21,y:18},{x:22,y:19},{x:23,y:20}]
const startGameText = [{x:6,y:6},{x:5,y:6},{x:5,y:9},{x:5,y:12},{x:4,y:12},{x:8,y:6},{x:9,y:6},{x:10,y:6},{x:11,y:6},{x:12,y:6},{x:10,y:7},{x:10,y:8},{x:10,y:9},{x:10,y:10},{x:10,y:11},{x:10,y:12},{x:14,y:6},{x:13,y:7},{x:13,y:8},{x:13,y:9},{x:13,y:10},{x:13,y:11},{x:13,y:12},{x:15,y:6},{x:16,y:7},{x:16,y:8},{x:16,y:9},{x:16,y:10},{x:16,y:11},{x:16,y:12},{x:15,y:10},{x:14,y:10},{x:18,y:6},{x:18,y:7},{x:18,y:8},{x:18,y:9},{x:18,y:10},{x:18,y:11},{x:18,y:12},{x:19,y:6},{x:20,y:6},{x:21,y:7},{x:21,y:8},{x:20,y:9},{x:19,y:9},{x:20,y:10},{x:21,y:11},{x:22,y:12},{x:22,y:6},{x:23,y:6},{x:24,y:6},{x:25,y:6},{x:26,y:6},{x:24,y:7},{x:24,y:8},{x:24,y:9},{x:24,y:10},{x:24,y:11},{x:24,y:12},{x:7,y:6},{x:6,y:9},{x:7,y:10},{x:7,y:11},{x:6,y:12},{x:4,y:7},{x:4,y:8},{x:11,y:15},{x:12,y:15},{x:13,y:16},{x:13,y:17},{x:13,y:18},{x:13,y:19},{x:13,y:20},{x:13,y:21},{x:12,y:19},{x:11,y:19},{x:10,y:19},{x:10,y:20},{x:10,y:21},{x:10,y:18},{x:10,y:17},{x:10,y:16},{x:8,y:15},{x:7,y:15},{x:6,y:15},{x:7,y:19},{x:8,y:19},{x:8,y:20},{x:8,y:21},{x:7,y:21},{x:6,y:21},{x:5,y:20},{x:5,y:19},{x:5,y:18},{x:5,y:17},{x:5,y:16},{x:15,y:15},{x:15,y:16},{x:15,y:17},{x:15,y:18},{x:15,y:19},{x:15,y:20},{x:15,y:21},{x:16,y:16},{x:17,y:17},{x:18,y:16},{x:19,y:15},{x:19,y:16},{x:19,y:17},{x:19,y:18},{x:19,y:19},{x:19,y:20},{x:19,y:21},{x:21,y:21},{x:21,y:20},{x:21,y:19},{x:21,y:18},{x:21,y:17},{x:21,y:16},{x:21,y:15},{x:22,y:15},{x:23,y:15},{x:24,y:15},{x:23,y:18},{x:22,y:18},{x:22,y:21},{x:23,y:21},{x:24,y:21}]

export const SnakeContainer = () => {
    const [snake, setSnake] = useState([])
    const [food, setFood] = useState({ })
    const [direction, setDirection] = useState('l')
    const [text, setText] = useState([])

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
        if (snake.find(c => c.x === coords.x && c.y === coords.y)) return true
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
        setSnake([])
        setFood({ })
        setText(gameOverText)
    }

    const startGame = () => {
        if (!snake.length) {
            setSnake([...starterSnake])
            setFood(updateFoodCoords())
            setText([])
        }
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

    const createText = (x, y) => {
        return
        const found = text.find(c => c.x === x && c.y === y)
        if (!found) {
            setText([...text, { x, y }])
        } else {
            setText([...text.filter(c => c !== found)])
        }
    }

    useEffect(() => {
        setText(startGameText)
        const keyDownHandler = event => setDirection(prevDirection => keyPress(prevDirection, event.key))
        document.addEventListener('keydown', keyDownHandler)
        return () => document.removeEventListener('keydown', keyDownHandler)
    }, [])

    useEffect(() => {
        if (snake.length) {
            updateSnake()
        }
        return () => clearInterval(interval)
    }, [snake])


    return (
        <div className='snake' onClick={startGame}>
            <ul className='snake-rows'>
                {rows.map(row => <li key={row}>
                    <ul className='snake-columns'>
                        {columns.map(column => {
                            const isSnake = snake.find(coords => coords.x === column && coords.y === row)
                            const isText = text.find(coords => coords.x === column && coords.y === row)
                            const isFood = food.y === row && food.x === column
                            return (<li key={column}>
                                <div className={`cell ${isSnake ? 'cell-snake' : ''} ${isFood ? 'cell-food' : ''} ${isText ? 'cell-text' : ''}`} onClick={() => createText(column, row)}></div>
                            </li>)}
                        )}
                    </ul>
                </li>)}
            </ul>
        </div>
    )
}

export default SnakeContainer