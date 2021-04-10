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
  "nokey": false,
  "nofollow": false,
  "nometric": false,
  "mood": "dollar sign",
  "invert": false,
  "imgfix": true
}
// stuff an entire string of the names of all the keys 
// so content and popup can grab the complete list of preferences
defaults.keys = Object.keys(defaults).join(' ')

// The first time popup and contentScript run, they will have some defaults to read
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaults)
})