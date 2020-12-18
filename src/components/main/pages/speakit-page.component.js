import speakItApp from '../../speakit/speakit.app';

export const speakItPageComponent = {
  init: speakItApp,
  render: () => `
    <div class="speakit-body overflow-hidden">
      <div class="speakit-centralizer hidden">
        <div class="speakit-main">
          <nav class="navigation">
            <div class="navigation__box navigation__box_left">
              <span class="navigation__description level__description">Level:</span>
            </div>
            <button class="game__button game__button-user-words speakit-button">My words</button>
            <div class="navigation__box navigation__box_right">
              <span class="navigation__description round__description">Round:</span>
            </div>
          </nav>
          <div class="game__controls">
            <div class="buttons__wrapper">
              <div class="button__container">
                <button class="game__button game__button-new speakit-button">New game</button>
                <button class="game__button game__button-start speakit-button">Start game</button>
                <button class="game__button game__button-stop speakit-button">Stop game</button>
                <button class="game__button game__button-results speakit-button">Results</button>
              </div>
            </div>
            <p class="status-bar"></p>
          </div>

          <div class="main-card">
            <div class="main-card__description">
              <p class="main-card__translation"></p>
              <input class="main-card__speech-input" type="text" readonly>
            </div>
            <div class="picture__container">
              <div class="main-card__picture">
              </div>
            </div>
          </div>

          <div class="cards__container">
          </div>

          <div class="results__container">
            <div class="button__container-results">
              <button class="game__button game__button-results_return speakit-button">Return</button>
              <button class="game__button game__button-results_new speakit-button">New game</button>
              <button class="game__button game__button_results-statistic speakit-button">Statistic</button>
            </div>

            <div class="statistics__container">
              <div class="swiper-container">
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-wrapper wrapper">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="introduction">
        <div class="introduction__container">
          <div class="introduction__description-container">
            <h1 class="introduction__logo">Mini-game "SpeakIt"</h1>
            <button class="introduction__button speakit-button">start</button>
            <p class="introduction__description">Train words spelling, collect stars, select levels, rounds.</p>
            <p class="introduction__description">Current session game statistic slider/swiper</p>
          </div>
        </div>
      </div>

      <template class="statistic-template">
        <div class="slider__item swiper-slide">
          <p class="time"></p>
          <div class="results__correct">
            <p class="correct__title">
            <span class="correct__lead">Guessed:
                <span class="correct"></span>
            </span>
            </p>
          </div>
          <div class="results__errors">
            <p class="errors__title">
            <span class="errors__lead">Errors:
                <span class="errors"></span>
            </span>
            </p>
          </div>
        </div>
        <div class="long-statistic__container">
        </div>
      </template>
    </div>
  `,
};
