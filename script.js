
const images = [
  { src: "images/rose.png", name: "Волшебная роза", chance: 0.5 },
  { src: "images/chocolate.png", name: "Клубника в шоколаде", chance: 0.3 },
  { src: "images/oscar.png", name: "Оскар", chance: 0.2 }
];

const slotLine = document.getElementById("slot-line");
const spinButton = document.getElementById("spin");
const result = document.getElementById("result");
const winSound = new Audio("win.mp3");

const imageWidth = 190;
const visibleCount = 7;

function getRandomImageByChance() {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < images.length; i++) {
    acc += images[i].chance;
    if (r <= acc) return { image: images[i], index: i };
  }
  return { image: images[images.length - 1], index: images.length - 1 };
}

function renderInitialImages() {
  slotLine.innerHTML = "";
  for (let i = 0; i < visibleCount; i++) {
    const img = document.createElement("img");
    img.src = images[i % images.length].src;
    img.alt = images[i % images.length].name;
    img.className = "slot-image";
    slotLine.appendChild(img);
  }
}

function spin() {
  spinButton.disabled = true;
  result.textContent = "";

  slotLine.style.transition = "none";
  slotLine.style.transform = "translateX(0)";
  void slotLine.offsetWidth;

  // Случайная длина прокрутки
  const loopCount = Math.floor(Math.random() * 18) + 40; // от 40 до 57 картинок
  const total = loopCount;
  slotLine.innerHTML = "";

  const generatedImages = [];
  for (let i = 0; i < total; i++) {
    const r = Math.random();
    let sum = 0;
    for (const img of images) {
      sum += img.chance;
      if (r <= sum) {
        generatedImages.push(img);
        break;
      }
    }
  }

  generatedImages.forEach(item => {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.name;
    img.className = "slot-image";
    slotLine.appendChild(img);
  });

  const winnerIndex = generatedImages.length - 1;
  const winnerImage = generatedImages[winnerIndex];
  const centerOffset = Math.floor((visibleCount / 2) * imageWidth);
  const extraShift = Math.floor(Math.random() * 40);
  const shift = (winnerIndex * imageWidth) - centerOffset + extraShift;

  requestAnimationFrame(() => {
    slotLine.style.transition = "transform 3s cubic-bezier(0.22, 0.61, 0.36, 1)";
    slotLine.style.transform = `translateX(-${shift}px)`;
  });

  setTimeout(() => {
    result.textContent = `Поздравляем, вы выиграли: ${winnerImage.name}!`;
    winSound.play();
    spinButton.disabled = false;
  }, 3200);
}

spinButton.addEventListener("click", spin);
window.addEventListener("load", renderInitialImages);
