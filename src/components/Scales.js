import React from 'react';
import { Scale } from 'tonal';
import '../styles/Scales.css';

class Scales extends React.Component{
    
    state = { root: 'C', scale: 'major' };

    renderRootSelector = () => {
        const options = Scale.notes('C chromatic').map(note => <option value={note} key={note}>{note}</option>);
        return <select value={this.state.root} onChange={this.onRootChange}>{options}</select>
    }
    renderScaleSelector = () => { 
        const options = Scale.names().map(scale => <option value={scale} key={scale}>{scale}</option>);
        return <select value={this.state.scale} onChange={this.onScaleChange}>{options}</select>
    };

    onScaleChange = (e) => this.setState({ scale: e.target.value});
    
    onRootChange = (e) => this.setState({ root: e.target.value});
    
    renderScale = () => {
        return Scale.notes(`${this.state.root} ${this.state.scale}`).map(note => {
            return <span key={note} className="note">{note}</span>
        });

    }
    render(){
        return(
            <div>
                <h1>Scale Explorer</h1>
                <div className="selector-wrapper clearfix">
                    {this.renderRootSelector()}
                    {this.renderScaleSelector()}
                </div>
                <div className="scale-view">
                    {this.renderScale()}

                </div>
            </div>
        );
    }
}

export default Scales;