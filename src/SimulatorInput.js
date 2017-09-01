import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import './Simulator.css';

class SimulatorInput extends Component {
  render() {
    return(
      <div className="Simulator-input-container">
        <div className="Simulator-input-label">
          {this.props.label}
        </div>
        <FormGroup validationState={this.props.getValidationState}>
          <FormControl
            className="Simulator-input"
            onChange={this.props.handleChange}
            type="text"
            value={this.props.value} />
        </FormGroup>
      </div>
    );
  }
}

export default SimulatorInput;
