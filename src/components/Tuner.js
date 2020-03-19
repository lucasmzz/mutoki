import React from 'react';

class Tuner extends React.Component {

	state = {
		enabled: false,
		audioContext: null,
		osc: null,
		gainOsc: null
	};

	noteFrequency = {
		'C': 261.63,
		'C#': 277.18,
		'D': 293.66,
		'D#': 311.13,
		'E': 329.63,
		'F': 349.23,
		'F#': 369.99,
		'G': 392.00,
		'G#': 415.30,
		'A': 440.00,
		'A#': 466.16,
		'B': 493.88
	};

	componentDidMount() {
		console.log('component mounted. creating audio context...');

		let audioContext = new AudioContext();
		let osc = audioContext.createOscillator();
		let gainOsc = audioContext.createGain();

		osc.type = "sine";
		osc.frequency.value = 440;

		osc.connect(gainOsc);
		gainOsc.connect(audioContext.destination);

		this.setState({audioContext,osc,gainOsc});
	};

	componentDidUpdate(){
		console.log('updating component');
		this.state.osc.connect(this.state.gainOsc);
		this.state.gainOsc.connect(this.state.audioContext.destination);
	};

	reportState = () => {
		console.log(this.state);
	};

	onStart = (event) => {
		event.preventDefault();
		this.setState({enabled: true},this.runTuner);
	};

	onStop = (event) => {
		event.preventDefault();
		if (this.state.enabled) this.setState({enabled: false},this.stopTuner);
	};

	runTuner = () => {
		if (!this.state.enabled){
			this.state.osc.start(this.state.audioContext.currentTime);
			this.setState({enabled: true});
		}
	};

	stopTuner = () => {
		console.log('stopping... ');
		this.setState({enabled: false});
		this.state.osc.stop(this.state.audioContext.currentTime + 0.01);
	};

	onTuneSelect = (event) => {
		event.preventDefault();
		if (this.state.enabled){
			this.stopTuner();
			let osc = this.state.audioContext.createOscillator();
			osc.type = "sine";
			osc.frequency.value = this.noteFrequency[event.target.value];
			this.setState({osc},this.reportState);
			this.runTuner();
		};
		let osc = this.state.audioContext.createOscillator();
		osc.type = "sine";
		osc.frequency.value = this.noteFrequency[event.target.value];
		this.setState({osc},this.runTuner);
	};

	render() {
		return(
			<div className="ui grid container">
				<div className="row">
					<div className="ui six column buttons" onClick={this.onTuneSelect}>
					  <button value="C" className="ui inverted basic violet button">C</button>
					  <button value="C#" className="ui inverted basic violet button">C#</button>
					  <button value="D" className="ui inverted basic violet button">D</button>
					  <button value="D#" className="ui inverted basic violet button">D#</button>
					  <button value="E" className="ui inverted basic violet button">E</button>
					  <button value="F" className="ui inverted basic violet button">F</button>
					  <button value="F#" className="ui inverted basic violet button">F#</button>
					  <button value="G" className="ui inverted basic violet button">G</button>
					  <button value="G#" className="ui inverted basic violet button">G#</button>
					  <button value="A" className="ui inverted basic violet button">A</button>
					  <button value="A#" className="ui inverted basic violet button">A#</button>
					  <button value="B" className="ui inverted basic violet button">B</button>
					</div>
				</div>
				<div className="centered row">
					<button onClick={this.onStop} className="ui button basic red">STOP</button>
				</div>
			</div>
		);
	}
}

export default Tuner;