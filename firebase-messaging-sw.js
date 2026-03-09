importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCfd-Qb-uhQ8cv4yTE0foQin5RzMxiNgDs",
  authDomain: "shr-family-board.firebaseapp.com",
  databaseURL: "https://shr-family-board-default-rtdb.firebaseio.com",
  projectId: "shr-family-board",
  storageBucket: "shr-family-board.appspot.com",
  messagingSenderId: "822231408252",
  appId: "1:822231408252:web:86e13ae5eb794999fbf3f9"
});

const messaging = firebase.messaging();

// 백그라운드 메시지 수신
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: './shrfamily.jpg',
    badge: './shrfamily.jpg',
    vibrate: [200, 100, 200],
    data: payload.data
  });
});

// 알림 클릭 시 앱 열기
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
