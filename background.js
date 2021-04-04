let defaults = {
  "exp1": true,
  "exp2": true,
  "exp3": true, 
  "exp4": true,
  "nocap": true,
  "nofinance": false
}
// stuff an entire string of the names of all the keys so content and popup and grab the complete list of keys it needs to request
// in order to sync with storage 
defaults.keys = Object.keys(defaults).join(' ')

// The first time popup and content are run, they will have some defaults to sync with
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaults)
})


// activate on /u/ but not when url.parts.includes('buy')
// 

/*
urlmatches bitclout.com?
chrome.webNavigation.onCompleted.addListener(function() {
    alert("This is my favorite website!");
}, {url: [{urlMatches : 'https://www.google.com/'}]});
*/ 