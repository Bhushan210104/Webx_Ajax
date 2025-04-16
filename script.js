// Dummy database
const existingUsers = ['Bhushan', 'Mohan', 'Sahil'];
const colleges = [
  'MIT', 'Stanford', 'Harvard', 'IIT Delhi',
  'IIT Bombay', 'NIT Trichy', 'NIT Warangal', 'IIM Bangalore'
];

// Username live check
function checkUsername() {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const userMsg = document.getElementById('userMsg');

  if (existingUsers.map(u => u.toLowerCase()).includes(username)) {
    userMsg.textContent = 'Username already exists!';
  } else {
    userMsg.textContent = '';
  }
}

// Password match check
function checkPasswordMatch() {
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;
  const passMsg = document.getElementById('passMsg');

  if (confirm.length > 0) {
    if (password !== confirm) {
      passMsg.textContent = 'Passwords do not match!';
    } else {
      passMsg.textContent = '';
    }
  } else {
    passMsg.textContent = '';
  }
}

// College suggestions
function suggestCollege() {
  const input = document.getElementById('college').value.toLowerCase();
  const suggestionsBox = document.getElementById('suggestions');
  suggestionsBox.innerHTML = '';

  if (input.length === 0) return;

  const matches = colleges.filter(college =>
    college.toLowerCase().startsWith(input)
  );

  matches.forEach(college => {
    const div = document.createElement('div');
    div.textContent = college;
    div.className = 'list-group-item list-group-item-action';
    div.onclick = () => {
      document.getElementById('college').value = college;
      suggestionsBox.innerHTML = '';
    };
    suggestionsBox.appendChild(div);
  });
}

// Final registration
function submitForm() {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;
  const message = document.getElementById('message');

  if (existingUsers.map(u => u.toLowerCase()).includes(username)) {
    alert("Username already taken.");
    return false;
  }

  if (password !== confirm) {
    alert("Passwords do not match.");
    return false;
  }

  // Simulate AJAX delay
  setTimeout(() => {
    message.textContent = "Successfully Registered!";
    document.getElementById('registerForm').reset();
    document.getElementById('userMsg').textContent = '';
    document.getElementById('passMsg').textContent = '';
    document.getElementById('suggestions').innerHTML = '';
  }, 400);

  return false;
}
