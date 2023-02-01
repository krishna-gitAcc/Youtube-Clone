export const CreateCustomeError = (message, status) => {
  let err = new Error();
  err.message = message;
  err.status = status;
  return err;
};
