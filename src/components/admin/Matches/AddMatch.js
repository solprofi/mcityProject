import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import AdminLayout from '../../../HOC/AdminLayout/AdminLayout';
import FormField from '../../FormField/FormField';
import { validateField, firebaseLooper } from '../../../utils';
import {
  database,
  databaseMatches,
  databaseTeams,
} from '../../../firebase';

export default class AddMatch extends Component {
  state = {
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    formData: {
      date: {
        element: 'input',
        value: '',
        config: {
          label: 'Event Date',
          name: 'date',
          type: 'date',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      local: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local Team',
          name: 'selectLocal',
          type: 'select',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      resultLocal: {
        element: 'input',
        value: '',
        config: {
          label: 'ResultLocal',
          name: 'resultLocal',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      away: {
        element: 'select',
        value: '',
        config: {
          label: 'Select an away Team',
          name: 'selectAway',
          type: 'select',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      resultAway: {
        element: 'input',
        value: '',
        config: {
          label: 'Result Away',
          name: 'resultAway',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      referee: {
        element: 'input',
        value: '',
        config: {
          label: 'Referee',
          name: 'referee',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      stadium: {
        element: 'input',
        value: '',
        config: {
          label: 'Stadium',
          name: 'stadium',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      result: {
        element: 'select',
        value: '',
        config: {
          label: 'Team Result',
          name: 'selectResult',
          type: 'select',
          options: [
            { key: 'W', value: 'W' },
            { key: 'L', value: 'L' },
            { key: 'D', value: 'D' },
            { key: 'n/a', value: 'n/a' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      final: {
        element: 'select',
        value: '',
        config: {
          label: 'Was Game Played',
          name: 'selectPlayed',
          type: 'select',
          options: [
            { key: 'Yes', value: 'Yes' },
            { key: 'No', value: 'No' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
    }
  }

  componentDidMount = () => {
    const matchId = this.props.match.params.id;

    const getTeams = (match, type) => {
      databaseTeams.once('value').then(snapshot => {
        const teams = firebaseLooper(snapshot);

        const teamOptions = teams.map(el => ({
          key: el.shortName,
          value: el.shortName,
        }));

        this.updateFields(match, teamOptions, teams, type, matchId);
      });
    }

    if (!matchId) {
      getTeams(false, 'Add Match');
    } else {
      database.ref(`matches/${matchId}`).once('value').then(snapshot => {
        const match = snapshot.val();
        getTeams(match, 'Edit Match');
      });
    }
  }

  handleInputChange = (event, id) => {
    const newFormData = { ...this.state.formData };
    newFormData[id].value = event.target.value;

    let checkedField = validateField(newFormData[id]);
    newFormData[id].valid = checkedField.isValid;
    newFormData[id].validationMessage = checkedField.errorMessage;

    this.setState({
      formData: newFormData,
      formError: false,
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { formData, formType, matchId, } = this.state;

    let dataToSubmit = {};
    let isFormValid = true;

    for (let key in formData) {
      dataToSubmit[key] = formData[key].value;
      isFormValid = formData[key].valid && isFormValid;
    }

    this.state.teams.forEach(team => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit.localThmb = team.thmb;
      }

      if (team.shortName === dataToSubmit.away) {
        dataToSubmit.awayThmb = team.thmb;
      }
    })

    if (isFormValid) {
      if (formType === 'Edit Match') {
        database.ref(`matches/${matchId}`).update(dataToSubmit)
          .then(response => {
            this.successForm('Updated correctly');
          })
          .catch(err => this.setState({ formError: true }));
      } else {
        databaseMatches.push(dataToSubmit).then(response => {
          this.props.history.push('/matches');
        }).catch(err => this.setState({ formError: true }));
      }
    } else {
      this.setState({ formError: true })
    }
  }

  successForm = message => {
    this.setState({ formSuccess: message });
    setTimeout(() => this.setState({ formSuccess: '' }), 2000);
  }

  updateFields = (match, teamOptions, teams, formType, matchId) => {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      if (match) {
        newFormData[key].valid = true;
        newFormData[key].value = match[key];
      }

      if (key === 'local' || key === 'away') {
        newFormData[key].config.options = teamOptions;
      }
    }

    this.setState({
      matchId,
      formType,
      formData: newFormData,
      teams,
    });
  }

  render() {
    const {
      formError,
      formSuccess,
      formType,
      formData,
    } = this.state;

    const {
      date,
      local,
      resultLocal,
      away,
      resultAway,
      referee,
      stadium,
      result,
      final,
    } = formData;

    return (
      <AdminLayout>
        <div className='editmatch_dialog_wrapper'>
          <h2>{formType}</h2>
          <div>
            <form onSubmit={this.onFormSubmit}>
              <FormField
                id='date'
                formData={date}
                onChange={this.handleInputChange}
              />

              <div className='select_team_layout'>
                <div className='label_inputs'>Local</div>
                <div className='wrapper'>
                  <div className='left'>
                    <FormField
                      id='local'
                      formData={local}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <FormField
                      id='resultLocal'
                      formData={resultLocal}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className='select_team_layout'>
                <div className='label_inputs'>Away</div>
                <div className='wrapper'>
                  <div className='left'>
                    <FormField
                      id='away'
                      formData={away}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <FormField
                      id='resultAway'
                      formData={resultAway}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className='split_fields'>
                <FormField
                  id='referee'
                  formData={referee}
                  onChange={this.handleInputChange}
                />
                <FormField
                  id='stadium'
                  formData={stadium}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='split_fields last'>
                <FormField
                  id='result'
                  formData={result}
                  onChange={this.handleInputChange}
                />
                <FormField
                  id='final'
                  formData={final}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='success_label'>{formSuccess}</div>
              {formError && <div className='error_label'>Something is wrong </div>}

              <div className='admin_submit'>
                <button type='submit'>
                  {formType || <CircularProgress size={20} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    )
  }
}
