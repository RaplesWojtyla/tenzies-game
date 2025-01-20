import { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import { useWindowSize } from 'react-use'
import ReactConfetti from 'react-confetti'
import Die from './components/Die'
import './App.css'

const App = () => {
	const generateAllNewDice = () => new Array(10).fill(0).map(() => ({
		id: nanoid(),
		value: Math.ceil(Math.random() * 6),
		isHeld: false
	}))


	const [dice, setDice] = useState(generateAllNewDice)
	const [count, setCount] = useState(0)
	const newGameRef = useRef(null)
	const { width, height } = useWindowSize()
	

	const hold = (id) => {
		setDice(prevDice => prevDice.map(dieObj => dieObj.id === id ? {
			...dieObj,
			isHeld: !dieObj.isHeld
		} : dieObj))
	}

	const isAllDiceHeld = () => {
		for (let i = 0; i < 10; ++i) {
			if (!dice[i].isHeld) {
				return false
			}
		}

		return true
	}

	const isAllDiceSame = () => {
		for (let i = 1; i < 10; ++i) {
			if (dice[i].value !== dice[0].value) {
				return false
			}
		}

		return true
	}

	const gameWon = isAllDiceHeld() && isAllDiceSame()

	useEffect(() => {
		if (gameWon) {
			newGameRef.current.focus()
		}
	}, [gameWon])

	const rollDice = () => {
		if (gameWon) {
			setDice(generateAllNewDice())
			setCount(0)
		}
		else {
			setDice(prevDice => prevDice.map(dieObj => dieObj.isHeld ? dieObj : {
				...dieObj,
				value: Math.ceil(Math.random() * 6)
			}))

			setCount(prevCount => prevCount + 1)
		}
	}

	return (
		<main>
			{gameWon && (
				<ReactConfetti 
					width={width}
					height={height}
				/>
			)}
			<div aria-live='polite' className='sr-only'>
				{gameWon && <p>You won! Press "New Game" to start again.</p>}
			</div>
			<p className='counter'>Number of Roll: <span>{count}</span></p>
			<div className='game-desc'>
				<h1>Tenzies</h1>
				<p>Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
			</div>
			<div className='dice-container'>
				{dice.map(dieObj => (
					<Die 
						key={dieObj.id}
						id={dieObj.id}
						value={dieObj.value}
						isHeld={dieObj.isHeld}
						hold={hold}
					/>
				))}
			</div>
			<button 
				className='roll-dice-btn'
				onClick={rollDice}
				ref={newGameRef}
			>
				{gameWon ? "New Game" : "Roll"}
			</button>
		</main>
	)
}

export default App
