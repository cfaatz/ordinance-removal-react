import { Component } from "react";

class Timer extends Component {
	
	constructor(props){
		super(props);
		this.state = {time: 0, intervalId: -1};
	}

	componentDidMount(){
		if(this.props.autoStart === true || this.props.autoStart === undefined){
			this.start();
		}
	}

	tick(){
		this.setState({time: this.state.time + 1});
	}

	start(){
		this.setState({intervalId: setInterval(this.tick.bind(this), 1000)});
	}

	stop(){
		clearInterval(this.state.intervalId);
		this.setState({intervalId: -1});
	}

	getTime(){
		return this.state.time;
	}

	render(){
		return (
			<span className="timer">{this.state.time}</span>
		);
	}

}

export default Timer;