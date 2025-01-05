// Importar Firebase
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

// Configuración de Firebase (usa la misma que en tu proyecto)
const firebaseConfig = {
    apiKey: "AIzaSyCzMNKimcw1kaaJlMdTKj7RAdlsHyaImBk",
    authDomain: "vera-pizza-app.firebaseapp.com",
    projectId: "vera-pizza-app",
    storageBucket: "vera-pizza-app.firebasestorage.app",
    messagingSenderId: "783988757356",
    appId: "1:783988757356:web:c66d3f2571aff0f125d949",
    measurementId: "G-FNLSPHKXFW"
};

// Inicializa Firebase usando la versión compat
firebase.initializeApp(firebaseConfig);

// Obtén la instancia de Firebase Messaging
const messaging = firebase.messaging();

// Instalación y cacheo de archivos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache-name').then((cache) => {
            return cache.addAll([
                '/index.html',  // Usa rutas relativas para producción
                '/css/styles.css',
                '/script.js',
                '/img/logo_vera_pizza.png',
                '/firebase-messaging-sw.js',
                // Agrega otros archivos necesarios
            ]).catch((error) => {
                console.error('Error al almacenar en caché:', error);
            });
        })
    );
});

// Manejo de solicitudes de red
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).catch((error) => {
                console.error('Error en la recuperación del recurso:', error);
                return new Response('Recurso no disponible', { status: 404 });
            });
        })
    );
});
