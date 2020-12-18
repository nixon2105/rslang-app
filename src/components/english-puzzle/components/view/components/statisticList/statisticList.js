import { CLASS_NAMES } from '../../../../common/english-puzzle.constants';
import StatisticCard from '../statisticCard/statisticCard';
import LongStatisticCard from '../longStatisticCard/longStatisticCard';

export default class StatisticList {
  constructor(
    container,
    lastGameRoundData,
    listenersList,
    iDontKnowList,
    lastGameFinalTime,
    pictureData,
    results,
    additionalClass = null,
  ) {
    this.container = container;
    this.lastGameRoundData = lastGameRoundData;
    this.listenersList = listenersList;
    this.iDontKnowList = iDontKnowList;
    this.lastGameFinalTime = lastGameFinalTime;
    this.additionalClass = additionalClass;
    this.pictureData = pictureData;
    this.results = results;

    this.pictureContainer = null;

    this.correctContainer = null;
    this.errorsContainer = null;
    this.correctList = null;
    this.errorsList = null;

    this.longStatisticsContainer = null;
    this.longStatisticList = null;

    this.init();
  }

  addHandlers() {
    this.listenersList.forEach((listener) => {
      this.container.addEventListener(listener.event, listener.handler);
    });
  }

  removeHandlers() {
    this.listenersList.forEach((listener) => {
      this.container.removeEventListener(listener.event, listener.handler);
    });
  }

  render() {
    this.pictureContainer.insertAdjacentHTML(
      'afterbegin',
      `
      <p class="picture__description">Author: ${this.pictureData.author.replace(',', ' ')}, Name: ${
  this.pictureData.name
} (Date: ${this.pictureData.year})</p>
      <a class="picture__link" target="_blank" href="${this.pictureData.preloadedPicture.src}">
        <img class="statistic__picture" src="${this.pictureData.preloadedPicture.src}" alt="Round picture">
      </a>
    `,
    );
    this.statisticsContainer.prepend(this.pictureContainer);

    this.lastGameRoundData.forEach((wordData) => {
      let card;
      if (this.iDontKnowList.includes(wordData)) {
        card = new StatisticCard(this.errorsList, wordData);
      } else {
        card = new StatisticCard(this.correctList, wordData);
      }
      card.render();
    });

    this.correctContainer.append(this.correctList);
    const correctCount = this.statisticsContainer.querySelector(`.${CLASS_NAMES.STATISTIC.CORRECT.COUNT}`);
    correctCount.innerText = this.correctList.childElementCount;

    this.errorsContainer.append(this.errorsList);
    const errorsCount = this.statisticsContainer.querySelector(`.${CLASS_NAMES.STATISTIC.ERRORS.COUNT}`);
    errorsCount.innerText = this.errorsList.childElementCount;

    this.statisticsContainer.append(this.correctContainer);
    this.statisticsContainer.append(this.errorsContainer);
    this.container.append(this.statisticsContainer);

    this.results.forEach((resultItem, index) => {
      const card = new LongStatisticCard(this.longStatisticList, index, resultItem);
      card.render();
    });

    this.longStatisticsContainer.append(this.longStatisticList);
    this.container.append(this.longStatisticsContainer);
  }

  remove() {
    this.removeHandlers();
    this.container.innerHTML = '';
  }

  init() {
    this.statisticsContainer = document
      .querySelector(`.${CLASS_NAMES.STATISTIC.TEMPLATE}`)
      .content.cloneNode(true)
      .querySelector(`.${CLASS_NAMES.STATISTIC.CONTAINERS.CURRENT}`);
    if (this.additionalClass) this.statisticsContainer.classList.add(this.additionalClass);

    this.pictureContainer = document.createElement('div');
    this.pictureContainer.className = CLASS_NAMES.PICTURE_CONTAINER;

    this.statisticsContainer.querySelector(`.${CLASS_NAMES.STATISTIC.TIME}`).innerText = this.lastGameFinalTime;

    this.correctContainer = this.statisticsContainer.querySelector(`.${CLASS_NAMES.STATISTIC.CORRECT.CONTAINER}`);
    this.errorsContainer = this.statisticsContainer.querySelector(`.${CLASS_NAMES.STATISTIC.ERRORS.CONTAINER}`);

    this.correctList = document.createElement('ul');
    this.correctList.className = CLASS_NAMES.STATISTIC.CORRECT.LIST;

    this.errorsList = document.createElement('ul');
    this.errorsList.className = CLASS_NAMES.STATISTIC.ERRORS.LIST;

    this.longStatisticsContainer = document
      .querySelector(`.${CLASS_NAMES.STATISTIC.TEMPLATE}`)
      .content.cloneNode(true)
      .querySelector(`.${CLASS_NAMES.STATISTIC.CONTAINERS.LONG}`);
    this.longStatisticList = document.createElement('ul');
    this.longStatisticList.className = CLASS_NAMES.STATISTIC.LONG_STATISTIC.LIST;

    this.addHandlers();
  }
}
