interface PasswordStrength {
  label: string;
  color: string;
}

const estimatePasswordStrength = (password: string): PasswordStrength => {
  const strength = {
    label: "",
    color: "",
  };

  const length = password.length;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-={};':"|,.<>?]/.test(password);

  if (length < 8) {
    strength.label = "Weak";
    strength.color = "red";
  } else if (length >= 8 && length < 12) {
    if (hasLowercase && hasUppercase && hasNumber) {
      strength.label = "Safe";
      strength.color = "#00FF00";
    } else {
      strength.label = "Weak";
      strength.color = "red";
    }
  } else if (length >= 12) {
    if (hasLowercase && hasUppercase && hasNumber && hasSpecialChar) {
      strength.label = "Safe";
      strength.color = "#00FF00";
    } else {
      strength.label = "Risk";
      strength.color = "orange";
    }
  }

  return strength;
};

export default estimatePasswordStrength;
