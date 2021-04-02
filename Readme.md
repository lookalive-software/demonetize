
OPTIONS:
    hide creators__balance-box (true)
    hide profile_market_cap (true)
    hide social_counters


Each option just sends a true or false -- 

Every time there's a mutation, use the selector object to pull a list of enabled callbacks -- PROFILE::MarketCap False, split it up into a selector object 


{
    "profile":
    "browse":
    "posts":
    "inbox":
    "default":
}

So on every mutation, check what route you're on, 
    intersect two branches:
        the branch of functions to apply
        the branch of keys that turns them on and off

To start with, an array of checkboxes -- removeAttribute...
exp1
exp2
exp3
exp4



How does a dropdown work?
mood=hearts|stars|dollar signs|diamonds
For partial barchart of hearts and diamonds and stars, use Log10 as percentage witdth that's shown. 

Which options rewrite the page?
mood
show sharehodlers -- has to mark the page as active, then go count...



There will be CSS to only show feed posts when they have attributes matching the body

[exp1] [exp="1"] { display: initial }

each feed post is tagged with an attribute of what exponent the post is, allows easy css show and hide.


Anytime a new message comes in, the corresponding funcction is called to update its little corner of the markup (if we're even on that page -- just skip if location doesn't match)

So for "show market cap" I would just update an attribute on document.body
But for "price style" I would have to reload the page and start re-writing all the coinprice-holders with hearts and diamonds and whatnot. Maybe a "random" to mix them up.
