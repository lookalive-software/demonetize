let defaults = {
  "exp1": true,
  "exp2": true,
  "exp3": true, 
  "exp4": true,
  "nocap": true,
  "nofinance": false
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaults)
})
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   // if(request.includes("getDefaults"))
//   sendResponse(Object.keys(defaults))
// })
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

//   chrome.storage.sync.get(Object.keys(defaults), storage => {
//     PushState()
//     // sendResponse(storage)
//   })
//   return true
//   // console.error("MESSAGE", message)
//   // switch(message){
//   //   case 'getState':
//   //     PushState()
//   // }
// })

// function PushState(){
//     chrome.storage.sync.get(Object.keys(defaults), storage => {
//       Object.entries(storage).map(([key, val]) => {
//         sendMessage({[key]: val})
//         // update the checked state of the form...
//         document.getElementById(key).checked = val
//       })
//       // changeColor.style.backgroundColor = color;
//     })
// }

// function sendMessage(message){
//   chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
//       console.log(message)
//       chrome.tabs.sendMessage(tabs[0].id, message)
//   })
// }
  

// RewriteProfilePrice



// activate on /u/ but not when url.parts.includes('buy')
// 

/*
urlmatches bitclout.com?
chrome.webNavigation.onCompleted.addListener(function() {
    alert("This is my favorite website!");
}, {url: [{urlMatches : 'https://www.google.com/'}]});
*/ 