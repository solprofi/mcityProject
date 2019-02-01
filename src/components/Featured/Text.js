import React from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';

import playerImage from '../../resources/images/featured_player.png';

const Text = () => {
  const animateNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0,
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: {
          duration: 1000,
          ease: easePolyOut,
        }
      }}
    >
      {({ opacity, rotate }) => (
        <div
          className='featured_number'
          style={{
            opacity,
            transform: `translate(260px, 170px) rotateY(${rotate}deg)`
          }}
        >
          3
          </div>
      )}
    </Animate>
  );

  const animateFirst = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 503,
        y: 450,
      }}
      enter={{
        opacity: [1],
        x: [273],
        y: [450],
        timing: {
          duration: 800,
          ease: easePolyOut,
        }
      }}
    >
      {({ opacity, x, y }) => (
        <div
          className='featured_first'
          style={{
            opacity,
            transform: `translate(${x}px, ${y}px)`
          }}
        >
          League
        </div>
      )}
    </Animate>
  );

  const animateSecond = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 503,
        y: 586,
      }}
      enter={{
        opacity: [1],
        x: [273],
        y: [586],
        timing: {
          duration: 800,
          ease: easePolyOut,
          delay: 300,
        }
      }}
    >
      {({ opacity, x, y }) => (
        <div
          className='featured_second'
          style={{
            opacity,
            transform: `translate(${x}px, ${y}px)`
          }}
        >
          Champions
        </div>
      )}
    </Animate>
  );

  const animatePlayer = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
      }}
      enter={{
        opacity: [1],
        timing: {
          duration: 800,
          ease: easePolyOut,
          delay: 800,
        }
      }}
    >
      {({ opacity }) => (
        <div
          className='featured_player'
          style={{
            opacity,
            transform: `translate(550px, 201px)`,
            background: `url(${playerImage})`
          }}
        >
        </div>
      )}
    </Animate>
  );
  return (
    <div className='featured_text'>
      {animatePlayer()}
      {animateNumber()}
      {animateFirst()}
      {animateSecond()}
    </div>
  )
}

export default Text;
