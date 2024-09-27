

const isValidEmail = (email: string) => {
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email.match(emailFormat) && email.length > 0 ? true : false;
}

const isValidUsername = (name: string) => {
  return name.length > 0 ? true : false;
}

const isValidPassword = (password: string) => {
  return password.length >= 8 ? true : false;
}

const isValidSecondPassword = (password: string, secondPassword: string) => {
  return password === secondPassword && isValidPassword(secondPassword) ? true : false;
}

const isValidThreeNums = (strNum: string) => {
  return strNum.length === 3 ? true : false;
}

const isValidFourNums = (strNum: string) => {
  return strNum.length === 4 ? true : false;
}

const isValidOtp = (otp: string) => {
  return otp.length === 6;
}

export const validateInputs = { isValidEmail, isValidUsername, isValidPassword, isValidSecondPassword, isValidThreeNums, isValidFourNums, isValidOtp };