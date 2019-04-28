import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Howl } from 'howler';

import click3SoundFileMP3 from './sounds/click3.mp3';
import click3SoundFileOGG from './sounds/click3.ogg';
import click3SoundFileAAC from './sounds/click3.aac';

import click2SoundFileMP3 from './sounds/click2.mp3';
import click2SoundFileOGG from './sounds/click2.ogg';
import click2SoundFileAAC from './sounds/click2.aac';

import click1SoundFileMP3 from './sounds/click1.mp3';
import click1SoundFileOGG from './sounds/click1.ogg';
import click1SoundFileAAC from './sounds/click1.aac';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAXBPM = 300;
var MAXSUBDIVISION = 8;

var ProMetronome = function (_PureComponent) {
  _inherits(ProMetronome, _PureComponent);

  function ProMetronome() {
    var _temp, _this, _ret;

    _classCallCheck(this, ProMetronome);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
      qNote: 1,
      subNote: 1
    }, _this.clickSounds = [new Howl({
      src: [click1SoundFileMP3, click1SoundFileOGG, click1SoundFileAAC],
      preload: true
    }), new Howl({
      src: [click2SoundFileMP3, click2SoundFileOGG, click2SoundFileAAC],
      preload: true
    }), new Howl({
      src: [click3SoundFileMP3, click3SoundFileOGG, click3SoundFileAAC],
      preload: true
    })], _this.update = function () {
      var _this$props = _this.props,
          soundEnabled = _this$props.soundEnabled,
          soundPattern = _this$props.soundPattern,
          subdivision = _this$props.subdivision;
      var _this$state = _this.state,
          qNote = _this$state.qNote,
          subNote = _this$state.subNote;


      if (soundEnabled && soundPattern.length === 4 * subdivision) {
        var soundLevel = soundPattern.charAt((qNote - 1) * subdivision + subNote - 1);
        if (soundLevel > 0 && soundLevel <= 3) _this.clickSounds[soundLevel - 1].play();
      }

      if (subNote < subdivision) {
        _this.setState(function (prevState) {
          return {
            subNote: prevState.subNote + 1
          };
        });
      } else {
        _this.setState(function (prevState) {
          return {
            qNote: prevState.qNote === 4 ? 1 : prevState.qNote + 1,
            subNote: 1
          };
        });
      }
    }, _this.calculateInterval = function (bpm, subdivision) {
      return Math.floor(60000 / (bpm * subdivision));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ProMetronome.prototype.componentDidMount = function componentDidMount() {
    if (this.props.isPlaying) {
      this.timerID = setInterval(this.update, this.calculateInterval(this.props.bpm, this.props.subdivision));
    }
  };

  ProMetronome.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying !== this.props.isPlaying) {
      if (nextProps.isPlaying) {
        this.timerID = setInterval(this.update, this.calculateInterval(nextProps.bpm, nextProps.subdivision));
      } else {
        clearInterval(this.timerID);
      }
    } else if (nextProps.isPlaying && (nextProps.bpm !== this.props.bpm || nextProps.subdivision !== this.props.subdivision)) {
      clearInterval(this.timerID);
      this.timerID = setInterval(this.update, this.calculateInterval(nextProps.bpm, nextProps.subdivision));
    }
  };

  ProMetronome.prototype.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.timerID);
  };

  ProMetronome.prototype.render = function render() {
    return this.props.render(this.props, this.state);
  };

  return ProMetronome;
}(PureComponent);

ProMetronome.propTypes = process.env.NODE_ENV !== "production" ? {
  bpm: function bpm(props, propName, componentName) {
    if (props[propName]) {
      var propValue = props[propName],
          propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
      if (propType !== 'number') return new Error('Invalid prop `' + propName + '` of type `' + propType + '` supplied to ' + componentName + ', expected `number`.');
      if (propValue < 1 || propValue > MAXBPM) return new Error('Invalid prop `' + propName + '` with value ' + propValue + ' supplied to ' + componentName + '. Allowed range is 1-' + MAXBPM + '.');
    }
  },
  subdivision: function subdivision(props, propName, componentName) {
    if (props[propName]) {
      var propValue = props[propName],
          propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
      if (propType !== 'number') return new Error('Invalid prop `' + propName + '` of type `' + propType + '` supplied to ' + componentName + ', expected `number`.');
      if (propValue < 1 || propValue > MAXSUBDIVISION) return new Error('Invalid prop `' + propName + '` with value ' + propValue + ' supplied to ' + componentName + '. Allowed range is 1-' + MAXSUBDIVISION + '.');
    }
  },
  isPlaying: PropTypes.bool,
  soundEnabled: PropTypes.bool,
  soundPattern: function soundPattern(props, propName, componentName) {
    if (props[propName]) {
      var propValue = props[propName],
          propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
      if (propType !== 'string') return new Error('Invalid prop `' + propName + '` of type `' + propType + '` supplied to ' + componentName + ', expected `string`.');
      if (propValue.length > 0 && propValue.length !== 4 * props['subdivision']) return new Error('Invalid prop `' + propName + '` with length ' + propValue.length + ' supplied to ' + componentName + ". Length value doesn't match with the subdivision, expected " + 4 * props['subdivision'] + '.');
    }
  },
  render: PropTypes.func.isRequired
} : {};

ProMetronome.defaultProps = {
  bpm: 80,
  subdivision: 1,
  isPlaying: true,
  soundEnabled: false,
  soundPattern: ''
};

export default ProMetronome;