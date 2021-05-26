const randomStringGenerator = (length: number, initialValue = '', inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789'): string => {
  let outString = initialValue;
  for (let i = 0; i < length; i++) {
    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }

  return outString;
};

export default randomStringGenerator;
