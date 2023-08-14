import questions from "./const/questions.js";
import GameController from "./controller/game-controller.js";

const startButton = document.querySelector('.menu__start-button');
const gameContainer = document.querySelector('.game-container');

const newGame = new GameController(questions, startButton, gameContainer);
newGame.init();