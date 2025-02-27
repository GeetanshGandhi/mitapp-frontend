import { useEffect, useState } from 'react';
import './App.css';
import problems from './problems';

function App() {
	const [toggleIns, setToggleIns] = useState(false)
	useEffect(() => {
		document.getElementById("ins-wrapper").style.height = "0px";
		document.getElementById("pg-btn").style.opacity = "0";
		document.getElementById("disc-timer").style.display = "none";
		document.getElementById("timer").style.display = "none";
		document.getElementById("problem").style.height = "0px";
	}, [])
	const toggleInstruction = () => {
		if (!toggleIns) document.getElementById("ins-wrapper").style.height = "120px";
		else document.getElementById("ins-wrapper").style.height = "0px";
		setToggleIns(!toggleIns)
	}
	const redirect = () => {
		handleStart();
		window.open("https://ai2.appinventor.mit.edu/")
	}
	//problem
	const [problem, setproblem] = useState("");
	let randomnumber = 0;
	const showProblem = () => {
		generateRandomNumber();
		setproblem(problems[randomnumber]);
		document.getElementsByClassName("generate")[0].style.display = "none"
		document.getElementById("subhead").style.height = "0px";
		document.getElementById("mainhead").style.padding = "1.5vh 2vw 0 2vw"
		document.getElementById("mainhead").style.fontSize = "5vh"
		document.getElementById("problem").style.height = "59vh"
		setTimeout(() => {
			document.getElementById("pg-btn").style.opacity = "1"
			document.getElementById("disc-timer").style.display = "block";
		}, 5000)
	}
	const generateRandomNumber = () => {
		randomnumber = Math.floor(Math.random() * problems.length);
	}
	const [time, setTime] = useState(630); // Countdown from 10 minutes
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let timer;
		if (isRunning && time > 0) {
			timer = setInterval(() => {
				setTime((prevTime) => prevTime - 1);
			}, 1000);
		}
		else if(time===0){
			setIsRunning(false);
			new Audio("/alarm.mp3").play();	
		}
		return () => clearInterval(timer);
	}, [isRunning, time]);

	const handleStart = () => {
		document.getElementById("timer").style.display = "block";
		setIsRunning(true);
	};
	return (
		<div className="main-container">
			<img className='bg' src={require("./img/bg.png")} alt="" />
			<div className="foreground">
				<h1 id="mainhead">Appossible: Every app is possible</h1>
				<h2 id="subhead">No code? No problem! Just build the UI, meet the requirements, and win!</h2>
				<div className="wrapper">
					<button onClick={toggleInstruction} className="btns view-ins">{(toggleIns ? "Hide" : "View") + " Instructions"}</button>
					<button className='btns generate' onClick={showProblem}>Generate Problem</button>

				</div>
				<div id="ins-wrapper" className="ins-wrapper">
					<p>1. Create a UI interface according to the generated problem statement.</p>
					<p>2. Each participant is allowed exactly 10 minutes of time.</p>
					<p>3. You are not allowed to refer to the internet.</p>
					<p>4. Use your own imagination and problem solving.</p>
				</div>
				{/* problem */}
					<p id="problem">{problem}</p>
				{/* problem ends */}
				<div id="problem-wrapper" className="wrapper">
					<p id="timer">{Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</p>
						<button id="pg-btn" className='btns pg-btn' onClick={redirect}>
							Playground
							<img src={require("./img/goto.png")} alt="go" />
						</button>
						<p id="disc-timer">going to Playground will start the timer.<br/>Do not refresh this page after starting your task.</p>
				</div>
			</div>
		</div>
	);
}

export default App;
