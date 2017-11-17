var cards = ["queen", "queen", "king", "king"]
var cardsInPlay = []
var cardOne = cards[0]
var cardTwo = cards[2]

cardsInPlay.push(cardOne)
console.log("User flipped " + cardsInPlay[0])

cardsInPlay.push(cardTwo)
console.log("User flipped " + cardsInPlay[1])

if (cardsInPlay.length === 2) {
  alert("you found a match!")
}