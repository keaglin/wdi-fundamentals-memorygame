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

// lifted from my cookie_clicker app (originally got the prototype code from
// internet and changed it around to suit my purpose)
var hideButton = function () {
  var el = document.getElementsByClassName('canHide')[0]
  el.style.display = "none"
}

var showButton = function () {
  var el = document.getElementsByClassName('canHide')[0]
  el.style.display = "block"
}

var showHide = function () {
  if (flipCounter) {
    // debugger
    showButton() 
  } else {
    hideButton()
  }
}

// when I click reset, I want the score to go down to 0
var resetButton = document.getElementsByClassName('reset')[0]
resetButton.addEventListener('click', function() {
//   debugger
  resetBoard()
  showHide()
})

var resetBoard = function() {
  for (var i = 0; i < cards.length; i++) {
    var resetCard = document.querySelectorAll('img')[i]
    resetCard.setAttribute('src', 'images/back.png')
    resetCard.removeAttribute('class', 'selected')
  }
  cardsInPlay = []
  cardIdArr = []
  flipCounter = 0
}

var clearAfterMatch = function() {
  cardsInPlay = []
  cardIdArr = []
}

var checkForMatch = function() {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    console.log("You found a match!")
    window.alert('You found a match!')
    // how do we set a class for the 2 nodes that 
    // got matched? 
    // cards.forEach(function(el) {
    //   this.setAttribute('class', 'matched')
    // })
    // setAttribute('class', 'matched')
    // we want to clear cardsInPlay since you already matched 2 and we're gonna compare 2 more
    clearAfterMatch()
  } else {
    noMatch()
    // we actually want to just flip the card that doesn't match back not both so we don't want resetBoard, we want reset this one only functionality
  }
  // how many cards have been turned over? if it's 4 or more, we want to resetBoard
  // how do we know a card has been turned over?
  // if (flipCounter > 0) {
    // this is where we'd want to show a reset button instead of
    // auto-resetting the board. could probably apply for every
    // instance in which we reset the board
    // it cannot bc when we click the button, we wanna then resetBoard
    // showHide()
  // }
}
// if it's not a match, we wanna turn the second card back over
// and pop it from the arrays
var noMatch = function() {
  console.log('Sorry, try again.')
  window.alert('Sorry, try again')
  // how can I tell noMatch which card it is I want to flip back?
  // "this" is the window obj
  // cards.forEach(function(el) {
  //   if (el.getAttribute('class') !== 'matched') {
  //   }
  // })
  cardsInPlay.pop()
  cardIdArr.pop()
}

// we also need to make it so that after a card has been flipped,
// it can't be selected again

var checkForDupe = function(cardId) {
  if (cardIdArr[0] === cardIdArr[1]) {
    window.alert('Please select 2 different cards. Try again!')
    cardsInPlay.pop()
    cardIdArr.pop()
  }
}

var flipCard = function() {
  var cardId = this.getAttribute('data-id')
  this.setAttribute('class', 'selected')
  console.log("User flipped " + cards[cardId].rank)
  // console.log(cards[cardId].cardImage)
  // console.log(cards[cardId].suit)
  cardsInPlay.push(cards[cardId].rank)
  this.setAttribute('src', cards[cardId].cardImage)
  cardIdArr.push(cardId)
  // before counting, we wanna make sure the user hasn't clicked the same card twice
  checkForDupe(cardIdArr)
  flipCounter++
  showHide()
  // console.log(flipCounter)
  if (cardsInPlay.length > 1) {
    checkForMatch()
    // cardsInPlay = []
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