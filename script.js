/* ===== NAV: scroll shadow + hamburger ===== */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

/* Close mobile nav on link click */
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ===== MENU TABS ===== */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById('panel-' + target)?.classList.add('active');
  });
});

/* ===== CONTACT FORM ===== */
const form    = document.getElementById('reservationForm');
const success = document.getElementById('formSuccess');

/* Set min date to today */
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

form?.addEventListener('submit', e => {
  e.preventDefault();

  const required = form.querySelectorAll('[required]');
  let valid = true;

  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#c0392b';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) return;

  /* Simulate async send */
  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Envoi…';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';
  }, 900);
});

/* ===== SCROLL REVEAL (lightweight) ===== */
const revealEls = document.querySelectorAll(
  '.menu-card, .gallery-item, .about-grid, .contact-detail, .menu-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  observer.observe(el);
});
