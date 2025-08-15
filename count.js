let count = 0;
const counter = document.getElementById("counter");

const interval = setInterval(() => {
  if (count >= 100) {
    clearInterval(interval);
    // Redirect or fade out here
  } else {
    count++;
    counter.innerText = `${count} - 100`;
  }
}, 40);
