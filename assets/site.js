(function () {
  const content = window.KE_HAN_CONTENT || {};
  document.querySelectorAll('[data-content]').forEach(function (node) {
    const value = content[node.dataset.content];
    if (typeof value === 'string' && value.trim()) node.textContent = value;
  });

  document.querySelectorAll('[data-photo-slot]').forEach(function (slot) {
    const photo = slot.querySelector('[data-photo]');
    if (!photo) return;

    function showPhoto() {
      slot.classList.add('has-photo');
      photo.hidden = false;
    }

    function showPlaceholder() {
      slot.classList.remove('has-photo');
      photo.hidden = true;
    }

    photo.addEventListener('load', showPhoto);
    photo.addEventListener('error', showPlaceholder);
    if (photo.complete) {
      if (photo.naturalWidth > 0) showPhoto();
      else showPlaceholder();
    }
  });

  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');

  if (button && nav) {
    button.addEventListener('click', function () {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      nav.dataset.open = String(!open);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.matches('a')) {
        button.setAttribute('aria-expanded', 'false');
        nav.dataset.open = 'false';
      }
    });
  }

  const printButton = document.querySelector('[data-print]');
  if (printButton) printButton.addEventListener('click', function () { window.print(); });
})();
