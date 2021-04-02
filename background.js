chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
      "exp1": true,
      "exp2": true,
      "exp3": true, 
      "exp4": true,
      "nocap": true,
      "nofinance": false
  })
});

// RewriteProfilePrice



// activate on /u/ but not when url.parts.includes('buy')
// 

/*
urlmatches bitclout.com?
chrome.webNavigation.onCompleted.addListener(function() {
    alert("This is my favorite website!");
}, {url: [{urlMatches : 'https://www.google.com/'}]});
*/ 