// For email validation
export const validateEmail = (email) => {
  // Email Regular Expression
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  return email.match(validEmail);
};

// Validate name, Check name length
export const validateName = (name) => {
  return name.length < 4;
};

// Validate password length: Can be more complex but, Temprory this will work
export const validatePassword = (password) => {
  return password.length < 8;
};

// Check both length of password and compare both. Before sending to server
export const validateConfirmPassword = (password, confirmPassword) => {
  if (password.length < 8 || confirmPassword.length < 8) return false;
  return password === confirmPassword;
};
