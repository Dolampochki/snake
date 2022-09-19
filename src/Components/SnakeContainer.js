import React, { useState, useEffect } from 'react'
import './SnakeContainer.scss'

const height = 29
const width = 29
const rows = [...Array(height).keys()]
const columns = [...Array(width).keys()]
const directionPairs = [['l', 'r'], ['u', 'd']]

export const SnakeContainer = () => {
    const [snake, setSnake] = useState([{ x: 14, y: 14 }])
    const [count, setCount] = useState(1)
    const [direction, setDirection] = useState('l')

    useEffect(() => {
        const interval = setInterval(() => {
            const newSnake = [...snake]
            newSnake[0].x = snake[0].x + 1
            if (newSnake[0].x >= width) {
                clearInterval(interval)
            } else {
                setSnake(newSnake)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [])


    return (
        <div className='snake'>
            <ul className='snake-rows'>
                {rows.map(row => <li key={row}>
                    <ul className='snake-columns'>
                        {columns.map(column => {
                            const isSnake = snake.map(i => i.y).includes(row) && snake.map(i => i.x).includes(column)
                            return (<li key={column}>
                                <div className={`cell ${isSnake ? 'filled' : ''}`}></div>
                            </li>)}
                        )}
                    </ul>
                </li>)}
            </ul>
        </div>
    )
}

export default SnakeContainer