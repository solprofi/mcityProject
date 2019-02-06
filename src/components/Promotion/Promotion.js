import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Jersey from '../../resources/images/jersey.jpg';
import Enroll from './Enroll';

const Promotion = () => {
  return (
    <div className='promotion_wrapper' style={{ background: '#ffffff' }}>
      <div className='container'>
        <div className='promotion_animation'>
          <div className='left'>
            <Zoom>
              <div>
                <span>Win a</span>
                <span>Jersey</span>
              </div>
            </Zoom>
          </div>
          <div className='right'>
            <Zoom>
              <div style={{ background: `url(${Jersey}) no-repeat` }}></div>
            </Zoom>
          </div>
        </div>
        <Enroll />
      </div>
    </div>
  )
}

export default Promotion;
