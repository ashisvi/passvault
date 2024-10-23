export const validatePassword = (
  password: string,
): "weak" | "medium" | "strong" => {
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
  );
  if (regex.test(password)) {
    return "strong";
  } else if (
    password.length >= 8 &&
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    return "medium";
  } else {
    return "weak";
  }
};
