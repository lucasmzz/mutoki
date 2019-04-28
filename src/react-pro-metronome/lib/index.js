'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _howler = require('howler');

var _click = require('./sounds/click3.mp3');

var _click2 = _interopRequireDefault(_click);

var _click3 = require('./sounds/click3.ogg');

var _click4 = _interopRequireDefault(_click3);

var _click5 = require('./sounds/click3.aac');

var _click6 = _interopRequireDefault(_click5);

var _click7 = require('./sounds/click2.mp3');

var _click8 = _interopRequireDefault(_click7);

var _click9 = require('./sounds/click2.ogg');

var _click10 = _interopRequireDefault(_click9);

var _click11 = require('./sounds/click2.aac');

var _click12 = _interopRequireDefault(_click11);

var _click13 = require('./sounds/click1.mp3');

var _click14 = _interopRequireDefault(_click13);

var _click15 = require('./sounds/click1.ogg');

var _click16 = _interopRequireDefault(_click15);

var _click17 = require('./sounds/click1.aac');

var _click18 = _interopRequireDefault(_click17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    }, _this.clickSounds = [new _howler.Howl({
      src: [_click14.default, _click16.default, _click18.default],
      preload: true
    }), new _howler.Howl({
      src: [_click8.default, _click10.default, _click12.default],
      preload: true
    }), new _howler.Howl({
      src: [_click2.default, _click4.default, _click6.default],
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
    if (nextProps.isPlaying != this.props.isPlaying) {
      if (nextProps.isPlaying) {
        this.timerID = setInterval(this.update, this.calculateInterval(nextProps.bpm, nextProps.subdivision));
      } else {
        clearInterval(this.timerID);
      }
    } else if (nextProps.isPlaying && (nextProps.bpm != this.props.bpm || nextProps.subdivision != this.props.subdivision)) {
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
}(_react.PureComponent);

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
  isPlaying: _propTypes2.default.bool,
  soundEnabled: _propTypes2.default.bool,
  soundPattern: function soundPattern(props, propName, componentName) {
    if (props[propName]) {
      var propValue = props[propName],
          propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
      if (propType !== 'string') return new Error('Invalid prop `' + propName + '` of type `' + propType + '` supplied to ' + componentName + ', expected `string`.');
      if (propValue.length > 0 && propValue.length !== 4 * props['subdivision']) return new Error('Invalid prop `' + propName + '` with length ' + propValue.length + ' supplied to ' + componentName + ". Length value doesn't match with the subdivision, expected " + 4 * props['subdivision'] + '.');
    }
  },
  render: _propTypes2.default.func.isRequired
} : {};

ProMetronome.defaultProps = {
  bpm: 80,
  subdivision: 1,
  isPlaying: true,
  soundEnabled: false,
  soundPattern: ''
};

exports.default = ProMetronome;
module.exports = exports['default'];