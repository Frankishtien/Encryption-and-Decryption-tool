// Function to encode to Base64
function encodeBase64(input) {
  return btoa(input);
}

// Function to decode from Base64
function decodeBase64(input) {
  return atob(input);
}

// Function to encode using ROT13
function rot13(input) {
  return input.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode(
      (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
    );
  });
}

// Function for Caesar Cipher
function caesarCipher(input, shift) {
  return input.split('').map(function(char) {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) { // A-Z
      return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    } else if (code >= 97 && code <= 122) { // a-z
      return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    }
    return char; // Return the character as is if it's not a letter
  }).join('');
}

// Add event listeners to buttons
document.getElementById('encode').addEventListener('click', function() {
  const input = document.getElementById('input').value;
  const selectedType = document.getElementById('encryption-type').value;
  let output = '';

  switch (selectedType) {
    case 'Base64':
      output = encodeBase64(input);
      break;
    case 'ROT13':
      output = rot13(input);
      break;
    case 'Caesar':
      const shift = 3; // You can change the shift value if needed
      output = caesarCipher(input, shift);
      break;
  }

  document.getElementById('output').value = output;
});

document.getElementById('decode').addEventListener('click', function() {
  const input = document.getElementById('input').value;
  const selectedType = document.getElementById('encryption-type').value;
  let output = '';

  switch (selectedType) {
    case 'Base64':
      output = decodeBase64(input);
      break;
    case 'ROT13':
      output = rot13(input); // ROT13 decode is the same as encode
      break;
    case 'Caesar':
      const shift = 3; // You can change the shift value if needed
      output = caesarCipher(input, -shift); // Shift in the opposite direction
      break;
  }

  document.getElementById('output').value = output;
});




