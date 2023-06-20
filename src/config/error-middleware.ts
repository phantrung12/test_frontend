const getErrorMessage = (errorData: any) => {
  let message = errorData.message;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach((fErr: any) => {
      message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
    });
  }
  return message;
};

export default () => (next: any) => (action: any) => {
  // if (DEVELOPMENT) {
  const { error } = action;
  if (error) {
    console.error(
      `${action.type} caught at middleware with reason: ${JSON.stringify(
        error.message,
      )}.`,
    );
    if (error.response && error.response.data) {
      const message = getErrorMessage(error.response.data);
      console.error(`Actual cause: ${message}`);
    }
  }

  return next(action);
};
