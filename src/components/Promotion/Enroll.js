import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../FormField/FormField';
import { validateField } from '../../utils';
import { databasePromotions } from '../../firebase';

export default class Enroll extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: '',
      }
    }
  }

  clearSuccess = () => {
    setTimeout(() => {
      this.setState({ formSuccess: '' });
    }, 2000);
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
    const { formData } = this.state;

    let dataToSubmit = {};
    let isFormValid = true;

    for (let key in formData) {
      dataToSubmit[key] = formData[key].value;
      isFormValid = formData[key].valid && isFormValid;
    }

    if (isFormValid) {
      databasePromotions
        .orderByChild('email')
        .equalTo(dataToSubmit.email)
        .once('value')
        .then(snapshot => {
          if (snapshot.val() === null) {
            databasePromotions.push(dataToSubmit)
            this.resetFormSuccess(false);
          } else {
            this.resetFormSuccess(true);
          }

        });
    } else {
      this.setState({ formError: true })
    }
  }

  resetFormSuccess = isInDatabase => {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      newFormData[key].value = '';
      newFormData[key].valid = false;
      newFormData[key].validationMessage = false;
    }

    this.setState({
      formData: newFormData,
      formError: false,
      formSuccess: isInDatabase ? 'User is in the database already' : 'Congrats',
    });

    this.clearSuccess();
  }

  render() {
    return (
      <Fade>
        <div className='enroll_wrapper'>
          <form onSubmit={this.onFormSubmit}>
            <div className='enroll_title'>
              Enter your email
            </div>
            <div className='enroll_input'>
              <FormField
                id='email'
                formData={this.state.formData.email}
                onChange={this.handleInputChange}
              />
              <button type='submit'>Enroll</button>

              {this.state.formError && (
                <div className='error_label'>
                  Something is wrong
                </div>
              )}

              {this.state.formSuccess && (
                <div className='success_label'>
                  {this.state.formSuccess}
                </div>
              )}
            </div>
          </form>
        </div>
      </Fade>
    )
  }
}
