import React, { Component } from 'react';
import { Reveal } from 'react-reveal';
import { Tag } from '../Tag/Tag';
import stripes from '../../resources/images/stripes.png';
import PlayerCards from '../PlayerCards/PlayerCards';

const text = [
  'Meet',
  'The',
  'Players',
];

export default class MeetPlayers extends Component {
  state = {
    isShowing: false,
  }

  render() {
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => this.setState({ isShowing: true })}
      >
        <div className='home_meetplayers' style={{ background: `#ffffff url(${stripes})` }}>
          <div className='container'>
            <div className='home_meetplayers_wrapper'>
              <div className='home_card_wrapper'>
                <PlayerCards isShowing={this.state.isShowing} />
              </div>

              <div className='home_text_wrapper'>
                <div>
                  {text.map((el, id) => (
                    <Tag
                      key={id}
                      background='#0e1731'
                      fontSize='100px'
                      color='#ffffff'
                      add={{
                        display: 'inline-block',
                        marginBottom: '20px',
                      }}
                    >
                      {el}
                    </Tag>
                  ))}
                </div>
                <div>
                  <Tag
                    background='#ffffff'
                    color='#0e1731'
                    fontSize='27px'
                    isLink={true}
                    linkTo='/team'
                    add={{
                      display: 'inline-block',
                      marginBottom: '27px',
                      border: '1px solid #0e1731'
                    }}
                  >
                    Meet them here
                </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    )
  }
}
