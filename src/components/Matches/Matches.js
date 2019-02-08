import React from 'react';
import { Tag } from '../Tag/Tag';
import Blocks from './Blocks';

const Matches = () => {
  return (
    <div className='home_matches_wrapper'>
      <div className='container'>
        <Tag
          background='#0e1731'
          fontSize='50px'
          color='#ffffff'
        >
          Matches
        </Tag>

        <Blocks />

        <Tag
          isLink={true}
          linkTo='/matches'
          background='#ffffff'
          fontSize='22px'
          color='#0e1731'
        >
          See More Matches
        </Tag>
      </div>

    </div>
  )
}

export default Matches;
