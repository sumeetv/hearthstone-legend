import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

import './Simulator.css';

class SimulatorInput extends Component {
  render() {
    return(
      <div className="Simulator-input-container">
        <div className="Simulator-input-label">
          {this.props.label}
        </div>
        <div>
          <FormControl className="Simulator-input" type="text" />
        </div>
      </div>
    );
  }
}

export default SimulatorInput;
