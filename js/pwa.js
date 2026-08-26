(() => {
  if (!('serviceWorker' in navigator)) return;

  let deferredInstallPrompt = null;
  let installButton = null;

  const removeInstallButton = () => {
    installButton?.remove();
    installButton = null;
  };

  const showInstallButton = () => {
    if (installButton || !deferredInstallPrompt) return;
    installButton = document.createElement('button');
    installButton.type = 'button';
    installButton.className = 'pwa-install-button';
    installButton.textContent = 'تثبيت التطبيق';
    installButton.setAttribute('aria-label', 'تثبيت تطبيق مفقودين الجزائر');
    installButton.addEventListener('click', async () => {
      const prompt = deferredInstallPrompt;
      if (!prompt) return;
      prompt.prompt();
      await prompt.userChoice;
      deferredInstallPrompt = null;
      removeInstallButton();
    });
    document.body.append(installButton);
  };

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    removeInstallButton();
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/mafkoudin.dz/service-worker.js', { scope: '/mafkoudin.dz/' })
      .catch(() => {
        // يبقى الموقع متاحًا عبر الشبكة عند تعذر تسجيل عامل الخدمة.
      });
  });
})();
