import RPMetronome from '../react-pro-metronome';
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

	};
	iconStyle = {
		
	};
	render(){
		return (
				<RPMetronome
					bpm={this.state.tempo}
					subdivision={1}
					soundEnabled={this.state.soundEnabled}
					soundPattern={this.state.signature}
					render={(props, state) => (
				    	<div className="ui grid">
					    	
							<div className="two column row">

					    		<div className="column">
									<div className="ui row" style={{height: '100%'}}>
										<div className="ui segment" style={{height: '100%', display: 'flex', flexWrap: 'wrap' , alignItems: 'center', alignContent: 'center'}}>
											<button onClick={this.onPlay} className="positive ui fluid button">
												<i className="play icon"></i>
											</button>
											<button onClick={this.onStop} className="negative ui fluid button">
											<i className="pause icon"></i>
											</button>
										</div>
									</div>
								</div>
								
								<div className="column">
									<div className="ui segment" style={{backgroundColor: 'rgba(0,0,0,0.03)', height: '100%'}}>
										<p style={{fontSize: '4rem', color: 'white', textAlign: 'center'}}>{this.state.tempo}</p>
									</div>
								</div>
						    </div>

						    <div className="row">
						   		<Slider onSliderChange={this.onSliderChange} value={this.state.tempo} />
						    </div>
				    	</div>
					)}
				/>
		);
	}
}

export default Metronome;