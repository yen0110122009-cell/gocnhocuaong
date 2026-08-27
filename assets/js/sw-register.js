(() => {
  if (!('serviceWorker' in navigator)) return;
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (location.protocol !== 'https:' && !isLocal) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js?sw-refresh=v10', { scope: './' })
      .then(registration => {
        registration.update().catch(() => {});
      })
      .catch(error => console.warn('Không thể đăng ký service worker:', error));
  }, { once: true });
})();
