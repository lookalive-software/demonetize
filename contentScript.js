
chrome.storage.sync.get(["keys"], ({keys}) => {
    chrome.storage.sync.get(keys.split(' '), updateAttributes)
})

chrome.storage.onChanged.addListener((changes) => {
    Object.entries(changes).map(([key, values]) => {
        updateAttributes({[key]: values.newValue})
    })
})

/* right now I'm only ever updating an attribute on the body and letting CSS do the rest */
/* this is changes that occur via popup */
/* all other actions are triggered by mutation events */
function updateAttributes(newState){
    Object.entries(newState).map(([key, val]) => {
        switch(key){
            case 'mood':
                let currentMood = document.body.getAttribute('mood')
                if(currentMood && val != currentMood){ location.reload() }
            case 'nometrics':

            case 'nocap':
            case 'nobalance':
            case 'noleaders':
            case 'noprice':
            case 'noblchk': 
            default:
                setBoolean(document.body, key, val)
                // /exp[1234]/.test(key) && setBoolean(document.body, key, val)
        }
    })
}

function setBoolean(target, key, val){
    if(val){
        target.setAttribute(key, val)
    } else {
        target.removeAttribute(key)
    }
}

// on updateAttributes, if the attribute is mood, refresh the page...
// Later, I can pack all the different modes as psuedo elements and switch more seamlessly...
function MoneyInWhatMood(price, int, exp){
    let mood = document.body.getAttribute("mood")
    // concat is just doing an emoji compatible padStart (❤️.length == 2), padStart hated that
    // maybe if I import leftPad my issue can be solved...
    let concat = (string, times) => times == 1 ? string : string + concat(string, --times)

    const moods = {
        'red hearts': '❤️',
        'gold stars': '⭐',
        'diamondhands': '💎',
        'dollar sign': '$',
        'bananas': '🍌'
    }    
    switch(mood){
        case 'red hearts': 
        case 'dollar sign':
        case 'diamondhands':
        case 'gold stars':
        case 'bananas':
            // return " ".padStart(exp + 1, moods[mood])
            return concat(moods[mood], exp)
        case 'romanize':
            return romanize(int)
        case 'internetpts':
            return int
        default:
            return price
        // maybe case custom: grab the custom attribute off of body?
        // can 'content' of a psuedo element be var var var var ? to allow any emoji set as css variable?
    }
}

function concat(string, times){
    if(times == 1){
        return string
    } else {
        return string + concat(string, --times)
    }
}



function mutatePrice(priceHolder, target){
    let price = priceHolder.innerText
    console.log("PRICE", price)
    let int = parseInt(price.replace(',','').match(/\d+/))
    let exp = parseInt(Math.max(1, Math.log10(int)))
    priceHolder.innerText = " " + MoneyInWhatMood(price, int, exp) + " " // replace according to current settings, maybe an emoji or whathaveyou
    priceHolder.setAttribute("tag", "price")
    target && target.setAttribute("exp", exp)
}

function mutateComment(node){
    mutatePrice(
        node.querySelector(".feed-post__coin-price-holder"),
        node.parentElement.parentElement.parentElement
    )
    node.querySelectorAll("feed-post-icon-row i").forEach(icon => {
        /* replace all the text with tagged spans so I can hide them */
        let span = document.createElement('span')
        span.setAttribute("tag","metric")
        span.textContent = icon.parentElement.textContent.trim()
        icon.parentElement.replaceChild(span, icon.nextSibling)
    })
    // from this node, one node up should have its exp attribute set so it can be shown and hidden
}
// Profile : Posts | Creator Coin
// on mutation, I can set tab selector parent node last child as hidden until I click, count the number of shareholders, click back, and drop the hidden style
// maybe set an attribute on the parentNode, "INPROGRESS"=true, when the counting is done, delete the attribute.
// find posts / creator coin, click creator coin, count the list...
// [inprogress]:last-child {visibility: hidden} 
function mutateFollowers(node){
    // hide everything, count up creator coins...
}

function mutateProfilePrice(node){
    mutatePrice(
        node.firstElementChild.children[3].lastElementChild.lastElementChild.firstElementChild
    )
}
function mutateSearchDropdown(node){
    mutatePrice(
        node.lastElementChild
    )
}
function mutateInbox(node){
    // Array.from(node.children, child => 
}


function updateTitleText(){
    let suffix = " - BitClout"
    let [route, subroute] = location.pathname.split('/').slice(1)
    console.log([route, subroute])
    switch(route){
        case 'inbox':
            if(!subroute) document.querySelector("messages-thread").firstChild.click()
            else document.title =  "Inbox: " + subroute + suffix
        break
        case 'wallet':
            document.title = "Wallet" + suffix
        break
        case 'browse':
            let browsingContext = location.search.match(/feedTab=(\w+)/)
            document.title = browsingContext ? (browsingContext[1] + " Timeline" + suffix) : ("Home" + suffix)
        break
        case 'u':
            document.title = subroute + suffix
        break
        case 'posts':
            setTimeout(() => {
                document.title = document.querySelector('post-thread').firstElementChild.firstElementChild.innerText
            }, 100)
    }
}

function cacheWallet(){
    // if location is wallet, capture the row nodes and parse their values...
    // ...stash the profile pics in sync storage... 
    // replace Top Weakly Creators with Your Top Creators
    //  sync will have to be key value:
    // each key is a date, corresponding 
    // then a header row can be updated labeling each column
    // empty columns is OK ,,,, 
    // 
}

function tagFinanceButtons(node){
    Array.from(node.querySelectorAll('left-bar-button'), (element, index) => {
        if([1,2,3,4].includes(index)){
            element.setAttribute("tag","finance")
        }
    })
}


// It seems on navigate I unload and reload a new app-root, so to catch this I need an observer on the body
// on page change, well see how it looks on change...
let lastLocation = null

new MutationObserver((mutationsList, observer) => {
    // anytime a mutatution has occured, check the location.href and update the document.title
    if(location.href != lastLocation){
        lastLocation = location.href
        updateTitleText()
    }
    mutationsList.map(mutation => {
        console.log(mutation.addedNodes)
        // I'll need a function that responds to every mutation, and first checks location.href to filter down 
        // so I need to organize the options by sublocation, so I'm not checking for irrelevant nodes
        // arrange the object into buckets for relative pages, I'll build the form out of it: name + function.
        Array.from(mutation.addedNodes).map(node => {
            // switch based on location, use if else
            if(/js-feed-post/.test(node.className)){ mutateComment(node) }
            
            // if(/modal-container/i.test(node.tagName)){ mutateComment(node)}
            else if(node.classList && node.classList.contains("modal-backdrop")){ mutateComment(node.nextElementSibling)}
            else if(/creator-profile-top-card/i.test(node.tagName)){ mutateProfilePrice(node)}
            /* these are annoying, I was trying to nail down the case of switching between Global and Following, and changing screen width */
            else if(node.previousElementSibling && "TAB_SELECTOR" === node.previousElementSibling.tagName){
                Array.from(node.children, child => {
                    mutateComment(child.querySelector('.js-feed-post'))
                })
            }
            else if("TAB_SELECTOR" === node.tagName){
                Array.from(node.nextElementSibling.children, child => {
                    mutateComment(child.querySelector('.js-feed-post'))
                })
            }
            else if(node.parentElement && "RIGHT-BAR-CREATORS-LEADERBOARD" == node.parentElement.tagName){
                mutatePrice(node.lastChild)
            }
            // else if(node.href && node.href.includes(location.pathname)){ mutateFollowers(node) }
            // else if(/global__nav__inner/.test(node.className)){ tagFinanceButtons(node) }
            // inbox HREF coin price
            else if(node.href && /\/u\/.*\/buy$/.test(node.href)){
                // mutateInboxPrice()
            }
            else if(node.parentNode
                    && node.parentNode.parentNode 
                    && /search-bar__results-dropdown/.test(node.parentNode.parentNode.className))
                    { mutateSearchDropdown(node) }

            // if INBOX
            // if(/^messages-thread.*ng-star-inserted/i.test(node.tagName)){ mutateInbox(node)}
        })
    })
}).observe(document.body, {
    childList: true,
    subtree: true
})

// As elements are headed to the screen, they are filtered down to those of interest and processed right away
// Maybe as I add jobs to the schedule I can set an attribute of 'done' and hide everything with done=0 

// Two disclaimers
// This while have harmful pscyhological effects on a lot of people 
// People are going to lose a lot of money if they're not careful
// That means, not keeping your private key written on a post it note, not trying to just remember it in your head,
// not leaving your computer unlocked - it's about 4 clicks to transfer your balance to an anonymous address.
// Watching out for obvious scams, impersonator accounts, prosperity gospel ministers, and catfish.
// Essentially as money is moved into this new economy, it moves from people who lose it easily to people who make positive returns.
// Be careful with biometrics, you just made your fingerprint worth your bank account.


// so this alerts me of the page changing... I don't yet know if new content exists at this point

/*
Maybe load the CSS first so that the price isn't shown at all until I set the exponent and perform the string replacement

While we're at it, 
when I recognize there's a new Weekly Creators list, 

Weekly Creators becomes a Myspacesque "Top 8 Friends" list except to put someone on this list you have to put capital into them.
Yes when you're on someone's profile, it would be ideal if I could see the top coins that THEY own (not even the amount they own, but of course its one click away to see an IDs creator coins...)


Let's set an attribute for "exponent" so after I grab the integer,
*/
// Credit to Steven Levithan 
// https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
// http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
// function romanize (num) {
//     if (isNaN(num))
//         return NaN;
//     var digits = String(+num).split(""),
//         key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
//                "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
//                "","I","II","III","IV","V","VI","VII","VIII","IX"],
//         roman = "",
//         i = 3;
//     while (i--)
//         roman = (key[+digits.pop() + (i * 10)] || "") + roman;
//     return Array(+digits.join("") + 1).join("M") + roman;
// }

function romanize(num) {
    var lookup = {
        "ↈ": 100000,
        "ↇ": 50000,
        "ↂ": 10000,
        "ↁ": 5000,
        M:1000,
        CM:900,
        D:500,
        CD:
        400,
        C:100,
        XC:90,
        L:50,
        XL:40,
        X:10,
        IX:9,
        V:5,
        IV:4,
        I:1
    }
    var roman = ''
    for (var i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

// 5,000   ↁ  V̅
// 10,000  ↂ  X̅	
// 50,000  ↇ L̅
// 100,000 ↈ C̅