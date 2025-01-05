importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCzMNKimcw1kaaJlMdTKj7RAdlsHyaImBk",
    authDomain: "vera-pizza-app.firebaseapp.com",
    projectId: "vera-pizza-app",
    storageBucket: "vera-pizza-app.appspot.com",
    messagingSenderId: "783988757356",
    appId: "1:783988757356:web:c66d3f2571aff0f125d949",
    measurementId: "G-FNLSPHKXFW"
};

// Inicializa Firebase en el SW
firebase.initializeApp(firebaseConfig);

// Obtén el servicio de mensajería
const messaging = firebase.messaging();

// Maneja la notificación cuando se recibe en segundo plano
messaging.onBackgroundMessage(function(payload) {
    console.log("Recibido en segundo plano", payload);
    const notificationTitle = 'Nuevo pedido';
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/img/logos/logo_vera_pizza.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Instalación y cacheo de archivos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache-name').then((cache) => {
            return cache.addAll([
                'https://lverapizza.github.io/App/index.html',  // Usa rutas relativas para producción
                'https://lverapizza.github.io/App/css/styles.css',
                'https://lverapizza.github.io/App/script.js',
                'https://lverapizza.github.io/App/img/logo_vera_pizza.png',
                'https://lverapizza.github.io/App/firebase-messaging-sw.js',
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
