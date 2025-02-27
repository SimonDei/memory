// Sammle alle Karten vom Spielfeld in einer Liste namens "cards"
// document.querySelectorAll sucht nach allen HTML-Elementen, die die angegebene Klasse haben.
// Dies ist anders als querySelector, das nur das erste gefundene Element zurückgibt.
const cards = document.querySelectorAll('.card');
// Speichere das HTML Element für den Spielstand.
const playerScoreElement = document.querySelector('#player-score');
// Speichere das HTML Element für den Neustarten Button.
const restartButton = document.querySelector('#restart');

// Variable, die den aktuellen Spielstand enthält.
let playerScore = 0;
// Array-Variable, die die aktuell umgedrehten Karten enthält.
let flippedCards = [];
// Variable, die die Anzahl der umgedrehten Karten enthält.
// Man könnte auch "flippedCards.length" benutzen. 
let flippedCardCount = 0;

// Funktion, die den aktuellen Spielstand erhöht und den Text im HTML-Element aktualisiert.
function updatePlayerScore() {
  // Erhöhe den Spielstand um 1.
  playerScore++;
  // Aktualisiere den Text im "playerScoreElement" auf den aktuellen Spielstand.
  playerScoreElement.textContent = playerScore;
}

// Funktion, die eine Karte nach oben dreht.
// "cardElement" ist ein div HTML-Element mit der Klasse "card" und zwei img-Elementen "card-front" und "card-back".
function flipCardUp(cardElement) {
  // Speichere die Vorderseite (img-Element) der Karte in der "cardFront" Variable.
  const cardFront = cardElement.querySelector('.card-front');
  // Speichere die Rückseite (img-Element) der Karte in der "cardBack" Variable.
  const cardBack = cardElement.querySelector('.card-back');

  // Verstecke die Vorderseite und zeige die Rückseite.
  // .style ist eine JavaScript-Eigenschaft, die es ermöglicht, CSS-Stile eines Elements zu ändern.
  // display ist ein CSS-Eigenschaft, die bestimmt, ob und wie ein Element angezeigt wird.
  // "none" versteckt das Element komplett.
  // "block" zeigt das Element an.
  cardFront.style.display = 'none';
  cardBack.style.display = 'block';
  
  // Erhöhe die Anzahl der nach oben gedrehten Karten um 1.
  flippedCardCount++;
  // Füge die umgedrehte Karte zu unserem Array der umgedrehten Karten hinzu.
  // Die "push" Methode fügt ein neues Element ans Ende des Arrays hinzu.
  flippedCards.push(cardElement);
}

// Funktion, die eine Karte wieder nach unten dreht.
// "cardElement" ist ein div-Element mit der Klasse "card" und zwei img-Elementen "card-front" und "card-back".
function flipCardDown(cardElement) {
  // Speichere die Vorderseite (img-Element) der Karte in der "cardFront" Variable.
  const cardFront = cardElement.querySelector('.card-front');
  // Speichere die Rückseite (img-Element) der Karte in der "cardBack" Variable.
  const cardBack = cardElement.querySelector('.card-back');

  // Mache die Vorderseite sichtbar (display = "block") und die Rückseite unsichtbar (display = "none").
  cardFront.style.display = 'block';
  cardBack.style.display = 'none';
}

// Überprüft, ob zwei umgedrehte Karten ein Paar bilden.
function checkIfFlippedCardsEqual() {
  // Wir brauchen nur die letzten beiden Karten aus unserem Array.
  // Da wir wissen, dass genau zwei Karten umgedreht wurden,
  // können wir direkt die ersten beiden Elemente nehmen.
  const card1 = flippedCards[0]; // Die erste umgedrehte Karte.
  const card2 = flippedCards[1]; // Die zweite umgedrehte Karte.

  // Für jede Karte brauchen wir das Bild auf der Rückseite.
  // Wir nutzen querySelector, um das <img>-Tag mit der Klasse "card-back" zu finden.
  const card1Back = card1.querySelector('.card-back'); // Bild der ersten Karte.
  const card2Back = card2.querySelector('.card-back'); // Bild der zweiten Karte.

  // Jetzt vergleichen wir die Bildpfade (src) der Bilder.
  // Wenn die Pfade gleich sind, geben wir true zurück, ansonsten false.
  if (card1Back.src === card2Back.src) {
    return true;
  } else {
    return false;
  }
}

// Prüft, ob alle Karten im Spiel umgedreht wurden.
function checkIfAllCardsAreUp() {
  // Gehe systematisch jede einzelne Karte im Spiel durch.
  // "cards" ist unser Array, das alle Karten enthält.
  // Mit "for...of" können wir jede Karte nacheinander betrachten.
  for (const card of cards) {
    // Für jede Karte müssen wir prüfen, ob die Rückseite sichtbar ist.
    // Wir suchen nach dem <img>-Tag mit der Klasse "card-back".
    const cardBack = card.querySelector('.card-back');

    // Prüfe den aktuellen Zustand der Karte.
    // display === 'block' bedeutet, dass die Karte umgedreht wurde.
    // display !== 'block' bedeutet, dass die Karte noch verdeckt ist.
    if (cardBack.style.display !== 'block') {
      // Wenn auch nur eine Karte noch nicht umgedreht wurde,
      // können wir sofort false zurückgeben.
      return false;
    }
  }
  // Wenn wir hier angekommen sind, wurden alle Karten geprüft.
  // und keine war mehr verdeckt - das Spiel ist gewonnen!
  return true;
}

// Startet ein neues Spiel.
// Diese Funktion wird aufgerufen, wenn der Spieler den Neustart-Button klickt.
// Sie setzt alle Karten zurück und bereitet das Spiel neu auf.
function restartGame() {
  // Gehe jede einzelne Karte im Spiel durch.
  for (const card of cards) {
    // Finde die Vorder- und Rückseite jeder Karte.
    // querySelector sucht nach dem ersten Element mit der angegebenen Klasse.
    const cardFront = card.querySelector('.card-front');
    const cardBack = card.querySelector('.card-back');

    // Setze die "display"-Eigenschaften zurück.
    cardFront.style.display = 'block';
    cardBack.style.display = 'none';
  }

  // Setze den Spielstand zurück auf den Anfangszustand.
  playerScore = 0;

  // Verstecke den Neustart-Button.
  // Der Button wird erst wieder sichtbar, wenn ein Spiel gewonnen wurde.
  restartButton.style.display = 'none';
}

// Behandelt einen Klick auf eine Karte.
// Diese Funktion wird aufgerufen, wenn ein Spieler auf eine Karte klickt.
// Sie steuert den gesamten Karten-Umdreh-Prozess und die Spiellogik.
function handleCardClick() {
  // Speichere die geklickte Karte.
  // "this" bezieht sich hier auf das HTML-Element, das den Klick ausgelöst hat.
  // Dies funktioniert, weil wir diesen Event-Handler mit addEventListener zur Karte hinzugefügt haben.
  // Zum Beispiel: card.addEventListener('click', handleCardClick);
  // Dadurch weiß JavaScript automatisch, welches Karten-Element geklickt wurde.
  const clickedCard = this;
  
  // Drehe die geklickte Karte um.
  flipCardUp(clickedCard);

  // Prüfe, ob wir bereits zwei Karten umgedreht haben.
  if (flippedCardCount === 2) {
    // Ja, zwei Karten sind umgedreht - prüfe, ob sie beide gleich sind.
    const cardsAreEqual = checkIfFlippedCardsEqual();

    if (cardsAreEqual) {
      // Die Karten sind beide gleich:
      // - Setze den Zähler zurück.
      flippedCardCount = 0;
      flippedCards = [];
      
      // Erhöhe den Punktestand des Spielers.
      updatePlayerScore();
      
      // Prüfe, ob alle Karten umgedreht wurden.
      if (checkIfAllCardsAreUp()) {
        // Alle Karten wurden gefunden - das Spiel ist gewonnen!
        alert('Gewonnen!');
        restart.style.display = 'block';
      }
    } else {
      // Die Karten sind nicht gleich:
      // - Warte eine Sekunde (1000 Millisekunden)
      // setTimeout ist wie ein Timer, der einen bestimmten Code erst nach einer gewissen Zeit ausführt.
      // In unserem Fall warten wir 1000 Millisekunden (1 Sekunde)
      setTimeout(() => {
        // Diese Callback-Funktion wird erst nach der Wartezeit aufgerufen.

        // - Drehe beide Karten wieder um.
        flipCardDown(flippedCards[0]);
        flipCardDown(flippedCards[1]);
        
        // - Setze den Zähler und die Liste zurück.
        flippedCardCount = 0;
        flippedCards = [];
      }, 1000);
    }
  }
}

// Füge einen Event-Listener zu jeder Karte hinzu.
for (const card of cards) {
  // Wenn jemand auf eine Karte klickt, wird die handleCardClick-Funktion aufgerufen.
  // "handleCardClick" ist hier eine Callback-Funktion.
  // Callback-Funktionen werden erst später aufgerufen, wenn bestimmte Bedingungen erfüllt sind.
  // Außerdem sind Callback-Funktionen immer Argumente einer Methode oder Funktion.
  card.addEventListener('click', handleCardClick);
}

// Füge einen Event-Listener zum Neustart-Button hinzu.
// Wenn jemand auf den Button klickt, wird die restartGame-Funktion aufgerufen.
restartButton.addEventListener('click', restartGame);
