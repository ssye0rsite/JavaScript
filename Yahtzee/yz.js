let diceObj = [
    {currentValue: 0, hold: false},
    {currentValue: 0, hold: false},
    {currentValue: 0, hold: false},
    {currentValue: 0, hold: false},
    {currentValue: 0, hold: false}
  ]
  
  // Score sheet
  let scoreSheet = [
    {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null
    },
    {
      threeOfAKind: null,
      fourOfAKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yahtzee: null,
      chance: null
    },
    {
      upperTotal: null,
      bonus: null,
      upperGrandTotal: null,
      lowerGrandTotal: null,
      gameGrandTotal: null
    }
  ]
  
  // Score sheet DOM elements
  let onesScoreDisp = document.getElementById('onesScoreDisp');
  let twosScoreDisp = document.getElementById('twosScoreDisp');
  let threesScoreDisp = document.getElementById('threesScoreDisp');
  let foursScoreDisp = document.getElementById('foursScoreDisp');
  let fivesScoreDisp = document.getElementById('fivesScoreDisp');
  let sixesScoreDisp = document.getElementById('sixesScoreDisp');
  let upperTotalDisp = document.getElementById('upperTotalDisp');
  let bonusDisp = document.getElementById('bonusDisp');

  let upperGrandTotalDisp = document.getElementById('upperGrandTotalDisp');
  let threeOfKindScoreDisp = document.getElementById('threeOfKindScoreDisp');
  let fourOfKindScoreDisp = document.getElementById('fourOfKindScoreDisp');
  let fullHouseScoreDisp = document.getElementById('fullHouseScoreDisp');
  let smallStraightScoreDisp = document.getElementById('smallStraightScoreDisp');
  let largeStraightScoreDisp = document.getElementById('largeStraightScoreDisp');
  let yahtzeeScoreDisp = document.getElementById('yahtzeeScoreDisp');
  let chanceScoreDisp = document.getElementById('chanceScoreDisp');
  let upperGrandTotalDisp2 = document.getElementById('upperGrandTotalDisp2');
  let lowerGrandTotalDisp = document.getElementById('lowerGrandTotalDisp');
  let gameGrandTotalDisp = document.getElementById('gameGrandTotalDisp');
  
  let scoreCell = document.getElementsByClassName('scoreCell');
  let totalCell = document.getElementsByClassName('totalCell');
  
  // Dice DOM elements
  let diceOneDisp = document.getElementById('diceOneDisp');
  let diceTwoDisp = document.getElementById('diceTwoDisp');
  let diceThreeDisp = document.getElementById('diceThreeDisp');
  let diceFourDisp = document.getElementById('diceFourDisp');
  let diceFiveDisp = document.getElementById('diceFiveDisp');
  let dice = document.getElementsByClassName('dice');
  let diceDisp = document.getElementsByClassName('diceDisp');
  
  // Button DOM elements
  let holdButtons = document.getElementsByClassName('holdButtons');
  let rollButton = document.getElementById('rollButton');
  
  // Message DOM element
  let message = document.getElementById('message');
  
  // Global variables
  let diceValueArray = [];
  let rollCount = 0;
  let scoreSubmitted = true;
  let gameFinished;
  
  function diceRoll() {
  // when roll button is clicked.
  
    rollCount++;
    scoreSubmitted = false;
    if (rollCount === 1) {
      rollingState();
    }
  
    // assigns random number each dice, If dice held, no new number
    // pushes dice values to array, sorts them num, use in calculating scores.
    if (rollCount <= 3) {
      diceValueArray = [];
      for (let i = 0; i < diceObj.length; i++) {
        if (diceObj[i].hold == false) {
          diceObj[i].currentValue = Math.floor(((Math.random() * 6) + 1));
        }
        diceValueArray.push(diceObj[i].currentValue);
        diceValueArray.sort((a, b) => a - b);
      }
  
      diceOneDisp.textContent = diceObj[0].currentValue;
      diceTwoDisp.textContent = diceObj[1].currentValue;
      diceThreeDisp.textContent = diceObj[2].currentValue;
      diceFourDisp.textContent = diceObj[3].currentValue;
      diceFiveDisp.textContent = diceObj[4].currentValue;
    } 
  
    // if max number of rolls is hit, hold button & roll buttons disabled
    if (rollCount === 3) {
      for (let i = 0; i < holdButtons.length; i++) {
        holdButtons[i].setAttribute("disabled", "");
      }
  
      rollButton.setAttribute("disabled", "");
  
      // If any dice are set to hold on the last roll, the hold class is removed and the hold property is reset.
      for (let i = 0; i < dice.length; i++) {
        dice[i].classList.remove('hold');
      }
  
      for (let i = 0; i <diceObj.length; i++) {
        diceObj[i].hold = false;
      }
    }
    messageDisplay()
  }
  
  function rollReset() {
  // every time a score is inputted to score sheet via the calculationEnd function. 
  // Resets roll count to zero, displays correct message
  
    rollCount = 0;
    if (scoreSheet[2].gameGrandTotal !== null) {
      message.textContent = "Game over! Your score is: " + scoreSheet[2].gameGrandTotal;
    } else {
      message.textContent = "CLICK ON ROLL";
    }
  }
  
  function preRollState() {
  // every time a score is inputted to the score sheet via the calculationEnd function.
  // Sets everything up for the user's next roll.
  
    // Disable the hold buttons.
    for (let i = 0; i < holdButtons.length; i++) {
      holdButtons[i].setAttribute("disabled", "");
    }
  
    // Enables the roll button if the game is still active.
    if (!gameFinished) {
      rollButton.removeAttribute("disabled", "");
    } else {
      rollButton.setAttribute("disabled", "");
    }
  
    // Remove's the hold class from any dice and resets the dice hold value.
    for (let i = 0; i < dice.length; i++) {
      dice[i].classList.remove('hold');
    }
    for (let i = 0; i <diceObj.length; i++) {
      diceObj[i].hold = false;
    }
  }
  
  function rollingState() {
  // on the first roll of a go via the diceRoll function.
  
    // Enables the hold buttons
    for (let i = 0; i < holdButtons.length; i++) {
      holdButtons[i].removeAttribute("disabled", "");
    }
  }
  
  function messageDisplay() {
  // 
    if (rollCount === 1) {
      message.textContent = "2 ROLLS REMAINING";
    } else if (rollCount === 2) {
      message.textContent = "1 ROLLS REMAINING";
    } else if (rollCount === 3) {
      message.textContent = "ENTER YOUR SCORE";
    }
  }
  
  function newGame() {
  // when the user clicks the New Game button.
  // Reset roll count, set scoreSubmitted to true to stop scores being entered before first roll.
  
    rollCount = 0;
    gameFinished = false;
    scoreSubmitted = true;
  
    // Reset the score cells on HTML score sheet.
    for (let i = 0; i < scoreCell.length; i++) {
      scoreCell[i].textContent = "-";
    }
  
    // Reset the total cells on the HTML score sheet.
    for (let i = 0; i < totalCell.length; i++) {
      totalCell[i].textContent = "";
    }
  
    // Reset the score sheet object.
    for (var i = 0; i < scoreSheet.length; i++) {
      for (var prop in scoreSheet[i]) {
        if (scoreSheet[i][prop] !== null) {
          scoreSheet[i][prop] = null;
        }
      }
    }
  
    // Reset the HTML dice to show 1's.
    for (let i = 0; i < diceDisp.length; i++) {
      diceDisp[i].textContent = "1";
    }
  
    message.textContent = "CLICK ON ROLL";
  
    preRollState();

    
  }
  
  //Toggles the hold functionality and applies a new style class if hold is true.
  function toggleHold(key, holdElementId) {
    let clickedElement = document.getElementById(holdElementId);
  
    diceObj[key].hold = !diceObj[key].hold;
    if (diceObj[key].hold === true) {
      clickedElement.classList.add('hold');
    } else {
      clickedElement.classList.remove('hold');
    }
  }
  
  // Calculates score updates scoreSheet object, HTML.
  function calculateUpper(argA, argB, argC) {
    if (!scoreSubmitted && argA === null) {
      argA = 0;
      diceObj.forEach(item => {
        if (item.currentValue === argB) {
          argA += argB;
        }
      });
    
      argC.textContent = argA;
      calculationEnd();
    }
  }
  

  
  function calculateThreeOfKind() {
    if (!scoreSubmitted && scoreSheet[1].threeOfAKind === null) {
      if (diceValueArray[0] === diceValueArray[1] && diceValueArray[1] === diceValueArray[2]) {
        for (let i = 0; i < diceObj.length; i++) {
          scoreSheet[1].threeOfAKind += diceObj[i].currentValue; 
        }
      } else if (diceValueArray[1] === diceValueArray[2] && diceValueArray[2] === diceValueArray[3]) {
        for (let i = 0; i < diceObj.length; i++) {
          scoreSheet[1].threeOfAKind += diceObj[i].currentValue; 
        }
      } else if (diceValueArray[2] === diceValueArray[3] && diceValueArray[3] === diceValueArray[4]) {
        for (let i = 0; i < diceObj.length; i++) {
          scoreSheet[1].threeOfAKind += diceObj[i].currentValue; 
        }
      } else {
          scoreSheet[1].threeOfAKind = 0;
        }
      threeOfKindScoreDisp.textContent = scoreSheet[1].threeOfAKind;
      calculationEnd();
    }
  }
  
  function calculateFourOfKind() {
    if (!scoreSubmitted && scoreSheet[1].fourOfAKind === null) {
      if (diceValueArray[1] === diceValueArray[2] && diceValueArray[2] === diceValueArray[3]) {
        if (diceValueArray[2] === diceValueArray[0] || diceValueArray[2] === diceValueArray[4]) {
          for (let i = 0; i < diceObj.length; i++) {
            scoreSheet[1].fourOfAKind += diceObj[i].currentValue;
          }
        } else {
          scoreSheet[1].fourOfAKind = 0;
        }
      } else {
        scoreSheet[1].fourOfAKind = 0;
      }
      fourOfKindScoreDisp.textContent = scoreSheet[1].fourOfAKind;
      calculationEnd();
    }
  }
  
  function calculateFullHouse() {
    let comboOne = false;
    let comboTwo = false;
    if (!scoreSubmitted && scoreSheet[1].fullHouse === null) {
      if (diceValueArray[0] === diceValueArray[1]) {
        if (diceValueArray[2] === diceValueArray[3] && diceValueArray[3] === diceValueArray[4]) {
          if (diceValueArray[1] !== diceValueArray[2]) {
            comboOne = true;
          }
        }
      }
      if (diceValueArray[0] === diceValueArray[1] && diceValueArray[1] === diceValueArray[2]) {
        if (diceValueArray[3] === diceValueArray[4]) {
          if (diceValueArray[2] !== diceValueArray[3]) {
            comboTwo = true;
          }
        }
      }
      if (comboOne || comboTwo) {
        scoreSheet[1].fullHouse = 25;
      } else {
        scoreSheet[1].fullHouse = 0;
      }
      fullHouseScoreDisp.textContent = scoreSheet[1].fullHouse;
      calculationEnd();
    }
  }
  
  function calculateSmallStraight() {
    let status = false;
    let possibleSmallStraights = [
    [1,1,2,3,4],
    [1,2,2,3,4],
    [1,2,3,3,4],
    [1,2,3,4,4],
    [1,2,3,4,5],
    [1,2,3,4,6],
    [2,2,3,4,5],
    [2,3,3,4,5],
    [2,3,4,4,5],
    [2,3,4,5,5],
    [1,3,4,5,6],
    [2,3,4,5,6],
    [3,3,4,5,6],
    [3,4,4,5,6],
    [3,4,5,5,6],
    [3,4,5,6,6]
    ];
    if (!scoreSubmitted && scoreSheet[1].smallStraight === null) {
      for (let i = 0; i < possibleSmallStraights.length; i++) {
        if (JSON.stringify(diceValueArray) === JSON.stringify(possibleSmallStraights[i])) {
          status = true;
        }
      }
      if (status === true) {
        scoreSheet[1].smallStraight = 30;
      } else {
        scoreSheet[1].smallStraight = 0;
      }
      smallStraightScoreDisp.textContent = scoreSheet[1].smallStraight;
      calculationEnd();
    }
  }
  
  function calculateLargeStraight() {
    let status = false;
    let possibleLargeStraights = [[1,2,3,4,5],[2,3,4,5,6]];
    if (!scoreSubmitted && scoreSheet[1].largeStraight === null) {
      possibleLargeStraights.forEach(item => {
        if (JSON.stringify(diceValueArray) === JSON.stringify(item)) {
          status = true;
        }
      });
      if (status === true) {
        scoreSheet[1].largeStraight = 40;
      } else {
        scoreSheet[1].largeStraight = 0;
      }
      largeStraightScoreDisp.textContent = scoreSheet[1].largeStraight;
      calculationEnd();
    }
  }
  
  function calculateYahtzee() {
    let status = true;
    if (!scoreSubmitted && scoreSheet[1].yahtzee === null) {
      for (let i = 1; i < diceValueArray.length; i++){
        if (diceValueArray[i - 1] !== diceValueArray[i]) {
          status = false;
          break
        }
      }
      if (status) {
        scoreSheet[1].yahtzee = 50;
      } else {
        scoreSheet[1].yahtzee = 0;
      }
      yahtzeeScoreDisp.textContent = scoreSheet[1].yahtzee;
      calculationEnd();
    }
  }
  
  function calculateChance() {
    if (!scoreSubmitted && scoreSheet[1].chance === null) {
      for (let i = 0; i < diceObj.length; i++) {
        scoreSheet[1].chance += diceObj[i].currentValue;
      }
      chanceScoreDisp.textContent = scoreSheet[1].chance;
      calculationEnd();
    }
  }
  
  function calculationEnd() {
    scoreSubmitted = true;
    totals();
    rollReset();
    preRollState();
  }
  
  function totals() {
    // Extract score sheet values into an array
    let upperScoreArray = Object.values(scoreSheet[0]);
    let lowerScoreArray = Object.values(scoreSheet[1]);
  
    // Check the above arrays for missing scores
    let isScoreMissingUpper = upperScoreArray.includes(null);
    let isScoreMissingLower = lowerScoreArray.includes(null);
    let reducer = (accumulator, current) => accumulator + current;
  
    // If all the upper section scores are in, calculate and display the totals
    if (!isScoreMissingUpper) {
      scoreSheet[0].upperTotal = upperScoreArray.reduce(reducer);
      if (scoreSheet[0].upperTotal > 63) {
        scoreSheet[0].bonus = 35;
      } else {
        scoreSheet[0].bonus = 0;
      }
      scoreSheet[0].upperGrandTotal = scoreSheet[0].upperTotal + scoreSheet[0].bonus;
      
      upperTotalDisp.textContent = scoreSheet[0].upperTotal;
      bonusDisp.textContent = scoreSheet[0].bonus;
      upperGrandTotalDisp.textContent = scoreSheet[0].upperGrandTotal;
      upperGrandTotalDisp2.textContent = scoreSheet[0].upperGrandTotal;
    }
  
    // If all the lower section scores are in, calculate & display the totals 
    if (!isScoreMissingLower) {
      scoreSheet[2].lowerGrandTotal = lowerScoreArray.reduce(reducer);
      lowerGrandTotalDisp.textContent = scoreSheet[2].lowerGrandTotal;
    }
  
    // If all of the scores are in, calculate  display the final score
    if (scoreSheet[2].upperGrandTotal !== null && scoreSheet[2].lowerGrandTotal !== null) {
      scoreSheet[2].gameGrandTotal = scoreSheet[2].upperGrandTotal + scoreSheet[2].lowerGrandTotal;
      gameGrandTotalDisp.textContent = scoreSheet[2].gameGrandTotal;
  
      gameFinished = true;
  
      messageDisplay();
    }
  }