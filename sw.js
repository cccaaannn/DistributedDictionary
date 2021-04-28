// service worker for making the site installable

const cacheName = "DistributedDictionaryOfflineData";
const staticAssets = [
    // html
    "./", 

    // css
    "./src/css/general.css",
    "./src/css/navbar.css",
    "./src/css/forms.css",
    "./src/css/posts.css",
    "./src/css/about.css",
    "./src/css/toastMessages.css",

    // js files
    "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js", // web3 cdn
    "./src/js/DictionaryContract.js",
    "./src/js/UI.js",
    "./src/js/App.js",

    // images
    "./src/icons/icon-192x192.png",
    "./src/icons/icon-512x512.png",

    // other
    "./manifest.json"
]

self.addEventListener("install", event => {
    // waits until cache is completed and returns the cached assets
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(staticAssets)
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(async (cachedData) => {

            // try fetching new site data and if it is fetched with 200 cache it 
            const newFetched = await fetch(event.request);

            if(newFetched.status === 200){
                const cache = await caches.open(cacheName)
                await cache.put(event.request, newFetched.clone());
                return newFetched;
            }
            else{
                return cachedData;
            }

        })
    );
});


