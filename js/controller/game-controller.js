import QuestionCard from "../view/question-card-view.js";

export default class GameController {
  #startButton;
  #container;
  gameQuestions;
  numberOfQuestions;
  currentQuestion = 0;
  numberOfCorrectAnswers = 0;
  isFinished = false;

  constructor(gameQuestions, startButton, container) {
    this.gameQuestions = gameQuestions;
    this.numberOfQuestions = gameQuestions.length;
    this.#startButton = startButton;
    this.#container = container;
  }

  init() {
    this.#startButton.addEventListener('click', this.reset);
  }

  getCardData () {
    return this.gameQuestions[this.currentQuestion];
  } 

  reset = () => {
    this.currentQuestion = 0;
    this.numberOfCorrectAnswers = 0;
    if (this.isFinished) {
      document.querySelector('.result-text').remove();
    }
    this.isFinished = false;
    this.startGame();
  }

  createQuestionCard = () => {
    return new QuestionCard(this.getCardData(), this.numberOfQuestions, this.handleAnswer).element;
  }

  startGame = () => {
    if (this.isFinished) {
      this.reset();
    }
    this.#container.insertAdjacentElement('beforeend', this.createQuestionCard());
  }

  endGame = () => {
    this.#container.removeChild(document.querySelector('.quiz-card'));
    this.#container.insertAdjacentHTML(
      'beforeend',
      `<h3 class='result-text'>You have ${this.numberOfCorrectAnswers} of ${this.numberOfQuestions} correct answers</h3>`
    );
    this.isFinished = true;
  }

  nextCard = () => {
    this.#container.removeChild(document.querySelector('.quiz-card'));
    const nextCard = this.createQuestionCard();
    this.#container.insertAdjacentElement('beforeend', nextCard);
  }  

  handleAnswer = (correctAnswerId, evt) => {
    evt.preventDefault();
    const chosenAnswerId = evt.target.querySelector('[name="answer"]:checked').id;
    if (correctAnswerId === chosenAnswerId) {
      this.numberOfCorrectAnswers += 1;
    }
    this.currentQuestion +=1;
    if (this.currentQuestion < this.numberOfQuestions) {
      this.nextCard();
      return;
    }
    this.endGame();
  }
}