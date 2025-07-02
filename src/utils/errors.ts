export function parseErrors(errors: any) {
  if (!errors) {
    return {};
  }
  return Object.keys(errors).reduce((acc:any, val) => {
    acc[val] = errors[val].join(', ');
    return acc;
  }, {});
}

export const setErrors = (errs: any, setError: any) => {
  Object.keys(parseErrors(errs)).forEach((field: string) => {
    setError(field, {
      type: 'manual',
      message: errs[field],
    });
  });
};
