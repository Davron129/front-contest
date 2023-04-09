let user = window.localStorage.getItem("user");
if (user) {
  show_login(true)
} else {
  show_login(false)
}
function show_login(is_user) {
  console.log(is_user)
}

// Function to validate registration credentials and save the user in local storage
function register() {
  // Check if the password and confirm password match
  if (regPasswordInput.value !== confirmPasswordInput.value) {
    registrationErrorLabel.textContent = 'Passwords do not match.';
    registrationErrorLabel.style.color = 'red';
    return;
  }

  // Save the user in local storage
  const user = {
    name: nameInput.value,
    username: regUsernameInput.value,
    password: regPasswordInput.value
  };
  localStorage.setItem('user', JSON.stringify(user));

  // Hide the registration form
  hideRegistrationForm();
}