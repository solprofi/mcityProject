import React from 'react';
import { CityLogo } from '../Icons/Icons';


const Footer = () => {
  return (
    <footer className='bck_blue'>
      <div className='footer_logo'>
        <CityLogo
          height='70px'
          width='70px'
          link={true}
          linkTo='/'
        />
      </div>

      <div className='footer_disclaimer'>
        Manchester City 2018. All right reserved.
      </div>
    </footer>
  )
}

export default Footer;
