/*
Future instagram link fixed, fetch any links and if they 404 set it to instagram.
*/

function mutateMedia(Username){

    let container = document.querySelector("div[ui-scroll]")

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
        // delete everything before images
        Array.from(container.querySelectorAll("[data-sid]"), div => div.remove())

        let {Posts} = json.ProfilesFound.pop()
        let media = Posts.filter(post => post.ImageURLs && post.ImageURLs.length)
        let urls = media.map(post => post.ImageURLs.pop())
        urls.forEach(
            url => container.insertAdjacentHTML("afterbegin", `<img src="${url}">`)
        )
        // insert an empty image
    })
    .catch(console.error)
}

/* - Public Domain software by Colten Jackson
 * - make a global method to prefer over 'fetch' api 
 * - pass an object to convert key:value pairs to a properly encoded querystring (k:v, hence, kvetch)
 * - use a Proxy with a getter so you can call 'kvetch.get()','kvetch.put()','kvetch.delete()' and so on with a single function
 * * */
(function(){
	let kv2query = kv => Object.keys(kv || {}).map(key => {
			var value = kv[key]
			return encodeURIComponent(key) + '=' + encodeURIComponent(value)
		}).join('&')

	let bodyBuilder = body => {
		let bodyType = body && body.constructor
		/* if bodyType if falsey, assign an empty object, no change */
		if(!bodyType) return {}
		/* if bodyType is formdata, hand the body back and let fetch assign content header automatically */
		else if(bodyType == FormData) return {body}
		/* otherwise, stringify objects and set content type to go with it */
		else return {
			body: bodyType == Object ? JSON.stringify(body) : body,
			headers: {
				'Content-Type': bodyType == ArrayBuffer ? 'application/octet-stream' :
								bodyType == Object ? 'application/json' : 'text/plain'
			}
		}
	}

	window.kvetch = new Proxy({}, {
		get: (target, name) => {
			return (url, queryObject = {}, optionalBody) => {
				/* can't do anything with an url */
				if(!url || url.constructor != String) throw new Error("first argument URL must be a string.")
				/* it's okay if queryObject is left blank, but if its truthy it better be an object */
				if(queryObject && queryObject.constructor != Object) throw new Error("second argument QueryObject must be an object or nothing at all.")
				/* optionalBody will have to switch between content types for string, object -> JSON, or raw byte array */

				options = Object.assign({
					method: name.toUpperCase(),
					credentials: 'include',
					redirect: 'error'
				}, bodyBuilder(optionalBody))

				return fetch(url + '?' + kv2query(queryObject), options).then(response => {
					// actually I'd prefer it if error codes got thrown to a catch block
					if(!response.ok) throw new Error(response); 
					else return response; 
				})
			}
		}
	})
})()
