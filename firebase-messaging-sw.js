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

// ── 즉시 업데이트: 새 SW 설치 시 바로 활성화 ──
self.addEventListener('install', () => {
  self.skipWaiting(); // 대기 없이 즉시 활성화
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim()); // 모든 탭에 즉시 적용
});

// ── 앱에서 SKIP_WAITING 메시지 받으면 즉시 활성화 ──
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

// ── data-only 메시지 → SW에서 알람 1개만 표시 ──
self.addEventListener('push', event => {
  let data = {};
  try { data = event.data.json(); } catch(e) {}

  const payload = data.data || {};
  const title = payload.title || '가족 공유판';
  const body  = payload.body  || '';
  const tag   = payload.tag   || 'family-board';
  const url   = payload.url   || 'https://chae0410.github.io/shr-family-board/';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,
      renotify: false,
      vibrate: [200, 100, 200],
      data: { url },
    })
  );
});

// ── 알람 클릭 시 앱 열기 ──
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
