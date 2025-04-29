const images = [
  "images/prize1.png",
  "images/prize2.png",
  "images/prize3.png"
];

document.getElementById('spin').addEventListener('click', () => {
  const wheel = document.getElementById('wheel');
  
  wheel.style.transform = "rotate(0deg)";
  
  let randomIndex = Math.floor(Math.random() * images.length);
  
  setTimeout(() => {
    wheel.src = images[randomIndex];
  }, 1000);
});
