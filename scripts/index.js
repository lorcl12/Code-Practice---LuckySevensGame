/*
Coobvam Lor
1/25/2020
*/

const onPlayHandler = () => {
  // Validate Input
  const start = document.getElementById("startingBet");
  const startingBet = Number(start.value);
  const errorMessage = document.getElementById("errorMessage");errorMessage.parentElement.classList.add("hidden");
  let remainingFunds = startingBet;
  let rollCount = 0,
    rollCountAtMax = 0,
    max = startingBet;

    // startingBets (original number entered) will become the remainingFunds
    //if remainingFunds are less then or equal to zero then a message will appear 
  try {
    if (remainingFunds <= 0) {
      remainingFunds.value = "";
      throw "Please use a number greater then 0.";
    }

    if (remainingFunds === "") {
      throw "Please enter the amount you would like to bet";
    }

    // if there is enough remainingFunds (originally startingBet) then it proceeds to this
    while (remainingFunds > 0) { //while remainingFunds are greater then 0, two dices will roll
      const roll1 = rollDice(); //dice 1 roll
      const roll2 = rollDice(); //dice 2 roll 
      rollCount++;
      if (roll1 + roll2 === 7) { 
        remainingFunds = remainingFunds + 4; //if it rolls a 7 it will add 4 to remainingFund
      } else {
        remainingFunds--; //or if it rolls less then a 7 then it will subtract 1 from remainingFund
      }

      if (remainingFunds > max) { //if remaining funds are greater then max (or startingBet) 
        max = remainingFunds; //then the max(startingBet) will become higher new remainingFunds
        rollCountAtMax = rollCount;
      }
    }

    // Display the Results on the hidden chart
    const results = document.getElementById("results");
    document.getElementById("table-startingBet").innerHTML = "$" +
      startingBet + ".00";
    document.getElementById("table-totalRolls").innerHTML = rollCount;
    document.getElementById("table-highestAmount").innerHTML = "$" + max + ".00";
    document.getElementById("table-rollCountAtMax").innerHTML = rollCountAtMax;
    document.getElementById("play-button").innerHTML = "Play Again?";

    results.classList.remove("hidden");
  } catch (err) {
    // Figure out how to display the error message
    console.log("Error: ", err);
    start.value = "";
    errorMessage.innerHTML = err;
    errorMessage.parentElement.classList.remove("hidden");
  }
};

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};
