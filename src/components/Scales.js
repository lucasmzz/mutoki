import React from 'react';
import { Scale } from 'tonal';
import '../styles/Scales.css';

class Scales extends React.Component{
    
    state = { root: 'C', scale: 'major' };

    renderRootSelector = () => {

        const options = Scale.notes('C chromatic').map(note => <option value={note} key={note}>{note}</option>);
        return <select className="ui dropdown" value={this.state.root} onChange={this.onRootChange}>{options}</select>
    }
    renderScaleSelector = () => { 
        const changeHandlerLength = (select) => {
            let len = select.value.length;
            select.style.width = `${len * 8}px`;
        };
        const options = Scale.names().map(scale => <option value={scale} key={scale}>{scale}</option>);
        const selector = <select id="scale-selector" style={{width: '100px'}}className="ui dropdown" value={this.state.scale} onChange={(e) => {changeHandlerLength(e.target); this.onScaleChange(e.target.value)}}>{options}</select>;        
        return selector;
    };

    onScaleChange = (value) => {
        this.setState({ scale: value});
    };
    
    onRootChange = (e) => this.setState({ root: e.target.value});
    
    renderScale = () => {
        return Scale.notes(`${this.state.root} ${this.state.scale}`).map(note => {
            return <span key={note} className="note">{note}</span>
        });

    }

    onScalePlay = async () => {
        
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
        let freqs = Scale.notes(`${this.state.root} ${this.state.scale}`).map(note => noteFrequency[note]);
        freqs.push(freqs[0]*2);
        let audio = new (window.AudioContext || window.webkitAudioContext)();

        let o = null,
            g = null,
            start = 0,
            stop = 0;

        for (let i = 0; i<freqs.length; i++){

            start = stop + 0.05;
            stop = start + 0.2;

            o = audio.createOscillator();
            g = audio.createGain();
            o.frequency.value = freqs[i];
            o.type = "sine";
            o.connect(g);
            g.gain.setValueAtTime(0.1, audio.currentTime);
            g.gain.exponentialRampToValueAtTime(0.4, audio.currentTime + 8 );
            g.connect(audio.destination);
            o.start(start);
            o.stop(stop);    
        }
    }

    render(){
        return(
            <div className="middle">
                <h1>Scale Explorer</h1>
                <div className="ui centered row">
                    {this.renderRootSelector()}
                    {this.renderScaleSelector()}
                    <button onClick={this.onScalePlay} className="ui basic inverted green button">
                        play
                    </button>
                </div>
                <div className="ui segment">
                    <p style={{wordBreak: "break-all"}}>{this.renderScale()}</p>
                </div>
            </div>
        );
    }
}

export default Scales;