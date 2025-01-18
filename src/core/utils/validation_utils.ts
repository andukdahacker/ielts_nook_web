export function validateEmail(email: string) {
  return /^\S+@\S+$/.test(email) ? null : "Invalid email.";
}

export function validatePassword(password: string) {
  if (password == "") {
    return "Please enter your password.";
  }

  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]).*$/.test(
      password,
    )
  ) {
    return null;
  }

  return "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.";
}
