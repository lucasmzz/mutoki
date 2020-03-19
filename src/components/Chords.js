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

    onChordPlay = () => {
        let ac = new (window.AudioContext || window.webkitAudioContext)();
        
        const noteFrequency = {
            'C': 261.63,
            'B#': 261.63,
            'C#': 277.18,
            'Db': 277.18,
            'D': 293.66,
            'D#': 311.13,
            'Eb': 311.13,
            'E': 329.63,
            'Fb': 329.63,
            'E#': 349.23,
            'F': 349.23,
            'F#': 369.99,
            'Gb': 369.99,
            'G': 392.00,
            'G#': 415.30,
            'Ab': 415.30,
            'A': 440.00,
            'A#': 466.16,
            'Bb': 466.16,
            'B': 493.88,
            'Cb': 493.88,
        };
        let freqs = Chord.notes(`${this.state.root}${this.state.chord}`).map(note => noteFrequency[note]);
        for(let i=0;i<freqs.length;i++) {
            let o = ac.createOscillator();
            let g = ac.createGain();
            o.frequency.value = freqs[i];
            o.type = "sine";
            o.connect(g);
            g.gain.setValueAtTime(0.1, ac.currentTime); // <-- line of interest
            g.gain.exponentialRampToValueAtTime(0.1, ac.currentTime + 1 );
            g.connect(ac.destination);
            o.start(0);
            setTimeout(function(s) {s.stop(0)}, 1000, o);
        }
    }

    render(){
        return(
            <div>
                <h1>Chord Explorer</h1>
                <div className="selector-wrapper clearfix">
                    {this.renderRootSelector()}
                    {this.renderChordSelector()}
                    <div>
                        <button onClick={this.onChordPlay} className="ui inverted basic green button">
                            <i style={this.iconStyle} className="play icon"></i>
                        </button>
                    </div>
                </div>

                <div className="chord-view">
                    {this.renderChord()}
                </div>
            </div>
        );
    }
}

export default Chords;