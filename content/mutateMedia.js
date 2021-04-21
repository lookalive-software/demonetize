/*
Future instagram link fixed, fetch any links and if they 404 set it to instagram.
*/
let lastUsername = null
let mediaCache = []

function mutateMedia(Username){

    let container = document.querySelector("div[ui-scroll]")

	container.classList.add("gallery")
	// early return if mediaCache already exists
	if(Username == lastUsername && mediaCache.length){
		return mediaCache.forEach(image => {
			container.insertAdjacentElement('beforeEnd', image)
		})
	} else {
		lastUsername = Username
		mediaCache.length = 0 // clear mediaCache array
	}

	let spinner = renderSpinner()
	container.insertAdjacentElement("afterBegin", spinner)

    let {SenderPublicKeyBase58Check} = Object.entries(
        JSON.parse(localStorage.messageMetaKey)
        .decryptedMessgesMap
    ).pop().pop()

	
    kvetch.post(
        "https://api.bitclout.com/get-profiles",
        null,
        {
            ReaderPublicKeyBase58Check: SenderPublicKeyBase58Check,
            Username,
            OrderBy: "newest_last_post",
            AddGlobalFeedBool: false,
            NumToFetch: 1
        }
    )
    .then(res => res.json())
    .then(json => {
		// 
		lastUsername = Username
		spinner.remove()
		// get all the IMG urls -- implicitly skips reclouts / quotes
		// instead of filtering first, should grab the post ID, data-sid
		// could also sort by timestamp
		// for each post, put together {ImageUrls, TimestampNanos, data-sid}
		// for each image, attach a bespoke callback enclosing the body / timestamp / etc
		// it's either that or store the body text on the dom

		json.ProfilesFound.pop()
			.Posts
			.filter(
				post => post.ImageURLs && post.ImageURLs.length
			).map(post => ({
				url: post.ImageURLs.pop(),
				timestamp: parseInt(post.TimestampNanos / Math.pow(10,6)),
				caption: post.Body
			})).forEach(post => {
				let image = document.createElement('img')
				image.src = post.url
				image.loading = 'lazy'
				image.addEventListener('load', function(){
					image.setAttribute('loading', "complete")
				})
				image.addEventListener('click', function(){
					 renderModal(post)
				})
				mediaCache.push(image)
				container.insertAdjacentElement('beforeEnd', image)
			})
		
        // insert an empty image
    })
    .catch(console.error)
}

function renderMediaTab(){
	let mediaTab = document.createElement('div')
	mediaTab.className = "d-flex flex-column align-items-center h-100 pl-15px pr-15px"
	mediaTab.innerHTML = `
		<div class="d-flex h-100 align-items-center fs-15px fc-muted">
			Media
		</div>
		<div style="width: 50px;" class="tab-underline-inactive">
		</div>
	`
	mediaTab.addEventListener('click', function(){
		let coinTab = mediaTab.previousElementSibling
		let postTab = coinTab.previousElementSibling
		// unfortunately this works best if I start from the postTab
		// coinTab also has a div[ui-scroll] but in a different place
		postTab.click()
		history.pushState({},'',location.href.replace(/creator-coin$|posts$/, "media"))
		// history.push
		// trigger media tab
		// 'de-activate' other tabs
		coinTab.addEventListener("click", function(){
			activeTab(mediaTab, false)
		}, {once: true})
		postTab.addEventListener("click", function(){
			activeTab(mediaTab, false)
			activeTab(postTab, true)
			document.querySelector("div[ui-scroll]").classList.remove("gallery")
			document.querySelectorAll("div[ui-scroll] > img").forEach(img => img.remove())
		},{once: true})
		activeTab(coinTab, false)
		activeTab(postTab, false)
		activeTab(mediaTab, true)
		// let GUI update first
		setTimeout(()=>{
			mutateMedia(location.pathname.split('/').pop()) // get username from location
		})
	})
	setTimeout(()=>{
		location.search == "?tab=media" && mediaTab.click()
	})
	
	return mediaTab
	// might check if location.search == ?tab=media, then click yourself
}


function activeTab(node, active){
	node.firstElementChild.classList[active ? "add" : "remove"]('fc-default')
	node.firstElementChild.classList[active ? "remove" : "add"]('fc-muted')
	node.lastElementChild.classList[active ? "add" : "remove"]('tab-underline-active')
	node.lastElementChild.classList[active ? "remove" : "add"]('tab-underline-inactive')
}

function renderSpinner(){
	let spinner = document.createElement('simple-center-loader')
	spinner.innerHTML = `
		<div class="d-flex flex-column align-items-center justify-content-center"
			style="height: 400px;">
			<div class="gray lds-default">
			 	<div></div>
			 	<div></div>
			 	<div></div>
			 	<div></div>
			 	<div></div>
			 	<div></div>
			 	<div></div>
			 	<div></div>
			 	<div></div>
			 	<div></div>
			 	<div></div>
			 	<div></div>
			</div>
			<div class="text-gray text-center">
				<div class="fc-muted fs-24px">Loading...</div>
			</div>
		</div>
	</simple-center-loader>
	`
	return spinner
}
/*
Add the modal to the screen,
add an event listener to the backdrop
add a timeout to bs-modal-backdrop, modal-container +show to fade in after 150ms
on click to the backdrop, -show, after 150ms remove
*/
function renderModal({url, timestamp, caption}){
	document.body.insertAdjacentHTML('beforeEnd',`
		<bs-modal-backdrop class="modal-backdrop fade in">
		</bs-modal-backdrop>
		<modal-container
			role="dialog"
			tabindex="-1"
			class="modal fade"
			style="display: block;"
			aria-modal="true">
			<div role="document" class="modal-dialog modal-dialog-centered">
				 <div class="modal-content">
				 	<feed-post-image-modal>
					 	<div class="px-15px py-15px">
						 	<figure>
								<img class="br-3px"
									style="max-height: 100%; max-width: 100%;"
									src="${url}">
								<figcaption>${caption}</figcaption>
							</figure>
						</div>
					</feed-post-image-modal>
				</div>
			</div>
		</modal-container>
	`)
	setTimeout(()=>{
		let backdrop = document.querySelector('bs-modal-backdrop')
		let container = document.querySelector('modal-container')
		let dialog = container.querySelector('.modal-dialog')
		
		backdrop.classList.add('show')
		container.classList.add('show')

		dialog.addEventListener('click', function(){
			backdrop.classList.remove('show')
			container.classList.remove('show')
			setTimeout(function(){
				backdrop.remove()
				container.remove()
			}, 150)
		}, {once: true})
	})
	// add event listener to backdrop to remove 'show' and after 150ms delete the modal backdrop and container
}