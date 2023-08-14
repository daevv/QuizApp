import createElement from "../utils/create-element.js";

const createQuestionCard = (card, numberOfQuestions) => {
  const { question, answers, questionNumber } = card;
  return `
  <div class="quiz-card">

    <div class="quiz-card__header">
      <div class="quiz-card__number">
        <p class="current-number">${questionNumber} / ${numberOfQuestions}</p>
      </div>
      <h3 class="quiz-card__question">${question}</h3>
    </div>

    <form action="get" class="quiz-card__form">
      <fieldset class="quiz-card__answers">
        <label class="quiz-card__answer-label">
          <input class="quiz-card__answer" type="radio" name="answer" id="1">
          ${answers[0]}
        </label>
        <label class="quiz-card__answer-label">
          <input class="quiz-card__answer" type="radio" name="answer" id="2">
          ${answers[1]}
        </label>
        <label class="quiz-card__answer-label">
          <input class="quiz-card__answer" type="radio" name="answer" id="3">
          ${answers[2]}
        </label>
        <label class="quiz-card__answer-label">
          <input class="quiz-card__answer" type="radio" name="answer" id="4">
          ${answers[3]}
        </label>
      </fieldset>
      <button class="quiz-card__submit-button">Next question</button>
    </form>
  </div>`
};

export default class QuestionCard {
  #card;
  #correctAnswer;
  #numberOfQuestions;
  #element;

  constructor(card, numberOfQuestions, handleAnswer) {
    this.#card = card;
    this.#correctAnswer = card.correctAnswerId;
    this.#numberOfQuestions = numberOfQuestions;

    this.#element = createElement(this.template);
    this.#element.querySelector('.quiz-card__form').addEventListener('submit', (evt) => handleAnswer(this.#correctAnswer, evt));
  }

  get template() {
    return createQuestionCard(this.#card, this.#numberOfQuestions);
  }

  get element() {
    return this.#element;
  }

}