import { Workbox } from 'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-window.prod.mjs';

// const updateButton = document.querySelector("#btnAppUupdate");
if ('serviceWorker' in navigator) {
  const wb = new Workbox('service-worker.js');
  wb.register();

  wb.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      window.location.reload();
    }
  });

  self.addEventListener('beforeinstallprompt', function (e) {
    var deferredPrompt;
    e.preventDefault();
    deferredPrompt = e;
  });

  window.addEventListener('load', () => {
    const updatesChannel = new BroadcastChannel('api-updates');
    updatesChannel.addEventListener('message', async (event) => {
      const { cacheName, updatedURL } = event.data.payload;
      console.log('Se actualizo la cache: ' + cacheName);
    });
  });
}
