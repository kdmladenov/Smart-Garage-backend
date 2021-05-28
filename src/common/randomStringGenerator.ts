const randomStringGenerator = (length: number, initialValue = ''): string => {
  let outString = initialValue;
  const lowerChar: string = "abcdefghijklmnopqrstuvwxyz";
  const upperChar: string = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const numbers: string = "0123456789";
  for (let i = 0; i < length - 2; i++) {
    outString += lowerChar.charAt(Math.floor(Math.random() * lowerChar.length));
  }

  return (
    outString
    + upperChar.charAt(Math.floor(Math.random() * upperChar.length))
    + numbers.charAt(Math.floor(Math.random() * numbers.length))
  );
};

export default randomStringGenerator;
