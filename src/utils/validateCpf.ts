export const validateCpf = (cpf: string) => {
  if (cpf.length !== 11) {
    return false;
  }

  const cpfNumbers = cpf.split("").map((number) => parseInt(number, 10));

  const firstDigit = cpfNumbers[9];
  const secondDigit = cpfNumbers[10];

  const firstDigitSum = cpfNumbers
    .slice(0, 9)
    .reduce((acc, number, index) => acc + number * (10 - index), 0);

  const firstDigitResult = (firstDigitSum * 10) % 11;

  const secondDigitSum = cpfNumbers
    .slice(0, 10)
    .reduce((acc, number, index) => acc + number * (11 - index), 0);

  const secondDigitResult = (secondDigitSum * 10) % 11;

  return (
    (firstDigitResult === 10 || firstDigitResult === firstDigit) &&
    (secondDigitResult === 10 || secondDigitResult === secondDigit)
  );
};
