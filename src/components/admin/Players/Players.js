import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout/AdminLayout';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { databasePlayers } from '../../../firebase';
import { firebaseLooper } from '../../../utils';

export default class Players extends Component {

  state = {
    isLoading: true,
    players: [],
  }

  componentDidMount = () => {
    databasePlayers.once('value').then(snapshot => {
      const players = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        players,
      });
    })
  }
  render() {
    const { players, isLoading } = this.state;
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players &&
                  players.map((player, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Link to={`players/addPlayer/${player.id}`}>
                          {player.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`players/addPlayer/${player.id}`}>
                          {player.lastname}
                        </Link>
                      </TableCell>
                      <TableCell>{player.number}</TableCell>
                      <TableCell>{player.position}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Paper>

          <div className='admin_progress'>
            {isLoading &&
              <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
            }
          </div>
        </div>
      </AdminLayout>
    )
  }
}
