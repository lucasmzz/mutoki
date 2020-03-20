import React from 'react';
import Metronome from './Metronome';
import Tuner from './Tuner';
import Scales from './Scales';
import Chords from './Chords';
import '../styles/App.css';
class App extends React.Component {

	render(){
		return(
			<div className="ui stackable two column grid container" style={{marginTop: '10px'}}>
				<div className="eight wide column">
					<div className="ui transparent segment">
						<Metronome />
					</div>
					<div className="ui transparent segment">
						<Tuner />
					</div>
				</div>
				<div className=" eight wide column">
					<div className="ui transparent segment">
						<Scales />
					</div>
					<div className="ui transparent segment">
						<Chords />
					</div>
				</div>
				
			</div>
		);
	}
}

export default App;