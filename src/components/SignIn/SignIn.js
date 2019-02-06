import React, { Component } from 'react';
import FormField from '../FormField/FormField';
import { validateField } from '../../utils';
import { firebase } from '../../firebase';

export default class SignIn extends Component {
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
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      }
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
    const { formData } = this.state;

    let dataToSubmit = {};
    let isFormValid = true;

    for (let key in formData) {
      dataToSubmit[key] = formData[key].value;
      isFormValid = formData[key].valid && isFormValid;
    }

    if (isFormValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push('/dashboard');
        }).catch(error => {
          this.setState({ formError: true })
        });
    } else {
      this.setState({ formError: true })
    }
  }


  render() {
    return (
      <div className='container'>
        <div className='signin_wrapper' style={{ margin: '100px' }}>
          <form onSubmit={this.onFormSubmit}>
            <h2>Please Log In</h2>
            <FormField
              id='email'
              formData={this.state.formData.email}
              onChange={this.handleInputChange}
            />
            <FormField
              id='password'
              formData={this.state.formData.password}
              onChange={this.handleInputChange}
            />
            <button type='submit'>Log In</button>
            {this.state.formError && (
              <div className='error_label'>
                Something is wrong
                </div>
            )}
          </form>
        </div>
      </div>
    )
  }
}
