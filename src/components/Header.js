import React, { Component } from "react";
import Timer from "./Timer";

class Header extends Component {

	constructor(props){
		super(props);
		this.state = {scoreHeight: 0};
		this.timer = React.createRef();
	}

	componentDidMount(){
		this.setState({scoreHeight: Math.floor(this.titleRef.clientHeight)});
	}

	componentDidUpdate(nextProps, nextState){
		if(this.titleRef && this.state.scoreHeight !== Math.floor(this.titleRef.clientHeight)){
			this.setState({scoreHeight: Math.floor(this.titleRef.clientHeight)});
		}
	}

	startTimer(){
		if(this.timer.current !== null) this.timer.current.start();
	}

	stopTimer(){
		if(this.timer.current !== null) this.timer.current.stop();
	}

	resetTimer(){
		if(this.timer.current !== null) this.timer.current.reset();
	}

	render(){

		return (
			<div className="header" ref={this.props.passRef}>
				<div className="titlePanel" ref={(titleRef) => {this.titleRef = titleRef}}>Ordinance Removal</div>
				<div className="scorePanel" style={{height: this.state.scoreHeight}}>
					<div className="scoreText">Flags: <span id="flags">0</span>&nbsp;&nbsp;&nbsp;&nbsp;
					Time:&nbsp;
					<Timer autoStart={false} ref={this.timer} />
					</div></div>
			</div>
		);
	}
};

export default Header;