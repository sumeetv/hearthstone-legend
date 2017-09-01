import React, { Component } from 'react'; 
import SimulatorInput from './SimulatorInput.js';

import './Simulator.css';

const MAX_GAMES_ALLOWED = 5000;

class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRank: 25,
      initialStars: 0,
      initialWinRate: 50,
      maxGames: MAX_GAMES_ALLOWED
    }
  }

  getStarsForRank(rank) {
    if (rank > 25 || rank < 0) {
      throw new Error("Invalid rank: " + rank);
    } else if (rank > 20) {
      return 2;
    } else if (rank > 15) {
      return 3;
    } else if (rank > 10) {
      return 4;
    } else {
      return 5;
    }
  }

  getBonusStarsForRank(rank) {
    if (rank > 5) {
      return 1;
    } else {
      return 0;
    }
  }

  isRankProtected(rank) {
    if ((rank % 5) === 0) {
      return true;
    }
    if (rank >= 20) {
      return true;
    }
    return false;
  }

  runSimulation(win_rate) {
    if (win_rate > 1 || win_rate < 0) {
      throw new Error("Please enter a valid win rate: " + win_rate);
    }

    const numRuns = 100;
    let successfulRuns = [];

    for (let curRun = 0; curRun < numRuns; curRun++) {
      let currentRank = 25;
      let currentStars = 0;
      let mostRecentGames = [false, false];
      let gamesPlayed;

      for (gamesPlayed = 0; gamesPlayed < MAX_GAMES_ALLOWED; gamesPlayed++) {
        // We've hit legend!
        if (currentRank === 0) {
          break;
        }

        let wonCurrentGame = Math.random() < win_rate;

        // We've won, so let's rank up and get our stars
        if (wonCurrentGame) {
          currentStars ++

          // Did we get a bonus star?
          if (!(false in mostRecentGames) && currentRank > 5) {
            currentStars++;
          }

          // Update rank
          let starsForLevel = this.getStarsForRank(currentRank);
          if (currentStars > starsForLevel) {
            currentStars -= starsForLevel;
            currentRank--;
          }
        } else {
          // Just lose a star if we have extra at this level
          if (currentStars > 0) {
            currentStars--;
          } else {
            // Check to see if we can't go down a level
            if (this.isRankProtected(currentRank)) {
              currentStars = 0;
            } else {
              currentRank++;
              currentStars = this.getStarsForRank(currentRank) - 1;
            }
          }
        }

        // Update the most recent game played to adjust for win streak
        mostRecentGames.shift();
        mostRecentGames.push(wonCurrentGame);
      }

      if (currentRank === 0) {
        successfulRuns.push(gamesPlayed);
      }
    }

    return successfulRuns;
  }

  handleRankChange(e) {
    this.setState({
      initialRank: e.target.value
    });
  }

  validateRank() {
    if (this.state.initialRank <= 25 && this.state.initialRank > 0) {
      return 'success';
    }
    return 'error';
  }

  handleStarsChange(e) {
    this.setState({
      initialStars: e.target.value
    });
  }

  validateStars() {
    if (this.validateRank() === 'error') {
      return 'error';
    }
    if ((this.state.initialStars >= 0) &&
        (this.state.initialStars <= this.getStarsForRank(this.state.initialRank))) {
      return 'success';
    }
    return 'error';
  }

  handleWinRateChange(e) {
    this.setState({
      initialWinRate: e.target.value
    });
  }

  validateWinRate() {
    if (this.state.initialWinRate >= 0 && this.state.initialWinRate <= 100) {
      return 'success';
    }
    return 'error';
  }

  handleMaxGamesChange(e) {
    this.setState({
      maxGames: e.target.value
    });
  }

  validateMaxGames() {
    if (this.state.maxGames >=1) {
      return 'success';
    }
    return 'error';
  }

  render() {
    return (
      <div className="Simulator-form">
        <SimulatorInput
          label={"Starting Rank"}
          value={this.state.initialRank}
          handleChange={this.handleRankChange.bind(this)} 
          getValidationState={this.validateRank()} />
        <SimulatorInput
          label={"Starting Stars"}
          value={this.state.initialStars}
          handleChange={this.handleStarsChange.bind(this)}
          getValidationState={this.validateStars()} />
        <SimulatorInput
          label={"Win Rate (%)"}
          value={this.state.initialWinRate}
          handleChange={this.handleWinRateChange.bind(this)}
          getValidationState={this.validateWinRate()} />
        <SimulatorInput
          label={"Max Games"}
          value={this.state.maxGames}
          handleChange={this.handleMaxGamesChange.bind(this)} />
      </div>
    );
  }
}

export default Simulator;
