document.getElementById('year').textContent = new Date().getFullYear();

// Mobile sidebar toggle
const sidebar = document.getElementById('sidebar');
const navToggle = document.getElementById('nav-toggle');

navToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => sidebar.classList.remove('open'));
});

// Scrollspy: highlight active nav link
const sections = document.querySelectorAll('#main section');
const navLinks = document.querySelectorAll('#nav a');

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => spy.observe(section));

// Typed rotating tagline
const words = [
  'Computational Biologist',
  'Postdoctoral Researcher',
  'Single-Cell Genomics',
  'Perturb-seq Analyst'
];
const typedEl = document.getElementById('typed-text');
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function tick() {
  const current = words[wordIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(tick, 1800);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(tick, deleting ? 40 : 70);
}

tick();
