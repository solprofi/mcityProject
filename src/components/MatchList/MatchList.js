import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { databaseMatches } from '../../firebase';
import { firebaseLooper } from '../../utils';
import LeagueTable from './LeagueTable';
import Matches from './Matches';

export default class MatchList extends Component {
  state = {
    isLoading: true,
    matches: [],
    filteredMatches: [],
    playedFilter: 'All',
    resultFilter: 'All',
  }

  componentDidMount = () => {
    databaseMatches.once('value').then(snapshot => {
      const matches = firebaseLooper(snapshot).reverse();

      this.setState({
        isLoading: false,
        matches,
        filteredMatches: matches,
      });
    });
  }

  showPlayed = type => {
    const filteredMatches = this.state.matches.filter(match => match.final === type);

    this.setState({
      filteredMatches: type === 'All' ? this.state.matches : filteredMatches,
      playedFilter: type,
      resultFilter: 'All',
    });
  }

  showResult = type => {
    const filteredMatches = this.state.matches.filter(match => match.result === type);

    this.setState({
      filteredMatches: type === 'All' ? this.state.matches : filteredMatches,
      playedFilter: 'All',
      resultFilter: type,
    });
  }


  render() {
    const {
      filteredMatches,
      playedFilter,
      resultFilter,
    } = this.state;

    return (
      <div className='the_matches_container'>
        <div className='the_matches_wrapper'>
          <div className='left'>
            <div className='match_filters'>
              <div className='match_filters_box'>
                <div className='tag'>
                  Show Match
                </div>
                <div className='cont'>
                  <div className={`option ${playedFilter === 'All' && 'active'}`} onClick={() => this.showPlayed('All')}>All</div>
                  <div className={`option ${playedFilter === 'Yes' && 'active'}`} onClick={() => this.showPlayed('Yes')}>Played</div>
                  <div className={`option ${playedFilter === 'No' && 'active'}`} onClick={() => this.showPlayed('No')}>Not Played</div>
                </div>
              </div>

              <div className='match_filters_box'>
                <div className='tag'>
                  Game Result
                </div>
                <div className='cont'>
                  <div className={`option ${resultFilter === 'All' && 'active'}`} onClick={() => this.showResult('All')}>All</div>
                  <div className={`option ${resultFilter === 'W' && 'active'}`} onClick={() => this.showResult('W')}>W</div>
                  <div className={`option ${resultFilter === 'L' && 'active'}`} onClick={() => this.showResult('L')}>L</div>
                  <div className={`option ${resultFilter === 'D' && 'active'}`} onClick={() => this.showResult('D')}>D</div>
                </div>
              </div>
            </div>
            <Matches matches={filteredMatches} />
          </div >
          <div className='right'>
            <LeagueTable />
          </div>
        </div >

      </div >
    )
  }
}
