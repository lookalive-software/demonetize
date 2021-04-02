// Initialize button with user's preferred color

// retrieve state from storage
chrome.storage.sync.get("color", ({ color }) => {
  // changeColor.style.backgroundColor = color;
});

// Each option will basically need to interact in the same way
let enable = document.getElementById('all')

enable.addEventListener('change', event => {
  console.log(event.target.checked)
  // event.target.id
  sendMessage({enable: event.target.checked})
});

function sendMessage(message){
  chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, message)
  })
}



/*
add an event listener for the checkboxes, to update the show/hide css on timelines

add an event listener for the dropdown, allowing the choice of $$$$, hearts, diamonds, romanize

*/