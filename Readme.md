# Demonetize
## Choose how coin prices and metrics are displayed on BitClout

BitClout makes some dramatic design decisions about communicating the value of an individual’s "creator coin" -- everywhere someone's name shows up, a price in USD sits right next to it. This number can act as a reputation signal -- is this account brand new, or do a lot of people trust them? But if seeing people's value down to the penny is a bridge too far, Demonetize enables some control over the price display.

You can hide prices everywhere if you want to use the site without thinking about the speculative nature of the market, or if you still want the reputation signal, prices can be replaced by emojis: bananas for example.

1 banana means the coin is priced less than $100.

2 bananas mean the coin is priced less than $1000.

3 bananas mean the coin is priced less than $10,000.

4 bananas mean the coin is priced at over $10,000.

This price scale also applies to all comments and lists of profiles: they can be filtered according to that person's coin value. This should be especially helpful as the site becomes full of noise: you are one click away from hiding all comments by new accounts.

Various other buttons and features can be toggled on and off. Also included is a primitive dark mode. Future versions will allow better color customization.

OPTIONS:

	* On Every Page:
		* Hide Buy/Send/Wallet buttons on left sidebar.
		* Hide Your BitClout Balance / Price Ticker
		* Hide Top Weekly Leaderboard
		* Hide Blue Check icons
		* Hide All Prices (excludes Wallet page)
		* choose price style: roman numerals, banana emojis, etc.
		* invert colors (lazy man's dark mode)
	* On comments:
		* Hide comment / reclout / like / time numbers.
		* Force images to be shrunk to fit their container.
	* On Profile Pages:
		* Hide Market Cap details
		* Hide the Followers count
		* Hide the Buy / Sell buttons
		* Hide the Public Key button
	* On comments and follower lists:
		* Filter according to price magnitude (below 100, 1000, 10000$)

TODO:

	* inject finance stats into wallet page.
	* Show Shareholder Count instead of Followers on profile pages
	* replace leaderboard with a kind of "top 8 friends" speeddial.
	* somehow grab the first frame of GIF as a blob and throw a pause button on those to prevent auto-playing seizure-gifs. Looks like https://github.com/benwiley4000/gif-frames will allow this.
	* Replace hidden comments with a toggle that lets you display collapsed comments.

### Installation

Demonetize will be available in the Chrome Web Store pending review. If you would like to use Demonetize today, download and extract the files from the [latest release](https://github.com/lookalive-software/demonitize/releases/), then open [chrome://extensions/](chrome://extensions/) and click the slider in the upper right-hand corner enabling "Developer mode" -- then click "Load unpacked" and 

### Credit where credit is due

Demonetize has a predecessor and prior art in Ben Grosser's Demetricator. Ben recognized that putting the number of followers on every profile and the number of likes on every comment has a net-negative effect on people's psychology and created Demetricator extensions for Twitter, Facebook, and Instagram. Facebook and Instagram have since experimented with removing like-counts in their product, so I think it is safe to say Demetricator was a successful work of art. 

But now, BitClout takes this signal of comparison and puts it at the core of the platform, more like a social credit score than a mere follower count. In this way it is nightmarish, as well as explicitly predicted by "Black Mirror" S03E01. Nonetheless, it is an attractive technology to anyone trying to raise money and is the first social media to integrate microtransactions with negligible fees. I have enjoyed using the platform and appreciate the reputation signal of having many "shareholders" / clout-chasers, but I still find all the dollar signs a distasteful design choice so, being inspired by Ben Grosser's work, I built Demonetize to allow customization of the site's stylesheets.

### Privacy Policy

Demonetize does not collect any personal data, user activity, or statistics and makes no network requests to any party. Demonetize uses the Chrome WebExtensions Storage Sync API for storing user preferences and communicating preferences between the extension's popup menu and the extension's injected JavaScript.

### Security Disclaimer

While Demonetize never captures data from `BitClout.com`, and does not make any network requests, it is a security risk to allow any extension access to your web browsing. When logging into `BitClout.com` with your mnemonic seed phrase, you should disable any untrusted extension. Once you've logged in, the seed phrase cannot be recovered by injected JavaScript.

Demonetize is authored by Colten Jackson and is not in any way affiliated with `BitClout.com`
