/*
Unit test explanations:
https://www.sitepoint.com/unit-test-javascript-mocha-chai/
https://mochajs.org/

*/

var assert = chai.assert;

describe("Array", function (){
    it('should create player object', function() {
        class Player {
            constructor(name) {
              this.name = name;
              this.hand = [];
              this.score = 0;
            }
        
        createPlayer() {
            let name = prompt("Enter the player name:");
            this.players.push(new Player(name));
          }
        }
    });
});