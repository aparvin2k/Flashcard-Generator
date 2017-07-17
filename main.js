var Basic = require('./basicQuestion.js');
var Cloze = require('./clozeQuestion.js');
var clozeQ = require('./clozequestions.json');
var basicQ = require('./basicquestions.json');
var inquirer = require('inquirer');
var fs = require('fs');

// Variable that holds the cloze-deleted questions list
var closeQuestions = [];

// Populate the cloze-deleted questions list
for (var i = 0; i < clozeQ.length; i++) {
	var q = new Cloze(clozeQ[i].full, clozeQ[i].cloze);
	closeQuestions.push(q);
}

// Variable that holds the cloze-deleted questions list
var basicQuestions = [];

// Populate the cloze-deleted questions list
for (var i = 0; i < basicQ.length; i++) {
	var x = new Basic(basicQ[i].front, basicQ[i].back);
	basicQuestions.push(x);
}

// What question the user is currently on
var currentQuestion = 0;
// How many questions the user has gotten right
var answerRight = 0;

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "basicOrCloze",
      type: "list",
      message: "Would you like to see the Basic or Cloze Flashcards?",
      choices: ["Basic", "Cloze"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.basicOrCloze.toLowerCase() === "cloze") {
        clozeQuest();
      }
      else {
        basicQuest();
      }
    });
}

function basicQuest() {
		if (currentQuestion < basicQuestions.length) {
	inquirer.prompt([
		{
			type: 'input',
			message: basicQuestions[currentQuestion].front + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');

		// Check if the user has guessed correctly
		if (answers.userGuess.toLowerCase() === basicQuestions[currentQuestion].back.toLowerCase()) {
			console.log('Correct!');
			answerRight++;
		} else {
			console.log('Incorrect!');
		}

		// Show the correct answer
		console.log(basicQuestions[currentQuestion].back);
		console.log('-------------------------------------\n');

		// Advance to the next question
			currentQuestion++;
			basicQuest();
		});
		} else {
			console.log('Game Over!');
			console.log('Correct Answers: ' + answerRight);
			console.log('-------------------------------------\n');

			// Prompt the user to play again
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Would you like to play again?',
					name: 'playAgain'
				}
			]).then(function (answers) {
				if (answers.playAgain) {
					// Reset the game
					currentQuestion = 0;
					answerRight = 0;

					// Begin asking the questions!
					basicQuest();
				} else {
					// Exit the game
					console.log('Thanks for playing! Good Bye!');
				}
			});
		}
}

function clozeQuest() {
		if (currentQuestion < closeQuestions.length) {
	inquirer.prompt([
		{
			type: 'input',
			message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');

		// Check if the user has guessed correctly
		if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
			console.log('Correct!');
			answerRight++;
		} else {
			console.log('Incorrect!');
		}

		// Show the correct answer
		console.log(closeQuestions[currentQuestion].full);
		console.log('-------------------------------------\n');

		// Advance to the next question
			currentQuestion++;
			clozeQuest();
		});
		} else {
			console.log('Game Over!');
			console.log('Correct Answers: ' + answerRight);
			console.log('-------------------------------------\n');

			// Prompt the user to play again
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Would you like to play again?',
					name: 'playAgain'
				}
			]).then(function (answers) {
				if (answers.playAgain) {
					// Reset the game
					currentQuestion = 0;
					answerRight = 0;

					// Begin asking the questions!
					clozeQuest();
				} else {
					// Exit the game
					console.log('Thanks for playing! Good Bye!');
				}
			});
		}
}

// Begin asking the questions!
start();
