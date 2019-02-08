import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../../firebase';

const AdminNav = () => {
  const links = [
    {
      title: 'Matches',
      linkTo: '/matches',
    },
    {
      title: 'Add Match',
      linkTo: '/matches/editMatch',
    },
    {
      title: 'Players',
      linkTo: '/players',
    },
    {
      title: 'Add Player',
      linkTo: '/players/addPlayer',
    },
  ];

  const style = {
    color: '#ffffff',
    fontWeight: '300',
    borderBottom: '1px solid #353535',
  }


  const logOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('logged out');
    }).catch(error => console.log('Error when loggin out'))
  }


  const renderItems = () => (
    links.map(el => (
      <Link
        to={el.linkTo}
        key={el.title}
      >
        <ListItem
          button
          style={style}
        >
          {el.title}
        </ListItem>
      </Link>
    ))
  )
  return (
    <div>
      {renderItems()}
      <ListItem
        button
        onClick={logOut}
        style={style}
      >
        Log Out
      </ListItem>
    </div>
  )
}

export default AdminNav;
