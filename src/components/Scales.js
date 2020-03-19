import React from 'react';
import { Scale } from 'tonal';
import '../styles/Scales.css';

class Scales extends React.Component{
    
    state = { scale: 'C major' };

    renderSelector = () => { 
        const options = Scale.names().map(scale => <option value={scale} key={scale}>{scale}</option>);
        return <select onChange={this.onScaleChange}>{options}</select>
    };

    onScaleChange = (e) => this.setState({ scale: `C ${e.target.value}`});

    renderScale = () => {
        return Scale.notes(this.state.scale).map(note => {
            return <span class="note">{note}</span>
        });

    }
    render(){
        return(
            <div>
                <h1>Scale Explorer</h1>
                {this.renderSelector()}
                <div class="scale-view">
                    {this.renderScale()}

                </div>
            </div>
        );
    }
}

export default Scales;