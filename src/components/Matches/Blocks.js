import React, { Component } from 'react';
import Slide from 'react-reveal';
import { databaseMatches } from '../../firebase';
import { firebaseLooper } from '../../utils';
import MatchBlock from './MatchBlock';

export default class Blocks extends Component {
  state = {
    matches: [],
  }

  componentDidMount = () => {
    databaseMatches.limitToLast(6).once('value').then(snapshot => {
      const matches = firebaseLooper(snapshot).reverse();
      this.setState({ matches });
    })
  }


  showMatches = () => {
    const { matches } = this.state;

    if (matches) {
      return matches.map(match => (
        <Slide bottom key={match.id}>
          <div className='item'>
            <div className='wrapper'>
              <MatchBlock match={match} />
            </div>
          </div>
        </Slide>
      ));
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className='home_matches'>
        {this.showMatches()}
      </div>
    )
  }
}
