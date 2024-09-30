const CACHE_NAME = 'offline-assets';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
    console.log("installing service worker");

   event.waitUntil(         //what it does - it tells the service worker file - hey dont mark the installation process as complete until i finish all my job
    caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([OFFLINE_URL]);
    }).then(() => {
        console.log("cache added");
    })
    .catch((err) => {
        console.log("error adding cache", err);
    })
   )
});

// self.addEventListener('register', (event) => {
//     console.log("registering service worker");
// });


// if something goes wrong in our fetch - we need to send the offline url, we should intercept fetch equest- but not all fetch request, 
// we are going to intercept only those fetch request which has type called-page load, becoz only on page load we want to check what went wrong not inbetween lifecycle
// then we fetch particular resource from our server worker file
// if something goes wrong i can handle this in cache block, in cache block we check if user is offline or online, if user is offline, we will send offline.html page back to our web page
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(fetch(event.request).catch(err =>{
            if(!navigator.online){ 
                return caches.open(CACHE_NAME).then((cache) =>{
                    return cache.match(OFFLINE_URL);
                });

            }else{
                throw err;
            }
        })
    );
}
});