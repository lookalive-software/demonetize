/* 
Attach Listeners, for every checkbox, use the checked value to update the storage sync
ContentScript will react to the storage.sync wil
*/
Array.from(
  document.querySelectorAll('[type="checkbox"]'),
  checkbox => 
  checkbox.addEventListener('change',
    event => {
      setBoolean(document.body, event.target.id, event.target.checked)
      chrome.storage.sync.set({[event.target.id]: event.target.checked})
    }
  )
)

Array.from(
  document.querySelectorAll('select'),
  dropdown => 
  dropdown.addEventListener('change',
    event => {
      setBoolean(document.body, event.target.id, event.target.value)
      chrome.storage.sync.set({[event.target.id]: event.target.value})
    }
  )
)

function setBoolean(target, key, val){
  if(val){
      target.setAttribute(key, val)
  } else {
      target.removeAttribute(key)
  }
}

/**
 * When popup is opened, I have to ask for the keys and then make sure the form is up to date
 */

chrome.storage.sync.get(["keys"], ({keys}) => {
  chrome.storage.sync.get(keys.split(' '), memory => {
    Object.entries(memory).map(([key, val]) => {
      if(/exp[1234]/.test(key)){
        document.getElementById(key).checked = val
      } else if([
        'nocap',
        'nobalance',
        'noleaders',
        'noprice',
        'nofinance',
        'noblchk',
        'nobuy',
        'nofollow',
        'nometric'
      ].includes(key)){
        document.getElementById(key).checked = val
      } else if(key == "mood"){
        document.getElementById(key).value = val
      }
    })
  })
})