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
  const adjustedShift = (shift % 26 + 26) % 26; // Normalize the shift
  return input.split('').map(function(char) {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) { // A-Z
      return String.fromCharCode(((code - 65 + adjustedShift) % 26) + 65);
    } else if (code >= 97 && code <= 122) { // a-z
      return String.fromCharCode(((code - 97 + adjustedShift) % 26) + 97);
    }
    return char; // Return the character as is if it's not a letter
  }).join('');
}

// Add event listeners to buttons
document.getElementById('encode').addEventListener('click', function() {
  const input = document.getElementById('input').value.trim();
  const selectedType = document.getElementById('encoding-type').value;
  if (!input) {
    alert('Please enter a message to encode.');
    return;
  }
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
  const input = document.getElementById('input').value.trim();
  const selectedType = document.getElementById('encoding-type').value;
  if (!input) {
    alert('Please enter a message to decode.');
    return;
  }
  let output = '';

  switch (selectedType) {
    case 'Base64':
      try {
        output = decodeBase64(input);
      } catch (e) {
        alert('Invalid Base64 input!');
        return;
      }
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


























document.getElementById('copyButton').addEventListener('click', function () {
  const textarea = document.getElementById('output');
  const button = this; // Refers to the button itself
  const originalText = button.textContent;

  // Select the text
  textarea.select();
  textarea.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text
  navigator.clipboard.writeText(textarea.value)
      .then(() => {
          // Change button text to "Copied!"
          button.textContent = 'Copied!';
          // Reset button text after 2 seconds
          setTimeout(() => {
              button.textContent = originalText;
          }, 2000);
      })
      .catch(err => {
          console.error('Failed to copy text: ', err);
      });
});