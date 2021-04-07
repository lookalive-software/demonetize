# Demonitize
## Customize your BitClout experience -- price display, comment filtering, etc

BitClout makes some dramatic design decisions about communicating the value of an individuals "creator coin" -- everywhere someone's name shows up, a price in USD sits right next to it. This number can act as a reputation signal -- is this account brand new, or do a lot of people trust them? But if seeing people's value down to the penny is a bridge too far, Demonitize enables some control over the price display.

You can hide prices everywhere if you want to use the site without thinking about the speculative nature of the market, or if you still want the reputation signal, prices can be replaced by emojis: bananas for example.

1 banana means the coin is priced less than $100
2 bananas means the coin is priced less than $1000
3 bananas means the coin is priced less than $10,000
4 bananas means the coin is priced at over $10,000

This price scale also applies to all comments and lists of profiles: they can be filtered according to that person's coin value. This should be especially helpful as the site becomes noisier: you are one click away from hiding all comments by new accounts.

Various other buttons and features can be toggled on and off. Also included is a primitive dark mode. Future versions will allow better color customization.


Hot fixes for bitclout.com bugs:
    Updates the Title Text so back button is more useful


OPTIONS:
    On Every Page:
        hide Hide Buy/Send/Wallet buttons on left sidebar
        hide Hide Your BitClout Balance / Price Ticker
        hide Top Weekly Leaderboard
        hide Blue Check icons
        hide All Prices (exludes Wallet page)
        choose price style: roman numerals, banana emojis, etc
        invert colors (lazy man's dark mode)
    On comments:
        hide comment / reclout / like / time numbers
    On Profile Pages:
        hide Market Cap details
        hide the Followers count
        hide the Buy / Sell buttons
    On comments and follower lists:
        Filter according to price magnitude (below 100, 1000, 10000$)

TODO:
    inject finance stats into wallet page
    Show Shareholder Count instead of Followers on profile pages
    replace leaderboard with a kind of "top 8 friends" speeddial
    somehow grab the first frame of GIF as a blob and throw a pause button on those to prevent auto-playing seizure-gifs. Looks like https://github.com/benwiley4000/gif-frames will allow this.
    Replace hidden comments with a toggle that lets you display collapsed comments


Bugs:
Right now in the profile's creator coins market values are truncated like 2K and as integers only display 2000 or MM -- would be good to use spot price to recalculate market values to more sig figs