import RPMetronome from 'react-pro-metronome';
import React from 'react';
import Slider from './Slider';

class Metronome extends React.Component {
	state = {
		soundEnabled: false,
		tempo: 85,
		signature: '3111'
	};
	onPlay = () => {
		this.setState({soundEnabled: true});
	};
	onStop = () => {
		this.setState({soundEnabled: false});
	};

	onSliderChange = (value) => {
		this.setState({ tempo: value });
	};
	
	onSignatureChange = (event) => {
		switch (event.target.value) {
			case "44":
				this.setState({ signature: '3111' });
				break;
			case "34":
				this.setState({ signature: '311' });
				break;
			case "54":
				this.setState({ signature: '31111' });
				break;
			default:
				this.setState({ signature: '3111' });
		}
	}
	buttonStyle = {
		width: '100%',
		fontSize: '2vw',
		textAlign: 'center'
	};
	iconStyle = {
		margin: '0px 0px'
	};
	render(){
		return (
			<div>
				<RPMetronome
					bpm={this.state.tempo}
					subdivision={1}
					soundEnabled={this.state.soundEnabled}
					soundPattern={this.state.signature}
					render={(props, state) => (
				    	<div className="ui grid">
					    	<div className="two column row">
					    		<div className="eight wide column">
						    		<div className="ui placeholder segment" style={{backgroundColor: 'rgba(0,0,0,0.03)'}}>
									  <div className="ui two column centered grid">
										  <button onClick={this.onPlay} className="ui inverted basic green button" style={this.buttonStyle}>
										    <i style={this.iconStyle} className="play icon"></i>
										  </button>
										  <button onClick={this.onStop} className="ui inverted basic red button" style={this.buttonStyle}>
										    <i style={this.iconStyle} className="pause icon"></i>
										  </button>
									 </div>
									</div>
								</div>
								<div className="eight wide column">
									<div className="ui placeholder segment" style={{backgroundColor: 'rgba(0,0,0,0.03)'}}>
										<p style={{fontSize: '7vw', color: 'white', textAlign: 'center'}}>{this.state.tempo}</p>
									</div>
								</div>
						    </div>
						    <div className="row">
						   		<Slider onSliderChange={this.onSliderChange} value={this.state.tempo} />
						    </div>
				    	</div>
					)}
				/>
			</div>
		);
	}
}

export default Metronome;