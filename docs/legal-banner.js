// MedKitt — Legal Banner & Modal
// Manages the FDA disclaimer banner and legal details modal in app.html

document.addEventListener('DOMContentLoaded', function() {
  var bannerDismissed = localStorage.getItem('medkitt-banner-dismissed');
  if (bannerDismissed === 'true') {
    hideBanner();
  } else {
    document.body.classList.add('has-legal-banner');
  }

  // Attach event listeners (avoids inline onclick which CSP blocks)
  var closeBtn = document.getElementById('legal-banner-close');
  if (closeBtn) closeBtn.addEventListener('click', dismissBanner);

  var learnMoreLink = document.getElementById('legal-learn-more');
  if (learnMoreLink) learnMoreLink.addEventListener('click', function(e) {
    e.preventDefault();
    showLegalDetails();
  });

  var termsLink = document.getElementById('legal-terms-link');
  if (termsLink) termsLink.addEventListener('click', function(e) {
    e.preventDefault();
    showLegalDetails();
  });

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

function showLegalDetails() {
  document.getElementById('legal-modal').classList.add('active');
}

function closeLegalModal() {
  document.getElementById('legal-modal').classList.remove('active');
}
