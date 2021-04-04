// Initialize button with user's preferred color

// retrieve state from storage
// every time the popup is opened, retrieve
// just checkboxes

// this gets called whenever the popup opens, 
// function PushState(){

//     // changeColor.style.backgroundColor = color;
//   })
// }


let defaults = {
  "exp1": true,
  "exp2": true,
  "exp3": true, 
  "exp4": true,
  "nocap": true,
  "nofinance": false
}

// chrome.storage.sync.get(["default"], memory => {

// })
// every time popup is opened, update the form from sync
// maybe grab all keys and get those
// Array.from(
//   document.querySelectorAll('[type="checkbox"]'),
//   checkbox => 

// )

chrome.storage.sync.get(Object.keys(defaults), updateForm)

// Each option will basically need to interact in the same way
Array.from(
  document.querySelectorAll('[type="checkbox"]'),
  checkbox => 
    checkbox.addEventListener('change', event => 
      chrome.storage.sync.set({[event.target.id]: event.target.checked})
    )
)

function updateForm(newState){
  Object.entries(newState).map(([key, val]) => {
      if(/exp[1234]/.test(key)
      || /nofinance/.test(key) 
      || /nocap/.test(key)){
          document.getElementById(key).checked = val
      }
  })
}