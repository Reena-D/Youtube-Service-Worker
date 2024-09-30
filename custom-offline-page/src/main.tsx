import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);



//Register service-worker file
if("serviceWorker" in navigator){        //if service worker is available in the navigator, then - on page load I need to register this service worker using navigator
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
    .then(() => {
      console.log("Service worker registered");
      })
      .catch((err) => {
        console.log("Service worker registration failed ",err);
      });
  });
}
