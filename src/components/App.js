import React from 'react';
import Metronome from './Metronome';
import Tuner from './Tuner';
import Scales from './Scales';
import Chords from './Chords';
import '../styles/App.css';
class App extends React.Component {

	render(){
		return(
			<div className="two column stackable ui grid container" style={{marginTop: '10px'}}>
				<div className="column">
					<div className="tool-container">
						<Metronome />
					</div>
					<div className="tool-container">
						<Tuner />
					</div>
				</div>
				<div className="column">
					<div className="tool-container">
						<Scales />
					</div>
					<div className="tool-container">
						<Chords />
					</div>
				</div>
				
			</div>
		);
	}
}

export default App;