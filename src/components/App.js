import React from 'react';
import Metronome from './Metronome';
import Tuner from './Tuner';
import Scales from './Scales';
import '../styles/App.css';
class App extends React.Component {

	render(){
		return(
			<div className="two column stackable ui grid container" style={{marginTop: '10px'}}>
				<div className="column tool-container">
					<Metronome />
				</div>
				<div className="column tool-container">
					<Tuner />
				</div>
				<div className="column tool-container">
					<Scales />
				</div>
			</div>
		);
	}
}

export default App;