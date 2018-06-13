function init() {
  displayRecommendation();
  createToggleButton();
}

function createToggleButton() {
  chrome.storage.local.get({ show_recommendation: false }, function(data) {
    $(document).find('.ytp-right-controls').prepend(`
      <button class="ytp-button" title="SGW Youtube Recommendation Removal" style='padding:5px;padding-left:0;padding-top:0'>
        <img
          class='sgw-remove-recommendation'
          src='${chrome.extension.getURL(`images/sgw-50x50-${data.show_recommendation ? 'gray' : 'bw'}.png`)}'
          style='width:100%;height:100%'
        />
      </button>
    `);
    $(document).find('.sgw-remove-recommendation').click(function(e) {
      toggleRecommendation();
    });
  });
}

function displayRecommendation() {
  chrome.storage.local.get({ show_recommendation: false }, function(data) {
    $(document).find('.ytp-ce-element').css({ display: data.show_recommendation ? 'block' : 'none' });
    $(document).find('.sgw-remove-recommendation').attr('src', chrome.extension.getURL(`images/sgw-50x50-${data.show_recommendation ? 'gray' : 'bw'}.png`))
  });
}

function toggleRecommendation() {
  chrome.storage.local.get({ show_recommendation: false }, function(data) {
    chrome.storage.local.set({ show_recommendation: !data.show_recommendation });
    displayRecommendation();
  });
}

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.tab && (msg.tab == "change")) {
    setTimeout(function() {
      displayRecommendation();
    }, 1000);
  }
});

setTimeout(function() {
  init();
}, 1000); 
