import React from 'react';
import Metronome from './Metronome';
import Tuner from './Tuner';
class App extends React.Component {

	render(){
		return(
			<div className="ui grid container" style={{marginTop: '10px'}}>
					<div className="row">
						<div className="eight wide column" style={{backgroundColor: 'rgba(0,0,0,0.05)',padding: '10px'}}>
							<Metronome />
						</div>
						<div className="eight wide column" style={{backgroundColor: 'rgba(0,0,0,0.05)',padding: '10px'}}>
							<Tuner />
						</div>
					</div>
			</div>
		);
	}
}

export default App;