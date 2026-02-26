// MedKitt — Legal Banner, Splash Screen & Modal
// Manages the FDA disclaimer splash, persistent banner, and legal details modal in app.html
// All event handling via addEventListener (CSP-compliant, no inline onclick)

// ── Immediate splash check (runs synchronously before browser renders rest of page) ──
(function() {
  var splash = document.getElementById('legal-splash');
  if (splash && localStorage.getItem('medkitt-legal-acknowledged') === 'true') {
    splash.classList.add('legal-splash-hidden');
  }
})();

// ── DOMContentLoaded: set up all interactive handlers ──
document.addEventListener('DOMContentLoaded', function() {

  // ── Splash Screen (4-question acknowledgment) ──
  var splash = document.getElementById('legal-splash');
  if (splash && !splash.classList.contains('legal-splash-hidden')) {
    // Splash is visible — attach checkbox listeners
    var checkboxItems = splash.querySelectorAll('.legal-checkbox-item');
    checkboxItems.forEach(function(item) {
      item.addEventListener('click', function(e) {
        if (e.target.tagName === 'INPUT') return; // Prevent double-toggle
        var cb = item.querySelector('input[type="checkbox"]');
        cb.checked = !cb.checked;
        updateSplashButton();
      });
      var cb = item.querySelector('input[type="checkbox"]');
      if (cb) cb.addEventListener('change', updateSplashButton);
    });

    // Check All button
    var checkAllBtn = document.getElementById('splash-check-all');
    if (checkAllBtn) checkAllBtn.addEventListener('click', function() {
      splash.querySelectorAll('.legal-checkbox-item input[type="checkbox"]').forEach(function(cb) {
        cb.checked = true;
      });
      updateSplashButton();
    });

    // Acknowledge button
    var ackBtn = document.getElementById('splash-acknowledge');
    if (ackBtn) ackBtn.addEventListener('click', function() {
      localStorage.setItem('medkitt-legal-acknowledged', 'true');
      localStorage.setItem('medkitt-legal-acknowledged-date', new Date().toISOString());
      splash.classList.add('legal-splash-hidden');
    });

    // Exit button
    var exitBtn = document.getElementById('splash-exit');
    if (exitBtn) exitBtn.addEventListener('click', function() {
      window.location.href = 'https://www.google.com';
    });
  }

  function updateSplashButton() {
    if (!splash) return;
    var checkboxes = splash.querySelectorAll('.legal-checkbox-item input[type="checkbox"]');
    var allChecked = Array.from(checkboxes).every(function(cb) { return cb.checked; });
    var ackBtn = document.getElementById('splash-acknowledge');
    if (ackBtn) ackBtn.disabled = !allChecked;
    checkboxes.forEach(function(cb) {
      cb.closest('.legal-checkbox-item').classList.toggle('checked', cb.checked);
    });
    var checkAllBtn = document.getElementById('splash-check-all');
    if (checkAllBtn) {
      checkAllBtn.style.display = allChecked ? 'none' : '';
    }
  }

  // ── Persistent Banner (dismiss X) ──
  var bannerDismissed = localStorage.getItem('medkitt-banner-dismissed');
  if (bannerDismissed === 'true') {
    hideBanner();
  } else {
    document.body.classList.add('has-legal-banner');
  }

  var closeBtn = document.getElementById('legal-banner-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', dismissBanner);
    closeBtn.addEventListener('touchend', function(e) {
      e.preventDefault();
      dismissBanner();
    });
  }

  // ── Learn More / Terms links → Legal Modal ──
  var learnMoreLink = document.getElementById('legal-learn-more');
  if (learnMoreLink) learnMoreLink.addEventListener('click', function(e) {
    e.preventDefault();
    showLegalModal();
  });

  var termsLink = document.getElementById('legal-terms-link');
  if (termsLink) termsLink.addEventListener('click', function(e) {
    e.preventDefault();
    showLegalModal();
  });

  // ── Legal Modal ──
  var modalOverlay = document.getElementById('legal-modal');
  if (modalOverlay) modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeLegalModal();
  });

  var modalBtn = document.getElementById('legal-modal-close-btn');
  if (modalBtn) modalBtn.addEventListener('click', closeLegalModal);
});

function dismissBanner() {
  localStorage.setItem('medkitt-banner-dismissed', 'true');
  hideBanner();
}

function hideBanner() {
  var banner = document.getElementById('legal-banner');
  if (banner) banner.style.display = 'none';
  document.body.classList.remove('has-legal-banner');
}

function showLegalModal() {
  var modal = document.getElementById('legal-modal');
  if (modal) modal.classList.add('active');
}

function closeLegalModal() {
  var modal = document.getElementById('legal-modal');
  if (modal) modal.classList.remove('active');
}
