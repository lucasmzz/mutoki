import React from 'react';
import '../styles/Tuner.css';
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
	renderTones() {
		return Object.keys(this.noteFrequency).map(tone => <button key={tone} value={tone} className="ui inverted basic violet button">{tone}</button>);
	}
	componentDidMount() {
		let audioContext = new (window.AudioContext || window.webkitAudioContext)();
		let osc = audioContext.createOscillator();
		let gainOsc = audioContext.createGain();

		osc.type = "sine";
		osc.frequency.value = 440;

		osc.connect(gainOsc);
		gainOsc.connect(audioContext.destination);

		this.setState({audioContext,osc,gainOsc});
	};

	componentDidUpdate(){
		this.state.osc.connect(this.state.gainOsc);
		this.state.gainOsc.connect(this.state.audioContext.destination);
	};

	onStart = (e) => {
		e.preventDefault();
		this.setState({enabled: true},this.runTuner);
	};

	onStop = (e) => {
		e.preventDefault();
		if (this.state.enabled) this.setState({enabled: false},this.stopTuner);
	};

	runTuner = () => {
		if (!this.state.enabled){
			this.state.osc.start(this.state.audioContext.currentTime);
			this.setState({enabled: true});
		}
	};

	stopTuner = () => {
		this.setState({enabled: false});
		this.state.osc.stop(this.state.audioContext.currentTime + 0.01);
	};

	onTuneSelect = (e) => {
		e.preventDefault();
		if (this.state.enabled){
			this.stopTuner();
			let osc = this.state.audioContext.createOscillator();
			osc.type = "sine";
			osc.frequency.value = this.noteFrequency[e.target.value];
			this.setState({osc});
			this.runTuner();
		};
		let osc = this.state.audioContext.createOscillator();
		osc.type = "sine";
		osc.frequency.value = this.noteFrequency[e.target.value];
		this.setState({osc},this.runTuner);
	};

	render() {
		return(
			<div className="ui grid container">
				<div className="row">
					<div className="ui six column buttons" onClick={this.onTuneSelect}>
						{this.renderTones()}
					</div>
				</div>
				<div className="ui row">
					<button onClick={this.onStop} className="ui button basic red btn-stop">STOP</button>
				</div>
			</div>
		);
	}
}

export default Tuner;