// Fetch JSON data and prepare the cards
let allCards = [];
let isFrontTextHidden = false; // Track the visibility state of front text

fetch('aircraft.json')
  .then((response) => response.json())
  .then((cards) => {
    allCards = cards; // Store the cards globally for later use
    renderAllCards(); // Default behavior: show all cards
  })
  .catch((error) => {
    console.error('Error loading cards:', error);
  });

// Select DOM elements
const cardContainer = document.getElementById('card-container');
const showAllButton = document.getElementById('show-all');
const showRandomButton = document.getElementById('show-random');
const hideFrontTextButton = document.getElementById('hide-front-text-btn');

// Event Listeners for buttons
showAllButton.addEventListener('click', renderAllCards);
showRandomButton.addEventListener('click', renderRandomCard);
hideFrontTextButton.addEventListener('click', toggleFrontTextVisibility);

// Function to render all cards
function renderAllCards() {
  cardContainer.innerHTML = ''; // Clear the container
  allCards.forEach((card) => {
    const cardElement = createCardElement(card);
    cardContainer.appendChild(cardElement);
  });
  applyFrontTextVisibility(); // Apply the front text visibility to all cards
}

// Function to render a single random card
function renderRandomCard() {
  cardContainer.innerHTML = ''; // Clear the container
  const randomIndex = Math.floor(Math.random() * allCards.length);
  const randomCard = allCards[randomIndex];
  const cardElement = createCardElement(randomCard);
  cardContainer.appendChild(cardElement);
  applyFrontTextVisibility();
}

// Function to create a card element
function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';

  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';

  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';

  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';

  // Add content to front (text + image)
  const frontImage = document.createElement('img');
  frontImage.src = 'aircractImages' +'/' + card.designator + '.jpg';
  //
  console.log(frontImage)
  frontImage.alt = card.title;
  

  const frontText = document.createElement('p');
  frontText.textContent = card.title;
  frontText.classList.add('front-text'); // Add class for easy toggling

  cardFront.appendChild(frontImage);
  cardFront.appendChild(frontText);

  // Add content to back (text only)
  const backText = document.createElement('p');
  backText.textContent = 'Manufacturer' + card.manufacturer;

  
  const backText3 = document.createElement('p');
  backText3.textContent = 'Name: ' + card.name;

  const backText4 = document.createElement('p');
  backText4.textContent = 'Designator : ' + card.designator;

  const backText2 = document.createElement('p');
  backText2.textContent = 'Recognition points: ' + card.recog;

  cardBack.appendChild(backText);
  cardBack.appendChild(backText3);
  cardBack.appendChild(backText4);
  cardBack.appendChild(backText2);

  // Assemble card
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardElement.appendChild(cardInner);

  // Add click event listener to toggle flip
  cardElement.addEventListener('click', () => {
    cardElement.classList.toggle('flipped');
  });

  return cardElement;
}

// Function to toggle visibility of front text
function toggleFrontTextVisibility() {
  isFrontTextHidden = !isFrontTextHidden; // Toggle the visibility state
  applyFrontTextVisibility(); // Apply the new visibility state to all cards
}


function applyFrontTextVisibility() {
  // Get all front text elements and apply the visibility state
  const frontTextElements = document.querySelectorAll('.front-text');
  frontTextElements.forEach((textElement) => {
    if (isFrontTextHidden) {
      textElement.classList.add('hidden'); // Hide the text
    } else {
      textElement.classList.remove('hidden'); // Show the text
    }
  });
}
