import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import AdminLayout from '../../../HOC/AdminLayout/AdminLayout';
import FormField from '../../FormField/FormField';
import { validateField } from '../../../utils';
import {
  database,
  databasePlayers,
  firebase,
} from '../../../firebase';
import CustomFileUploader from '../../CustomFileUploader/CustomFileUploader';

export default class AddPlayer extends Component {

  state = {
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImage: '',
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Name',
          name: 'name',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Last Name',
          name: 'lastname',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Number',
          name: 'number',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a Position',
          name: 'position',
          type: 'select',
          options: [
            {
              key: 'Keeper',
              value: 'Keeper'
            },
            {
              key: 'Defence',
              value: 'Defence'
            },
            {
              key: 'Midfield',
              value: 'Midfield'
            },
            {
              key: 'Striker',
              value: 'Striker'
            },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
    },
  }

  componentDidMount = () => {
    const playerId = this.props.match.params.id;
    if (playerId) {
      database.ref(`players/${playerId}`).once('value')
        .then(snapshot => {
          const playerData = snapshot.val();
          firebase.storage().ref('players').child(playerData.image)
            .getDownloadURL().then(url => {
              this.updateFields(playerData, playerId, 'Edit Player', url);
            }).catch(e => {
              this.updateFields({ ...playerData, image: '' }, playerId, 'Edit Player', '');
            });
        })
    } else {
      this.setState({
        formType: 'Add Player'
      });
    }
  }

  formSuccess = message => {
    this.setState({
      formSuccess: message,
    });

    setInterval(() => this.setState({
      formSuccess: ''
    }), 2000)
  }

  handleInputChange = (event, id, content = '') => {
    const newFormData = { ...this.state.formData };

    if (content === '') {
      newFormData[id].value = event.target.value;
    } else {
      newFormData[id].value = content;
    }

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
    const {
      formData,
      formType,
      playerId,
    } = this.state;

    let dataToSubmit = {};
    let isFormValid = true;

    for (let key in formData) {
      dataToSubmit[key] = formData[key].value;
      isFormValid = formData[key].valid && isFormValid;
    }

    if (isFormValid) {
      if (formType === 'Edit Player') {
        database.ref(`players/${playerId}`).update(dataToSubmit)
          .then(() => {
            this.formSuccess('Updated Successfully');
          }).catch(e => {
            this.setState({ formError: true });
          });
      } else {
        databasePlayers.push(dataToSubmit).then(() => {
          this.props.history.push('/players');
        }).catch(e => this.setState({ formError: true }));
      }
    } else {
      this.setState({ formError: true })
    }
  }

  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData.image.value = '';
    newFormData.image.valid = false;

    this.setState({
      formData: newFormData,
      defaultImage: '',
    });
  }

  storeFilename = fileName => {
    this.handleInputChange({}, 'image', fileName);
  }

  updateFields = (playerData, playerId, formType, defaultImage) => {
    const newFormData = this.state.formData;

    for (let key in newFormData) {
      newFormData[key].value = playerData[key];
      newFormData[key].valid = true;
    }

    this.setState({
      playerId,
      formType,
      defaultImage,
      formData: newFormData,
    })
  }

  render() {
    const {
      formType,
      formData,
      formSuccess,
      formError,
      defaultImage,
    } = this.state;
    const {
      name,
      lastname,
      number,
      position,
      image,
    } = formData;

    return (
      <AdminLayout>
        <div className='editplayers_dialog_wrapper'>
          <h2>{formType}</h2>

          <form onSubmit={this.onFormSubmit}>
            <CustomFileUploader
              dir='players'
              tag='Player Image'
              defaultImage={defaultImage}
              defaultImageName={image.value}
              resetImage={this.resetImage}
              fileName={this.storeFilename}
            />
            <FormField
              id='name'
              formData={name}
              onChange={this.handleInputChange}
            />
            <FormField
              id='lastname'
              formData={lastname}
              onChange={this.handleInputChange}
            />
            <FormField
              id='number'
              formData={number}
              onChange={this.handleInputChange}
            />
            <FormField
              id='position'
              formData={position}
              onChange={this.handleInputChange}
            />

            <div className='success_label'>{formSuccess}</div>
            {formError && <div className='error_label'>Something is wrong </div>}

            <div className='admin_submit'>
              <button type='submit'>
                {formType || <CircularProgress size={20} />}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    )
  }
}
