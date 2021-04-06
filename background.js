let defaults = {
  "exp1": true,
  "exp2": true,
  "exp3": true, 
  "exp4": true,
  "nocap": true,
  "nobalance": true,
  "noleaders": true,
  "noprice": false,
  "nofinance": false,
  "noblchk": false,
  "nobuy": false,
  "nofollow": false,
  "nometric": false,
  "mood": "dollar sign",
  // "rotate": 0,
  "invert": false,
  // "brightness": 1
}
// stuff an entire string of the names of all the keys so content and popup and grab the complete list of keys it needs to request
// in order to sync with storage 
defaults.keys = Object.keys(defaults).join(' ')

// The first time popup and content are run, they will have some defaults to sync with
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaults)
})
