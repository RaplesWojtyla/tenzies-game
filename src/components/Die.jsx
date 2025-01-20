const Die = (props) => {
	return (
		<button 
			style={{backgroundColor: props.isHeld ? "#59E391" : "white"}}
			onClick={() => props.hold(props.id)}
			aria-pressed={props.isHeld}
			aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
		>
			{props.value}
		</button>
	)
}

export default Die
