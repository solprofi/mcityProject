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

  const showLabel = () => (
    formData.showLabel &&
    <div className='label_inputs'>{formData.config.label}</div>
  )

  const renderFormData = () => {
    let formTemplate = null;
    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div>
            {showLabel()}
            <input
              {...formData.config}
              value={formData.value}
              onChange={event => onChange(event, id)}
            />

            {displayError()}
          </div>
        )
        break;
      case 'select':
        formTemplate = (
          <div>
            {showLabel()}

            <select
              value={formData.value}
              onChange={event => onChange(event, id)}
            >
              <option value=''>Select One</option>
              {
                formData.config.options.map(el => (
                  <option value={el.key} key={el.key}>
                    {el.value}
                  </option>
                ))
              }
            </select>

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
