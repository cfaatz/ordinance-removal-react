import React, {Component} from "react";

class Board extends Component{

	constructor(props){
		super(props);
		this.state = {};
		this.panelRef = React.createRef();
	}

	render(){

		var panelStyles = {
			height: this.props.windowMeta.gameHeight
		};

		if(!this.props.board || !this.panelRef.current){
			return (<div className="gamePanel" style={panelStyles} ref={this.panelRef}><div className="gridWrapper"><div className="gameGrid"></div></div></div>);
		}


		let data = this.props.board;
		let board = data.board;

		var wrapperStyles = {
			height: panelStyles.height,
			width: this.panelRef.current.clientWidth + "px",
			gridTemplateColumns: window.innerWidth,
			gridTemplateRows: this.props.windowMeta.gameHeight + "px",
		};

		var gridRows = data.height;
		var gridColumns = data.width;

		var gridRatio = gridColumns/gridRows;
		var screenRatio = this.panelRef.current.clientWidth/wrapperStyles.height;

		var squareSize;

		if(gridRatio >= screenRatio){
			squareSize = this.panelRef.current.clientWidth / gridColumns;
		}else{
			squareSize = panelStyles.height / gridRows;
		}

		var gridStyles = {
			gridTemplateColumns: "repeat(" + data.width + ", " + squareSize + "px)",
			gridTemplateRows: "repeat(" + data.height + ", " + squareSize + "px)",
			fontSize: Math.floor(squareSize / 1.8) + "px"
		};

		if(this.props.running){
			gridStyles.cursor = "pointer";
		}

		let squares = [];

		let odd = 0;
		let oddRow = 0;

		for(var y = 0; y < data.height; y++){
			odd = oddRow;
			for(var x = 0; x < data.width; x++){
				var id = x + ";" + y;
				var classes = "square " + (odd === 1 ? "odd" : "even");
				var label = "";

				if(board[y][x].isClicked === true){
					classes += " clicked";
					var bombsNearby = board[y][x].bombsInRange;
					if(bombsNearby === undefined){
						bombsNearby = "B";
						classes += " bomb";
					}
					label = (<div className="squareLabel" id={id + "-label"}>{bombsNearby}</div>);
				}

				if(board[y][x].isFlagged === true) {
					classes += " flagged";
					if(data.bombLocations){
						var correct = false;

						for(var i = 0; i < data.bombLocations.length; i++){
							let loc = data.bombLocations[i];
							if(loc[0] === x && loc[1] === y) correct = true;
						}

						if(correct) classes += " correctFlag";
						else classes += " incorrectFlag";
					}
				}

				if(!this.props.running){
					squares.push(
						<div 
							className={classes} 
							id={id} 
							key={id}
						>
							{label}
						</div>
					);
				}else{
					squares.push(
						<div 
							className={classes} 
							onClick={this.props.clickSquare} 
							onContextMenu={this.props.flagSquare} 
							id={id} 
							key={id}
						>
							{label}
						</div>
					);
				}
				if(odd === 0) odd = 1;
				else odd = 0;
			}
			if(oddRow === 0) oddRow = 1;
			else oddRow = 0;
		}

		return (
			<div className="gamePanel" style={panelStyles} ref={this.panelRef}>
				<div className="gridWrapper" style={wrapperStyles}>
					<div className="gameGrid" style={gridStyles}>
						{squares}
					</div>
				</div>
			</div>
		);
	}
}

export default Board;