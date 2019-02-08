import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import { Promise } from 'core-js';
import PlayerCard from '../PlayerCard/PlayerCard';
import StripesBackground from '../../resources/images/stripes.png';
import { databasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../../utils';

export default class Team extends Component {
  state = {
    isLoading: true,
  }

  componentDidMount = () => {
    databasePlayers.once('value').then(snapshot => {
      const players = firebaseLooper(snapshot);

      let promises = [];

      for (let key in players) {
        promises.push(new Promise((resolve, reject) => {
          firebase.storage().ref('players')
            .child(players[key].image).getDownloadURL()
            .then(url => {
              players[key].url = url;
              resolve();
            });
        }));
      }
      Promise.all(promises).then(() => {
        this.setState({
          isLoading: false,
          players,
        });
      });
    }
    )
  }

  renderPlayers = position => {
    const { players } = this.state;

    return players && players.map((player, index) => {
      return player.position === position ?
        <Fade
          left
          key={index}
          delay={index * 30}
        >
          <div className='item'>
            <PlayerCard
              name={player.name}
              lastName={player.lastname}
              number={player.number}
              background={player.url}
            />
          </div>
        </Fade>
        : null;
    })
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div
        className='the_team_container'
        style={{
          background: `url(${StripesBackground}) repeat`
        }}
      >
        {!isLoading &&
          <div>
            <div className='team_category_wrapper'>
              <div className='title'>Keepers</div>
              <div className='team_cards'>
                {this.renderPlayers('Keeper')}
              </div>
              <div className='title'>Defence</div>
              <div className='team_cards'>
                {this.renderPlayers('Defence')}
              </div>
              <div className='title'>Midfield</div>
              <div className='team_cards'>
                {this.renderPlayers('Midfield')}
              </div>
              <div className='title'>Strikers</div>
              <div className='team_cards'>
                {this.renderPlayers('Striker')}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
