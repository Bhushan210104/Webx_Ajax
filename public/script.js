// Dummy database (not needed now as we are fetching data from the server)
const existingUsers = ['Bhushan', 'Mohan', 'Sahil'];  // This is now just for UI logic
const colleges = [
  'MIT', 'Stanford', 'Harvard', 'IIT Delhi',
  'IIT Bombay', 'NIT Trichy', 'NIT Warangal', 'IIM Bangalore'
];

// Username live check with server
function checkUsername() {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const userMsg = document.getElementById('userMsg');

  // AJAX request to check if the username exists on the server
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/usernameCheck', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    const response = JSON.parse(xhr.responseText);
    if (response.exists) {
      userMsg.textContent = 'Username already exists!';
    } else {
      userMsg.textContent = '';
    }
  };
  xhr.send(JSON.stringify({ username }));
}

// Password match check (unchanged)
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

// College suggestions using the server
function suggestCollege() {
  const input = document.getElementById('college').value.toLowerCase();
  const suggestionsBox = document.getElementById('suggestions');
  suggestionsBox.innerHTML = '';

  if (input.length === 0) return;

  // AJAX request to get college suggestions from the server
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/suggestColleges?query=${input}`, true);
  xhr.onload = function () {
    const suggestions = JSON.parse(xhr.responseText);
    suggestions.forEach(college => {
      const div = document.createElement('div');
      div.textContent = college;
      div.className = 'list-group-item list-group-item-action';
      div.onclick = () => {
        document.getElementById('college').value = college;
        suggestionsBox.innerHTML = '';
      };
      suggestionsBox.appendChild(div);
    });
  };
  xhr.send();
}

// Final registration (with server-side communication)
function submitForm() {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;
  const message = document.getElementById('message');

  // Validate username and password
  if (existingUsers.includes(username)) {
    alert("Username already taken.");
    return false;
  }

  if (password !== confirm) {
    alert("Passwords do not match.");
    return false;
  }

  // Send registration data to the server
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/register', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    const response = JSON.parse(xhr.responseText);
    message.textContent = response.message;
    document.getElementById('registerForm').reset();
    document.getElementById('userMsg').textContent = '';
    document.getElementById('passMsg').textContent = '';
    document.getElementById('suggestions').innerHTML = '';
  };
  xhr.send(JSON.stringify({
    username,
    password,
    college: document.getElementById('college').value
  }));

  return false;
}
