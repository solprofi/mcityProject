import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';
import ThumbnailPlayer from '../../resources/images/players/Otamendi.png';
import PlayerCard from '../PlayerCard/PlayerCard';

export default class PlayerCards extends Component {

  state = {
    cards: [
      {
        bottom: 90,
        left: 300
      },
      {
        bottom: 60,
        left: 200
      },
      {
        bottom: 30,
        left: 100
      },
      {
        bottom: 0,
        left: 0
      },
    ],
  }

  renderCards = () => (
    this.state.cards.map((card, index) => (
      <Animate
        key={index}
        show={this.props.isShowing}
        start={{
          bottom: 0,
          left: 0,
        }}

        enter={{
          bottom: [card.bottom],
          left: [card.left],
          timing: {
            duration: 500,
            ease: easePolyOut,
          }
        }}
      >
        {({ left, bottom }) => (
          <div style={{
            position: 'absolute',
            bottom,
            left,
          }}>
            <PlayerCard
              number='30'
              name='Nicolas'
              lastName='Otemendi'
              background={ThumbnailPlayer} />
          </div>
        )}
      </Animate>
    )))

  render() {
    return (
      <div>
        {this.renderCards()}
      </div>
    )
  }
}
