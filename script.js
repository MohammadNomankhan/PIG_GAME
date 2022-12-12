'use strict';

// selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const totalScore0El = document.getElementById('score--0');
const totalScore1El = document.getElementById('score--1');

// in app variables
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let isPlaying = true;

// initials
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// switch players
function switchPlayer() {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer ? 0 : 1;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
}

// roll dice function
function rollDice() {
	if (isPlaying) {
		const randomDiceValue = Math.trunc(Math.random() * 6) + 1;
		diceEl.src = `./dice-${randomDiceValue}.png`;
		diceEl.classList.remove('hidden');
		if (randomDiceValue !== 1) {
			currentScore += randomDiceValue;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			switchPlayer();
		}
	}
}

// hold score functionality
function holdScore() {
	if (isPlaying) {
		// add cs to ts
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];
		// check if cs >= 100 else switch player
		if (scores[activePlayer] >= 10) {
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
			isPlaying = false;
			// A potential solution
			// btnRoll.disabled = true;
			// btnHold.disabled = true;
			diceEl.classList.add('hidden');
		} else {
			switchPlayer();
		}
	}
}

// new game
function newGame() {
	isPlaying = true;
	currentScore = 0;
	activePlayer = 0;
	scores = [0, 0];

	diceEl.classList.add('hidden');
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');

	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	// we need to explicitily clear
	// document
	// 	.querySelector(`.player--${activePlayer}`)
	// 	.classList.remove('player--winner');
}

// Event listeners
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', newGame);
