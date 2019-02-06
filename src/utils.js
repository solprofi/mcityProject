export const firebaseLooper = snapshot => {
  let data = [];

  snapshot.forEach(el => {
    data.push({
      ...el.val(),
      id: el.key,
    });
  });

  return data;
}

export const validateField = element => {
  let error = {
    isValid: true,
    errorMessage: '',
  }

  let errorCount = 0;

  if (element.validation.email) {
    const isEmail = /\S+@\S+\.\S+/.test(element.value);
    if (!isEmail) {
      errorCount++;
      error.isValid = false;
      error.errorMessage = 'This must be a valid email';
    }
  }

  if (element.validation.required) {
    const isEmpty = element.value.trim() === '';
    if (isEmpty) {
      errorCount++;
      error.isValid = false;
      error.errorMessage = 'This field is required';
    }
  }

  if (!errorCount) {
    error.isValid = true;
    error.errorMessage = '';
  }

  return error;
} 