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

// FCM 백그라운드 메시지 수신 (Firebase Functions에서 보낸 알림만 처리)
const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};
  if (!title) return;
  self.registration.showNotification(title, {
    body: body || '',
    icon: './shrfamily.jpg',
    badge: './shrfamily.jpg',
  });
});
