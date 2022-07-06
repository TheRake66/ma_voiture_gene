// Script exécuter avant le chargement de l'application.
window.onMobile = window.matchMedia("(max-width: 768px)").matches;
if (window.onMobile) {
    navigator.serviceWorker.register('sw.js');
    Notification.requestPermission();
    window.sendNotification = (title, body, icon) => {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, {
                    body,
                    icon,
                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                    tag: 'notification-tag'
                });
            });
        }
    }
} else {
    Notification.requestPermission();
    window.sendNotification = (title, body, icon) => {
        if (Notification.permission === "granted") {
            new Notification(title, {
                body,
                icon
            });
        }
    }
}