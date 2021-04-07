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


Bugs:
Right now in the profile's creator coins market values are truncated like 2K and as integers only display 2000 or MM -- would be good to use spot price to recalculate market values to more sig figs

Oh, there's a strange behavoir when I apply the invert filter, the sidebars no longer are scrolled down to the global feed. Like a forced repaint affected the scroll position or something...