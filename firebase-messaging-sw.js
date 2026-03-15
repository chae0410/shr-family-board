importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCfd-Qb-uhQ8cv4yTE0foQin5RzMxiNgDs",
  authDomain: "shr-family-board.firebaseapp.com",
  databaseURL: "https://shr-family-board-default-rtdb.firebaseio.com",
  projectId: "shr-family-board",
  messagingSenderId: "822231408252",
  appId: "1:822231408252:web:86e13ae5eb794999fbf3f9"
});

const messaging = firebase.messaging();

// data-only 메시지 → SW에서 직접 알람 표시 (1개만)
self.addEventListener('push', event => {
  let data = {};
  try { data = event.data.json(); } catch(e) {}

  // webpush.data 필드에서 꺼내기
  const payload = data.data || {};
  const title = payload.title || '가족 공유판';
  const body  = payload.body  || '';
  const tag   = payload.tag   || 'family-board';
  const url   = payload.url   || 'https://chae0410.github.io/shr-family-board/';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,        // 같은 tag → 이전 알람 덮어씀 (중복 방지)
      renotify: false,
      vibrate: [200, 100, 200],
      data: { url },
    })
  );
});

// 알람 클릭 시 앱 열기
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || 'https://chae0410.github.io/shr-family-board/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('chae0410.github.io') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
