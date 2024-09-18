const button = document.getElementById('impossibleBtn');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let clickAttempts = 0;
const maxAttempts = 200; // The max number of clicks to increase the chance

// Function to randomly determine if the button should stay still
const moveButton = () => {
  clickAttempts++;
  
  // Gradually increase the chance of clicking after many attempts
  const chance = Math.random(); // Generates a number between 0 and 1
  const ultraRareChance = 0.000000000000001; // Very low chance threshold initially

  // After the user reaches 100+ attempts, increase their chance of success
  const currentChance = clickAttempts >= 100 ? Math.random() / 2 : ultraRareChance;

  // If the current chance allows it, don't move the button, otherwise move it
  if (chance > currentChance) {
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
  }
};

// Trigger the moveButton function on mouse hover
button.onmouseover = function() {
  moveButton();
};

// On click, display the sassy message and show the restart button
button.onclick = function() {
  if (clickAttempts >= 100 && clickAttempts <= maxAttempts) {
    // Rare success after many attempts
    message.innerHTML = "<p>Wow, that took you long enough! Persistence pays off, huh?</p>";
  } else if (clickAttempts > maxAttempts) {
    // Ultra-rare success after max attempts
    message.innerHTML = "<p>Congratulations, you're the ultimate button-clicking champion!</p>";
  } else {
    // Regular rare success
    message.innerHTML = "<p>Oh, you finally did it, huh?</p>";
  }

  button.style.display = 'none';
  message.classList.remove('hidden');
  message.style.display = 'block'; // Make sure the message is visible
};

// Function to restart the game
restartBtn.onclick = function() {
  message.classList.add('hidden'); // Hide the message
  message.style.display = 'none'; // Ensure it's fully hidden
  button.style.display = 'block'; // Show the button again
  button.style.left = '50%';
  button.style.top = '50%';

  clickAttempts = 0; // Reset click attempts
};
