var cards = [
  { rank: 'queen',
  suit: 'hearts',
  cardImage: 'images/queen-of-hearts.png'},
  { rank: 'queen',
    suit: 'diamonds',
    cardImage: 'images/queen-of-diamonds.png'},
  { rank: 'king',
  suit: 'hearts',
  cardImage: 'images/king-of-hearts.png'},
  { rank: 'king',
    suit: 'diamonds',
    cardImage: 'images/king-of-diamonds.png'}
]
var cardsInPlay = []
var flipCounter = 0
var cardIdArr = []

var resetBoard = function() {
  for (var i = 0; i < cards.length; i++) {
    var resetCard = document.querySelectorAll('img')[i]
    resetCard.setAttribute('src', 'images/back.png')
  }
  cardsInPlay = []
  flipCounter = 0
}

var checkForMatch = function() {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    console.log("You found a match!")
    alert('You found a match!')
  } else {
    console.log("Sorry, try again.")
    alert('Sorry, try again')
    resetBoard()
  }
  // how many cards have been turned over? if it's 4 or more, we want to resetBoard
  //how do we know a card has been turned over?
  if (flipCounter >= 4) {
    resetBoard()
  }
}

var checkForDupe = function(cardId) {
  if (cardIdArr[0] === cardIdArr[1]) {
    alert('Please select 2 different cards. Try again!')
    cardsInPlay.pop()
  }
}

var flipCard = function() {
  var cardId = this.getAttribute('data-id')
  console.log("User flipped " + cards[cardId].rank)
  console.log(cards[cardId].cardImage)
  console.log(cards[cardId].suit)
  cardsInPlay.push(cards[cardId].rank)
  this.setAttribute('src', cards[cardId].cardImage)
  cardIdArr.push(cardId)
  // before counting, we wanna make sure the user hasn't clicked the same card twice
  checkForDupe(cardIdArr)
  ++flipCounter
  console.log(flipCounter)
  if (cardsInPlay.length > 1) {
    checkForMatch()
    cardsInPlay = []
  }
}

var createBoard = function() {
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img')
    cardElement.setAttribute('src', 'images/back.png')
    cardElement.setAttribute('data-id', i)
    cardElement.addEventListener('click', flipCard)
    document.getElementById('game-board').appendChild(cardElement)
  }
}

createBoard()

// flipCard(0)
// flipCard(2)