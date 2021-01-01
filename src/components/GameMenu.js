import React, {useEffect, useState, useRef} from "react";
import ResultsPanel from './ResultsPanel';

const GameMenu = (props) => {

	const [gamePanel, setGamePanel] = useState(null);
	const [header, setHeader] = useState(null);

	const menuPanel = useRef(null);

	useEffect(() => {

		setGamePanel(document.querySelector(".gamePanel"));
		setHeader(document.querySelector(".header"));

	}, []);

	var gameMenuStyle = {};
	var menuPanelStyle = {};

	if(gamePanel != null){

		//let _mt = gamePanel.style.marginTop;
		//let panelMarginTop = parseInt(_mt.substring(0, _mt.length-2)) | 0;
			//top: gamePanel.offsetTop + panelMarginTop

		gameMenuStyle = {
			height: props.windowMeta.gameHeight,
			top: header.clientHeight
		};

		menuPanelStyle = {
			top: (gameMenuStyle.height - menuPanel.current.offsetHeight) / 2
		}
	}

	if(!props.open && !props.results.open){
		//gameMenuStyle.display = "none";
		gameMenuStyle.visibility = "hidden";
	}

	if(!props.open){
		//menuPanelStyle.display = "none";
		menuPanelStyle.visibility = "hidden";
	}

	return (
		<React.Fragment>
			<div className="gameMenu" style={gameMenuStyle}>
				<div className="menuPanel" ref={menuPanel} style={menuPanelStyle}>
					<div className="menuHeader">Start Game</div>
					<div className="gbutton" id="easy" onClick={() => {props.startGame(0)}}>Easy</div>
					<div className="gbutton" id="medium" onClick={() => {props.startGame(1)}}>Medium</div>
					<div className="gbutton" id="hard" onClick={() => {props.startGame(2)}}>Hard</div>
				</div>
			</div>

			<ResultsPanel 
				open={props.results.open}
				corrFlags={props.results.corrFlags}
				maxFlags={props.results.maxFlags}
				time={props.results.time}
				won={props.results.won}
				reset={props.results.reset}
			/>
		</React.Fragment>
	);
	
};

export default GameMenu;