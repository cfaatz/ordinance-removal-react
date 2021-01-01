// TODO - make it look less bad
// TODO - implement view board button

import React, {Component} from "react";

import Header from './components/Header';
import Board from './components/Board';
import GameMenu from './components/GameMenu';

import API from './API';

import './OrdinanceRemoval.css';

class OrdinanceRemoval extends Component{

	constructor(props){
		super(props);

		this.state = {
			initialized: false, 
			gameRunning: false,
			menuOpen: true, 
			resultsOpen: false, 
			flags: 0, 
			maxFlags: 0, 
			windowMeta: {width: 0, height: 0, gameHeight: 0}, 
			board: null
		};

		this.headerRef = React.createRef();
		this.headerComponent = React.createRef();
	}

	componentDidMount(){
		setTimeout(this.updateSize.bind(this), 250);
		window.addEventListener('resize', this.updateSize.bind(this));

		// update size after all dom elements and assets have loaded
		// fixes sizing bug with slow-loading fonts
		window.addEventListener('load', this.updateSize.bind(this));
	}

	updateSize(){

		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight;

		let header = this.headerRef.current;

		let titlePanel = header.querySelector('.titlePanel');
		let scorePanel = header.querySelector('.scorePanel');

		var gameHeight;

		if(windowWidth <= 600){
			gameHeight = document.body.offsetHeight - (titlePanel.offsetHeight + scorePanel.offsetHeight);
		}else{
			gameHeight = windowHeight - header.clientHeight + 3;
		}

		this.setState(
			{
				initialized: true, 
				windowMeta: {
					width: windowWidth, 
					height: windowHeight,
					gameHeight: gameHeight
				}
			}
		);
	}

	dispatchClick(event){
		event.preventDefault();
		let id = event.target.id.split(";");
		API.click(id[0], id[1], (data) => {
			this.updateBoard(data);
		});
	}

	dispatchFlag(event){
		event.preventDefault();
		let id = event.target.id.split(";");
		API.flag(id[0], id[1], (data) => {
			this.updateBoard(data);
		});
	}

	updateBoard(data){
		if(data.lost === true || data.won === true){
			this.headerComponent.current.stopTimer();
			this.endGame(data);
			return;
		}
		this.setState({board: data});
	}

	endGame(data){
		var bombLocations = data.bombLocations;
		var ids = [];
		var correctFlags = 0;

		var _state = {board: data, gameRunning: false};

		if(data.lost === true){
			for(var i = 0; i < bombLocations.length; i++){
				var bomb = bombLocations[i];
				if(bomb[0] === data.bombClicked[0] && bomb[1] === data.bombClicked[1])continue;
				var id = {x: bomb[0], y: bomb[1]};
				if(data.board[bomb[1]][bomb[0]].isFlagged === true){
					//$("#" + id).addClass("correctFlag");
					correctFlags++;
				}else{
					ids[ids.length] = id;
					//$("#" + id).css("transition", "all 0.2s ease-in-out");
				}
			}
			data.correctFlags = correctFlags;
			this.revealBombs(ids, (1500 / (ids.length+1)), () => {
				setTimeout(() => {
					this.setState({resultsOpen: true});
				}, 250);
			});
			_state.board = data;
		}else{
			_state.board.correctFlags = this.state.maxFlags;
			_state.resultsOpen = true;
		}
		this.setState(_state);
	}

	revealBombs(ids, delay, callback){
		let id = ids.pop();
		let data = this.state.board;
		data.board[id.y][id.x].isClicked = true;
		this.setState({board: data});
		if(ids.length > 0) setTimeout(() => {this.revealBombs(ids, delay, callback)}, delay);
		else callback();
	}

	startGame(difficulty){
		var options = {};

		if(difficulty === 0){
			options.width = 10;
			options.height = 8;
			options.bombs = 10;
		}else if(difficulty === 1){
			options.width = 18;
			options.height = 14;
			options.bombs = 40;
		}else if(difficulty === 2){
			options.width = 24;
			options.height = 20;
			options.bombs = 100;
		}

		options.flags = options.bombs;
		options.maxFlags = options.flags;

		this.setState({flags: options.bombs, maxFlags: options.bombs, menuOpen: false});

		API.createBoard(options, (data) => {
			this.setState({board: data, gameRunning: true});
			this.headerComponent.current.startTimer();
		});
	}

	reset(){
		this.setState({
			gameRunning: false,
			menuOpen: true, 
			resultsOpen: false, 
			flags: 0, 
			maxFlags: 0, 
			board: null
		});
	}

	render(){

		var showVeneer = (this.state.initialized) ? {display: 'none'} : {};

		var time = 0;
		var correctFlags = 0;
		var won = false;

		if(this.headerComponent.current !== null){
			let headerComponent = this.headerComponent.current;
			if(headerComponent.timer.current !== null){
				time = headerComponent.timer.current.getTime() | 0;
			}
		}

		if(this.state.board !== null){ 
			correctFlags = this.state.board.correctFlags | 0;
			won = this.state.board.won === true;
		}

		var results = {
			open: this.state.resultsOpen,
			corrFlags: correctFlags,
			maxFlags: this.state.maxFlags | 0,
			time: time,
			won: won,
			reset: this.reset.bind(this)
		};


		return (
			<div className="ordinanceRemoval">
				<div className="loadingVeneer" style={showVeneer}><div className="loadingText">Loading...</div></div>

				<Header windowMeta={this.state.windowMeta} passRef={this.headerRef} ref={this.headerComponent} />

				<Board 
					windowMeta={this.state.windowMeta}
					clickSquare={this.dispatchClick.bind(this)}
					flagSquare={this.dispatchFlag.bind(this)}
					board={this.state.board}
					running={this.state.gameRunning}
				/>

				<GameMenu 
					windowMeta={this.state.windowMeta} 
					open={this.state.menuOpen} 
					startGame={this.startGame.bind(this)}
					results={results}
				/>

			</div>
		);

	}

}

export default OrdinanceRemoval;

