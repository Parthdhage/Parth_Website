/**
 * Interactive Behaviors
 * Personal Website - Parth Dhage
 */

document.addEventListener('DOMContentLoaded', () => {

  // Typing Effect for Hero Tagline
  const taglineEl = document.getElementById('heroTagline');
  const phrases = [
    'A curious learner.',
    'A fresher exploring the tech world.',
    'An explorer of code and systems.',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;

  const cursor = document.createElement('span');
  cursor.classList.add('typed-cursor');
  cursor.textContent = '';

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      taglineEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 25;
    } else {
      taglineEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 50 + Math.random() * 40;
    }

    taglineEl.appendChild(cursor);

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  setTimeout(typeEffect, 1200);


  // Cursor Glow Effect
  const cursorGlow = document.getElementById('cursorGlow');

  if (cursorGlow && window.innerWidth > 768) {
    let glowX = 0, glowY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
      glowX = e.clientX;
      glowY = e.clientY;
    });

    function animateGlow() {
      currentX += (glowX - currentX) * 0.15;
      currentY += (glowY - currentY) * 0.15;
      cursorGlow.style.left = currentX + 'px';
      cursorGlow.style.top = currentY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    document.addEventListener('mouseenter', () => {
      cursorGlow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });
  }


  // Magnetic Button Effect
  const magneticBtns = document.querySelectorAll('.btn-magnetic');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.04)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });


  // Click to Expand (Skills, Projects, Experience)
  const expandables = document.querySelectorAll('[data-expandable]');

  expandables.forEach(item => {
    item.addEventListener('click', (e) => {
      // Don't toggle if clicking a link or button inside
      if (e.target.closest('a') || e.target.closest('button')) return;
      item.classList.toggle('expanded');
    });
  });


  // Scroll Reveal (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  // Active Section Highlighting (Scroll-based)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollY = window.scrollY;
    const navHeight = 64;
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        currentSection = section.getAttribute('id');
      }
    });

    // If at the very bottom, activate last section
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      currentSection = sections[sections.length - 1].getAttribute('id');
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  // Run once on load
  updateActiveNav();


  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navLinksEl = document.getElementById('navLinks');
        const navToggle = document.getElementById('navToggle');
        if (navLinksEl.classList.contains('open')) {
          navLinksEl.classList.remove('open');
          navToggle.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });


  // ---------- Mobile Navigation Toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    navToggle.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });


  // ---------- Parallax Orbs on Mouse Move ----------
  const heroOrbs = document.querySelectorAll('.hero-orb');
  const hero = document.querySelector('.hero');

  if (hero && heroOrbs.length > 0) {
    hero.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      heroOrbs.forEach((orb, index) => {
        const depth = (index + 1) * 15;
        const x = moveX * depth;
        const y = moveY * depth;
        orb.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }


  // ---------- Staggered Counter Animation ----------
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const numMatch = text.match(/^([\d.]+)(.*)$/);

        if (numMatch) {
          const target = parseFloat(numMatch[1]);
          const suffix = numMatch[2] || '';
          const isDecimal = text.includes('.');
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));


  // ---------- Staggered Project Card Tilt Effect ----------
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -3;
      const rotateY = (x - centerX) / centerX * 3;

      card.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
