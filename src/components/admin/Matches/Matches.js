import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import AdminLayout from '../../../HOC/AdminLayout/AdminLayout';
import { databaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../../utils';

export default class Matches extends Component {

  state = {
    isLoading: true,
    matches: [],
  }

  componentDidMount = () => {
    databaseMatches.once('value').then(snapshot => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        matches: matches.reverse(),
      });
    });
  }

  render() {
    const { matches, isLoading } = this.state;
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Match</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matches &&
                  matches.map((match, index) => (
                    <TableRow key={index}>
                      <TableCell>{match.date}</TableCell>
                      <TableCell>
                        <Link to={`/matches/editMatch/${match.id}`}>
                          {match.local} - {match.away}
                        </Link>
                      </TableCell>
                      <TableCell>{match.resultLocal} - {match.resultAway}</TableCell>
                      <TableCell>
                        {match.final === 'Yes' ?
                          <span className='matches_tag_red'>Final</span>
                          :
                          <span className='matches_tag_green'>Not Played yet</span>
                        }
                      </TableCell>
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
