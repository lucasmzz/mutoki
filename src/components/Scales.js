import React from 'react';
import { Scale, Note, scale, transpose } from 'tonal';
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
            return <div key={note} className="note">{note}</div>
        });

    }

    onScalePlay = async () => {
        
        let freqs = scale(this.state.scale)
                    .map(transpose(`${this.state.root}3`))
                    .map(note => Note.freq(note));
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
                    {this.renderScale()}
                </div>
            </div>
        );
    }
}

export default Scales;