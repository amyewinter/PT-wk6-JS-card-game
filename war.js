/*
An automated version of the card game WAR - for two players
by Amy Winter, October 2, 2021

-	Deal 26 Cards to two Players from a Deck. 
-	Iterate through the turns where each Player plays a Card
-	The Player who played the higher card is awarded a point
  o	Ties result in zero points for either Player
-	After all cards have been played, display the score.

I've included comments below indicating my ideas for refactoring the code
when time permits

*/

//defining the Player class
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.score = 0;
  }

  // a method to output current score 
  //(try rewriting as a method of Game to output score of all players with a loop or forEach())
  showScore() {
    console.log(`${this.name}'s score is ${this.score}`);
  }
}

class Game {
  constructor() {
    this.deck = [];
    this.players = [];
  }

  playGame() {
    console.log("Game started!");
    this.createPlayer();
    this.createPlayer();

    //try rewriting using this.players.forEach() to log each player name
    //or add to createPlayer() -- "Player # is ______"
    console.log(
      `Players are ${this.players[0].name} and ${this.players[1].name}`
    );

    this.createDeck();

    this.shuffleDeck();

    this.dealHands();

    this.takeTurns();

    this.players[0].showScore();
    this.players[1].showScore();

    this.getWinner();
  }

  //a method to create players for the game

  createPlayer() {
    let name = prompt("Enter the player name:");
    this.players.push(new Player(name));
  }

  //a method to create a deck for the game

  createDeck() {
    let values = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];

    //I decided to add the suits even though it's not technically necessary for this game,
    //for the practice and the ability to provide a nicer log of what card was played
    //I also decided Ace is high
    let suits = ["Spades", "Diamonds", "Clubs", "Hearts"];

    console.log("Creating deck...");

    for (var i = 0; i < values.length; i++) {
      for (var x = 0; x < suits.length; x++) {
        var weight = parseInt(values[i]);
        if (
          values[i] == "Jack" ||
          values[i] == "Queen" ||
          values[i] == "King"
        ) {
          weight = 10;
        }
        if (values[i] == "Ace") {
          weight = 11;
        }
        var card = { Value: values[i], Suit: suits[x], Weight: weight };
        this.deck.push(card);
      }
    }
  }

  //this method does not change the position of the cards in the deck array, though I don't know why
  shuffleDeck() {
    console.log("Shuffling deck...");
    for (let y = this.deck.length - 1; y > 0; y--) {
      let z = Math.floor(Math.random() * y);
      let tmp = this.deck[y];
      this.deck[y] = this.deck[z];
      this.deck[z] = tmp;
    }
  }

  //a method to deal the deck into 2 hands
  //try declaring nextcard outside of conditional so it only executes once
  dealHands() {
    console.log("Dealing hands...");
    for (let a = this.deck.length - 1; a >= 0; a--) {
      if (a % 2 === 0) {
        let nextcard = this.deck[a];
        this.players[1].hand.push(nextcard);
      } else {
        let nextcard = this.deck[a];
        this.players[0].hand.push(nextcard);
      }
    }
  }

  //this method makes the players play a card each 26 times, logs what was played and who got a point
  takeTurns() {
    let turnCounter = 1;
    console.log("Cry 'Havoc!', and let slip the dogs of war!");

    //instead of setting turnCounter to a constant value, 
    //change it to check length of remaining hands and end the game if anyone's hand is less than 0
    while (turnCounter <= 26) {
      console.log(`Turn ${turnCounter}:`);

    //try rewriting the below to use forEach() on the players array to output a value for each player
    //for more flexibility in number of players  
      console.log(
        `${this.players[0].name} played ${this.players[0].hand[0].Value} of ${this.players[0].hand[0].Suit}`
      );
      console.log(
        `${this.players[1].name} played ${this.players[1].hand[0].Value} of ${this.players[1].hand[0].Suit}`
      );

      if (this.players[0].hand[0].Weight > this.players[1].hand[0].Weight) {
        console.log(`${this.players[0].name} gets 1 point.`);
        this.players[0].score++;
      } else if (
        this.players[1].hand[0].Weight > this.players[0].hand[0].Weight
      ) {
        console.log(`${this.players[1].name} gets 1 point.`);
        this.players[1].score++;
      } else {
        console.log("Cards are equal; no points awarded.");
      }
      //removing the first card in players' hands; this could also be done with forEach over the players array?
      this.players[0].hand.shift();
      this.players[1].hand.shift();
      turnCounter++;
    }
  }

  getWinner(){
    if (this.players[0].score > this.players[1].score){
      console.log(`${this.players[0].name} wins!`)
    } else if (this.players[1].score > this.players[0].score){
      console.log(`${this.players[1].name} wins!`)

    } else {
      console.log("Scores are equal; players tie.");
    }
  }
}

let game = new Game();
game.playGame();
