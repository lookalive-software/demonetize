// Initialize button with user's preferred color

// retrieve state from storage
// every time the popup is opened, retrieve
// just checkboxes
chrome.storage.sync.get([
  "exp1",
  "exp2",
  "exp3",
  "exp4",
  "nofinance",
  "nocap"
], storage => {
  Object.entries(storage).map(([key, val]) => {
    sendMessage({[key]: val})
    // update the checked state of the form...
    document.getElementById(key).checked = val
  })
  // changeColor.style.backgroundColor = color;
});



// Each option will basically need to interact in the same way
let enable = document.getElementById('all')
Array.from(document.querySelectorAll('[type="checkbox"]'), checkbox => {
  checkbox.addEventListener('change', event => {
    var change = {[event.target.id]: event.target.checked}
    chrome.storage.sync.set(change)
    sendMessage(change)
  })
})


// might send message to all tabs

function sendMessage(message){
  chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
      console.log(message)
      chrome.tabs.sendMessage(tabs[0].id, message)
  })
}



/*
add an event listener for the checkboxes, to update the show/hide css on timelines

add an event listener for the dropdown, allowing the choice of $$$$, hearts, diamonds, romanize

*/