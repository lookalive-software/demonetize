/* 
Attach Listeners, for every checkbox, use the checked value to update the storage sync
ContentScript will react to the storage.sync wil
*/
Array.from(
  document.querySelectorAll('[type="checkbox"]'),
  checkbox => 
  checkbox.addEventListener('change',
    event => 
    chrome.storage.sync.set({[event.target.id]: event.target.checked})
  )
)

/**
 * When popup is opened, I have to ask for the keys and then make sure the form is up to date
 */

chrome.storage.sync.get(["keys"], ({keys}) => {
  chrome.storage.sync.get(keys.split(' '), memory => {
    Object.entries(memory).map(([key, val]) => {
      if(/exp[1234]/.test(key)
      || /nofinance/.test(key) 
      || /nocap/.test(key)){
        document.getElementById(key).checked = val
      }
    })
  })
})