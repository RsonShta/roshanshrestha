/* ============================================
   ROSHAN SHRESTHA — PORTFOLIO
   assets/js/main.js
   ============================================ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 800);
  }, 1800);
});

/* ── CURSOR (GPU Accelerated) ── */
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let targetX = 0, targetY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function render() {
  ringX += (targetX - ringX) * 0.15;
  ringY += (targetY - ringY) * 0.15;
  cur.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
  ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
  requestAnimationFrame(render);
}
render();

document.querySelectorAll('a, button, .project-item, .skill-cat-header, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '64px';
    ring.style.height = '64px';
    ring.style.background = 'rgba(255,255,255,0.08)';
    ring.style.borderColor = 'transparent';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.background = 'transparent';
    ring.style.borderColor = 'rgba(255,255,255,0.6)';
  });
});

/* ── MOBILE MENU ── */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');

if (menuBtn) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
}
if (menuClose) {
  menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}
document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('up');
      entry.target.querySelectorAll('.skill-bar-inner').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── SKILL ACCORDION ── */
function toggleCat(header) {
  const cat = header.closest('.skill-cat');
  const wasOpen = cat.classList.contains('open');
  document.querySelectorAll('.skill-cat').forEach(c => c.classList.remove('open'));
  if (!wasOpen) {
    cat.classList.add('open');
    cat.querySelectorAll('.skill-bar-inner').forEach(bar => {
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 50);
    });
  }
}

/* ── NAV HIGHLIGHT ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'rgba(255,255,255,1)';
    }
  });
}, { passive: true });

/* ── CONTACT FORM (FORMSPREE) ── */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const cfStatus = document.getElementById('cf-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btnSpan = submitBtn.querySelector('span');
    btnSpan.textContent = 'SENDING...';
    submitBtn.disabled = true;
    cfStatus.className = 'cf-status';
    cfStatus.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btnSpan.textContent = 'SENT ✓';
        cfStatus.textContent = 'MESSAGE RECEIVED. I\'LL BE IN TOUCH SOON.';
        cfStatus.className = 'cf-status success';
        form.reset();
        setTimeout(() => {
          btnSpan.textContent = 'SEND MESSAGE';
          submitBtn.disabled = false;
          cfStatus.textContent = '';
        }, 5000);
      } else {
        throw new Error('fail');
      }
    } catch {
      btnSpan.textContent = 'SEND MESSAGE';
      submitBtn.disabled = false;
      cfStatus.textContent = 'FAILED. EMAIL ME DIRECTLY AT rson.shrestha0110@gmail.com';
      cfStatus.className = 'cf-status error';
    }
  });
}