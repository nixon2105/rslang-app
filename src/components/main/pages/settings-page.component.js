import settingsPage from '../components/settingsPage/settingsPage';

export const settingsPageComponent = {
  init: settingsPage.init,
  render: () => `
  <div class="settings__page">
    <h2 class="dictionary__title">Settings</h2>
    <div class="save__settings linguist__button">save</div>
    <div class="settings">
      <div class="settings_raw">
        <p class="settings_description">Learn settings</p>
        <hr>
        <div class="raw__container">
          <div class="raw__container-descr">New words number per day<br>(min: 10, max: 50)</div>
          <div class="raw__container-input">
            <input type="number" class="input-words__day" min="10" max="50">
          </div>
        </div>
      </div>
      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Cards number per day<br>(min: 20, max: 100)</div>
          <div class="raw__container-input">
            <input type="number" class="input-cards__day" min="20" max="100">
          </div>
        </div>
      </div>
      <div class="settings_raw">
        <p class="settings_description">Hints settings</p>
        <hr>
        <div class="raw__container">
          <div class="raw__container-descr">Show transcription</div>
          <div class="raw__container-input">
          <div class="switch-btn" id="isTranscription"></div>
          </div>
        </div>
      </div>
      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Show translation</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isTranslation">
            </div>
          </div>
        </div>
      </div>
      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Show example sentence</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isExampleSentence"></div>
          </div>
        </div>
      </div>
      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Show meaning sentence</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isMeaningSentence"></div>
          </div>
        </div>
      </div>
      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Show picture</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isPicture"></div>
          </div>
        </div>
      </div>
      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Allow voice spelling</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isVoiceSpelling"></div>
          </div>
        </div>
      </div>
      <div class="settings_raw">
        <p class="settings_description">Buttons settings</p>
        <hr>
        <div class="raw__container">
          <div class="raw__container-descr">Add button "Show answer"</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isAnswerButton"></div>
          </div>
        </div>
      </div>
      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Add button "To difficulties"</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isMoveToDifficultiesButton"></div>
          </div>
        </div>
      </div>
      <div class="settings_raw">
        <div class="raw__container">
          <div class="raw__container-descr">Add button "Delete word"</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isDeleteButton"></div>
          </div>
        </div>
      </div>
      <div class="settings_raw no-border">
        <div class="raw__container">
          <div class="raw__container-descr">Show categories buttons</div>
          <div class="raw__container-input">
            <div class="switch-btn" id="isCategoriesButtons"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};
