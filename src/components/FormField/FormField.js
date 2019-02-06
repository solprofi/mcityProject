import React from 'react';

const FormField = ({ formData, id, onChange }) => {

  const displayError = () => (
    <div className='error_label'>
      {
        formData.validation
        && !formData.valid
        && formData.validationMessage
      }
    </div>
  )

  const renderFormData = () => {
    let formTemplate = null;
    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div>
            <input
              {...formData.config}
              value={formData.value}
              onChange={event => onChange(event, id)}
            />

            {displayError()}
          </div>
        )
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  }
  return (
    <div>
      {renderFormData()}
    </div>
  )
}

export default FormField;
