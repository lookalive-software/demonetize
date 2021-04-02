/*
Stretch: Process one price at a time with a setImmediate to give the rest of the page the chance to do something in case I get stuck in an infinite loop or something.

First step, find all the prices in each post.
So on Browse, after the <tab selector> I have all the post children. I want to flatten all the nodes and find the first occrurance of ~$

might want to keep the price there, but hidden, so I can always look it up again... but no I'll set the attributes. exp=[1,2,3,4] and int=3245, if those attributes exist then I don't need to do the regex...
*/

// popup and contentScript will just have to keep a Map of options in sync: when a checkbox is clicked, a "NAME": true/null is set
// drop comments that don't match exponent


// symbol can be: exponential, romanize, extra life, 5 stars    
// sort comments by: market cap | most recent first | most recent last
chrome.runtime.onMessage.addListener(message => {
    console.error(message)
    // switch(message)
})
// UPDATE THE TITLE TEXT
function mutatePrice(priceHolder){
    let int = parseInt(priceHolder.innerText.replace(',','').match(/\d+/))
    let exp = parseInt(Math.max(1, Math.log10(int)))
    priceHolder.innerText = " ".padStart(exp + 1, "$") // replace according to current settings, maybe an emoji or whathaveyou
}

function mutateComment(node){
    mutatePrice(
        node.querySelector(".feed-post__coin-price-holder")
    )
}
// Profile : Posts | Creator Coin
// on mutation, I can set tab selector parent node last child as hidden until I click, count the number of shareholders, click back, and drop the hidden style
// maybe set an attribute on the parentNode, "INPROGRESS"=true, when the counting is done, delete the attribute.
// find posts / creator coin, click creator coin, count the list...
// [inprogress]:last-child {visibility: hidden} 
function mutateFollowers(node){
    // hide everything, count up creator coins...
}


function hideMarketCap(node){
    // maybe just add an attribute that hides based on CSS hidemarketcap = true false
    node.firstElementChild.lastElementChild.style.display = 'none'
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
    switch(route){
        case 'u':
            document.title = subroute + suffix
        break
        case 'posts':
            setTimeout(() => {
                document.title = document.querySelector('post-thread').firstElementChild.firstElementChild.innerText
            }, 100)
    }
}


// It seems on navigate I unload and reload a new app-root, so to catch this I need an observer on the body
// on page change, well see how it looks on change...
new MutationObserver((mutationsList, observer) => {
    // anytime a mutatution has occured, check the location.href and update the document.title
    updateTitleText()
    mutationsList.map(mutation => {
        console.log(mutation.addedNodes)
        // I'll need a function that responds to every mutation, and first checks location.href to filter down 
        // so I need to organize the options by sublocation, so I'm not checking for irrelevant nodes
        // arrange the object into buckets for relative pages, I'll build the form out of it: name + function.
        Array.from(mutation.addedNodes).map(node => {
            if(/js-feed-post/.test(node.className)){ mutateComment(node) }
            if(/modal-container/i.test(node.tagName)){ mutateComment(node)}
            // if U and not ?Buy
            if(/creator-profile-top-card/i.test(node.tagName)){ hideMarketCap(node), mutateProfilePrice(node)}
            if(/search-bar__results-dropdown/.test(node.parentNode.parentNode.className)){ mutateSearchDropdown(node)}
            if(node.href && node.href.includes(location.pathname)){ mutateFollowers(node) }
            // if INBOX
            // if(/^messages-thread.*ng-star-inserted/i.test(node.tagName)){ mutateInbox(node)}
        })
    })
}).observe(document.body, {
    childList: true,
    subtree: true
})

// how about on location 

// As elements are headed to the screen, they are filtered down to those of interest and processed right away
// Maybe as I add jobs to the schedule I can set an attribute of 'done' and hide everything with done=0 

// if it's easy enough to just recurse over a list and then in the base case, set 'active' to false,
// and then on the event of page mutations, I push new content to the array and I check if its active, if its not then I call kind of a new job-crawler, iterates over array of items to process.
// what was that rope data structure again?
// I contend that all social media has you addicted waiting to see if someone likes you or not. This is quantifying that attention and expectation into a concrete symbol. It may force people over the edge and you have to practice identifying with the collective and run your identity separtely. Psychologically harmful to some.

// Two disclaimers
// This while have harmful pscyhological effects on a lot of people 
// People are going to lose a lot of money if they're not careful
// That means, not keeping your private key written on a post it note, not trying to just remember it in your head,
// not leaving your computer unlocked - it's about 4 clicks to transfer your balance to an anonymous address.
// Watching out for obvious scams, impersonator accounts, prosperity gospel ministers, and catfish.
// Essentially as money is moved into this new economy, it moves from people who lose it easily to people who make positive returns.
// Be careful with biometrics, you just made your fingerprint worth your bank account.


// so this alerts me of the page changing... I don't yet know if new content exists at this point

// new MutationObserver((mutationsList, observer) => {
//     mutationsList.map(mutation => {
//         console.log("BODY", mutation.addedNodes)
//         console.log("BODY", mutation.removedNodes)
//     })
// }).observe(document.body.firstChild, {
//     childList: true
// })

// I guess the /u/ page is just one step removed from the /browse page with an extra wrapper under the nextElementSibling.firstChild.children something like that
// Array.from(
//     document.querySelector('tab-selector').nextElementSibling.children,
//     cloutpost => {
//         console.log(cloutpost)
//         // ... if cloutpost already has int and exp, then skip a branch and just make sure current settings are applied

//     }
// )

/*
Maybe load the CSS first so that the price isn't shown at all until I set the exponent and perform the string replacement

While we're at it, 
when I recognize there's a new Weekly Creators list, 

Weekly Creators becomes a Myspacesque "Top 8 Friends" list except to put someone on this list you have to put capital into them.
Yes when you're on someone's profile, it would be ideal if I could see the top coins that THEY own (not even the amount they own, but of course its one click away to see an IDs creator coins...)


Let's set an attribute for "exponent" so after I grab the integer,
*/