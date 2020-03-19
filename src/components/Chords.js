import React from 'react';
import { Scale, Chord } from 'tonal';
import '../styles/Chords.css';

class Chords extends React.Component{
    
    state = { root: 'C', chord: 'M' };

    renderRootSelector = () => {
        const options = Scale.notes('C chromatic').map(note => <option value={note} key={note}>{note}</option>);
        return <select value={this.state.root} onChange={this.onRootChange}>{options}</select>
    }

    renderChordSelector = () => { 
       const options = Chord.names().map(chord => <option value={chord} key={chord}>{chord}</option>);
       const select = <select value={this.state.chord} onChange={this.onChordChange}>{options}</select>
       return select;
    };

    onRootChange = (e) => this.setState({ root: e.target.value});

    onChordChange = (e) => this.setState({ chord: e.target.value});

    renderChord = () => {
        return Chord.notes(`${this.state.root}${this.state.chord}`).map(note => {
            return <span key={note} className="note">{note}</span>
        });

    }
    render(){
        return(
            <div>
                <h1>Chord Explorer</h1>
                <div className="selector-wrapper clearfix">
                    {this.renderRootSelector()}
                    {this.renderChordSelector()}
                </div>

                <div className="chord-view">
                    {this.renderChord()}
                </div>
            </div>
        );
    }
}

export default Chords;