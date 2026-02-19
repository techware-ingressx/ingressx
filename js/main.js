document.addEventListener('DOMContentLoaded', () => {

  // ===== Mobile Menu Toggle =====
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + id) {
          if (scrollY >= top && scrollY < bottom) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // ===== Scroll Fade-In Animation =====
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ===== Count-Up Animation =====
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.getAttribute('data-count');
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const isDecimal = target.includes('.');
        const targetNum = parseFloat(target.replace(/,/g, ''));
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          const current = targetNum * eased;

          if (isDecimal) {
            el.textContent = prefix + current.toFixed(1) + suffix;
          } else if (targetNum >= 1000) {
            el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
          } else {
            el.textContent = prefix + Math.floor(current) + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            // Set final value exactly
            el.textContent = prefix + target + suffix;
          }
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(el => counterObserver.observe(el));

  // ===== Bar Chart Animation =====
  const chartBars = document.querySelectorAll('.chart-bar__fill');

  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const height = bar.getAttribute('data-height');
        bar.style.height = height;
        chartObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.3
  });

  chartBars.forEach(bar => {
    bar.style.height = '0';
    chartObserver.observe(bar);
  });

  // ===== Smooth Scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
