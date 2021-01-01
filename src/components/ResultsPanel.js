import { Component } from "react";

class ResultsPanel extends Component {

	render(){

		return (
			<div className="resultsPanel" style={(this.props.open) ? undefined : {display: 'none'}}>
				<div className="resultsHeader">Results</div>
				<div className="correctFlags">
					Correct flags: &nbsp;
					<span id="corrFlags">{this.props.corrFlags | 0}</span>
					/
					<span id="maxFlags">{this.props.maxFlags | 0}</span>
				</div>
				<div className="timeStats">
					Time elapsed:&nbsp;
					<span id="timeStat">{this.props.time | 0}s</span>
				</div>
				<div id="succFail" className={this.props.won ? "succ" : "fail"}>{this.props.won ? "Success" : "Failure"}</div>
				<div className="gbutton" id="tryAgain" onClick={this.props.reset}>Try Again?</div>
			</div>
		);

	}

}

export default ResultsPanel;