import mainController from '../controller/main.controller';

import { EMPTY } from '../../../../common/common.constants';
import { DEFAULT_SETTINGS } from '../../../../services/common/services.common.constants';
import { WORD_CATEGORY_TO_INDEX } from '../spacedRepetitions/common/constants';

import './scss/deletedWords.styles.scss';

import ERROR_AUDIO from './assets/audio/server-error.mp3';

class DeletedWords {
  constructor() {
    this.elements = EMPTY;
    this.userSettings = EMPTY;
    this.deletedWords = EMPTY;

    this.targetButton = EMPTY;
    this.audio = EMPTY;
    this.errorAudio = new Audio(ERROR_AUDIO);

    this.init = this.init.bind(this);
    this.returnToLearning = this.returnToLearning.bind(this);

    this.playSpelling = this.playSpelling.bind(this);
    this.startSpellingAnimation = this.startSpellingAnimation.bind(this);
    this.stopSpellingAnimation = this.stopSpellingAnimation.bind(this);
    this.onEndSpellingHandler = this.onEndSpellingHandler.bind(this);
    this.onErrorSpellingHandler = this.onErrorSpellingHandler.bind(this);
    this.onEndErrorSpellingHandler = this.onEndErrorSpellingHandler.bind(this);
  }

  playSpelling(event) {
    if (!event.target.classList.contains('deleted-words-card__spell-button')) return;

    if (this.audio && !this.audio.ended) {
      this.audio.pause();
      this.onEndSpellingHandler(this.audio);
    }
    this.targetButton = event.target;

    this.audio = new Audio(this.targetButton.dataset.src);
    this.audio.addEventListener('ended', this.onEndSpellingHandler);
    this.audio.addEventListener('error', this.onErrorSpellingHandler);
    this.startSpellingAnimation();
    this.audio.play();
  }

  returnToLearning(event) {
    if (!event.target.classList.contains('deleted-words-card__return-button')) return;

    const currentWord = this.deletedWords[event.target.dataset.index];

    currentWord.userWord.optional.isDeleted = false;
    currentWord.userWord.optional.toRepeat = true;
    currentWord.userWord.optional.repeatDate = Date.now();
    currentWord.userWord.optional.changed = true;

    mainController.updateUserWord(
      currentWord.id,
      currentWord.userWord.difficulty,
      currentWord.userWord.optional,
    );

    event.target.setAttribute('disabled', 'disabled');
    event.target.parentElement.querySelector('.deleted-words-status').innerText = 'returned to learning';
  }

  startSpellingAnimation() {
    this.targetButton.classList.add('deleted-words-animated');
  }

  stopSpellingAnimation() {
    this.targetButton.classList.remove('deleted-words-animated');
  }

  onEndSpellingHandler() {
    this.audio.removeEventListener('ended', this.onEndSpellingHandler);
    this.stopSpellingAnimation();
  }

  onErrorSpellingHandler() {
    this.audio.removeEventListener('error', this.onErrorSpellingHandler);
    this.errorAudio.addEventListener('ended', this.onEndErrorSpellingHandler);
    this.errorAudio.play();
    this.startSpellingAnimation();
  }

  onEndErrorSpellingHandler() {
    this.errorAudio.removeEventListener('ended', this.onEndErrorSpellingHandler);
    this.stopSpellingAnimation();
  }

  renderCards() {
    if (!this.deletedWords) return;

    this.deletedWords.forEach((wordData, wordIndex) => {
      this.elements.containers.cardsWrapper.insertAdjacentHTML('afterBegin', this.renderCard(wordData, wordIndex));
    });
  }

  renderCard(wordData, wordIndex) {
    const hideWordTranslationClass = (!this.userSettings.optional.isTranslation)
      ? 'display-none'
      : '';

    const hideMeaningClass = (!this.userSettings.optional.isMeaningSentence)
      ? 'display-none'
      : '';

    const hideExampleClass = (!this.userSettings.optional.isExampleSentence)
      ? 'display-none'
      : '';

    const hideTranscriptionClass = (!this.userSettings.optional.isTranscription)
      ? 'display-none'
      : '';

    const hidePictureClass = (!this.userSettings.optional.isPicture)
      ? 'display-none'
      : '';

    const stars = '&#9733;'.repeat(WORD_CATEGORY_TO_INDEX[wordData.userWord.difficulty])
      + '&#9734;'.repeat(6 - WORD_CATEGORY_TO_INDEX[wordData.userWord.difficulty]);
    const category = (wordData.userWord.difficulty === 'fetched')
      ? 'not learned'
      : wordData.userWord.difficulty;
    const deleteStatus = (wordData.userWord.optional.isDeleted) ? 'deleted' : 'returned to learning';

    return `
      <div class="deleted-words-card">
        <button class="deleted-words-card__button deleted-words-card__return-button" data-index="${wordIndex}">Return to learning</button>
        <p class="deleted-words-card__word deleted-words-card__description">
          <button class="deleted-words-card__button deleted-words-card__spell-button" data-src="${wordData.audio}"></button>
          <span>${wordData.word}</span>
        </p>
        <p class="deleted-words-card__transcription deleted-words-card__description ${hideTranscriptionClass}">${wordData.transcription}</p>
        <p class="deleted-words-card__word_translate deleted-words-card__description ${hideWordTranslationClass}">${wordData.wordTranslate}</p>
        <p class="deleted-words-card__example deleted-words-card__description ${hideExampleClass}">
          <button class="deleted-words-card__button deleted-words-card__spell-button ${hideExampleClass}" data-src="${wordData.audioExample}"></button>
          <span>${wordData.textExample}</span>
        </p>
        <p class="deleted-words-card__example_translate deleted-words-card__description ${hideExampleClass}">${wordData.textExampleTranslate}</p>
        <p class="deleted-words-card__meaning deleted-words-card__description ${hideMeaningClass}">
          <button class="deleted-words-card__button deleted-words-card__spell-button ${hideMeaningClass}" data-src="${wordData.audioMeaning}"></button>
          <span>${wordData.textMeaning}</span>
        </p>
        <p class="deleted-words-card__meaning_translate deleted-words-card__description ${hideMeaningClass}">${wordData.textMeaningTranslate}</p>
        <img class="deleted-words-card__image ${hidePictureClass}" src="${wordData.image}">
        <div class="deleted-words-repetitions__container deleted-words-card__description">
          <span>
            Category: ${category} <sup class="deleted-words-stars">${stars}</sup>
          </span>
          <span> &#8634; Repeat times: ${wordData.userWord.optional.repeatTimes}</span>
          <span> &#10003; Last repeat: ${wordData.userWord.optional.lastRepeat}</span>
          <span> &#10006; Delete status:
            <span class="deleted-words-status">${deleteStatus}</span>
          </span>
        </div>
        <hr>
      </div>
    `;
  }

  render() {
    return `
      <div class="deleted-words__wrapper">
        <h3 class="deleted-words__title dictionary__title">Deleted words</h2>
        <p class="deleted-words__count-title dictionary__title">
          Total: <span class="deleted-words__count"></span>
        </p>
        <div class="deleted-words__main">
          <div class="deleted-words-cards__wrapper">
          </div>
        </div>
      </div>
    `;
  }

  async init() {
    if (!mainController.userSettings) {
      this.userSettings = DEFAULT_SETTINGS;
    } else this.userSettings = mainController.userSettings;

    this.elements = {
      containers: {
        cardsWrapper: document.querySelector('.deleted-words-cards__wrapper'),
        main: document.querySelector('.deleted-words__main'),
      },
      deletedWordsCount: document.querySelector('.deleted-words__count'),
    };

    mainController.spinner.show();
    this.deletedWords = await mainController.getAllUserDeletedWords();
    mainController.spinner.hide();
    this.elements.deletedWordsCount.innerText = this.deletedWords
      ? this.deletedWords.length
      : 0;

    this.renderCards();
    this.elements.containers.cardsWrapper.addEventListener('click', this.playSpelling);
    this.elements.containers.cardsWrapper.addEventListener('click', this.returnToLearning);
  }
}

export default new DeletedWords();
