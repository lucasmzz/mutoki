import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: '100%'
  },
  slider: {
    margin: '30px 30px',
    padding: '22px 0px',
    selectionColor: 'black',
    rippleColor: 'black'
  },
};

class SimpleSlider extends React.Component {
  state = {
    value: 85,
    min: 60,
    max: 220,
    step: 1
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onSliderChange(value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
          min={this.state.min}
          max = {this.state.max}
          step={this.state.step}
        />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
