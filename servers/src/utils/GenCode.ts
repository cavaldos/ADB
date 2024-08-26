function generateRandomCode(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

function createUniqueDiscountCode(
  existingCodes: string[],
  length: number = 10
): string {
  let newCode: string;
  do {
    newCode = generateRandomCode(length);
  } while (existingCodes.includes(newCode));
  return newCode;
}

// Example usage
const existingCodes: string[] = ["ABCDEF1234", "ZYXWVUT987", "LMNOPQ4567"];

const GenDiscountCode = () => {
  const newDiscountCode: string = createUniqueDiscountCode(existingCodes);

  return newDiscountCode;
};
export default GenDiscountCode;