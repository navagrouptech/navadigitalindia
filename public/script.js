// NAVA Digital Interactive Core Logic & Robust Event Handling

document.addEventListener('DOMContentLoaded', () => {

  // Add JS enabled marker to html
  document.documentElement.classList.add('js-enabled');

  // ---------- 1. Theme Toggle (Light / Dark Mode) ----------
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const floatingThemeToggle = document.getElementById('floating-theme-toggle');

  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const themeToggleText = document.getElementById('theme-toggle-text');

  const mobileThemeIconSun = document.getElementById('mobile-theme-icon-sun');
  const mobileThemeIconMoon = document.getElementById('mobile-theme-icon-moon');
  const mobileThemeToggleText = document.getElementById('mobile-theme-toggle-text');

  const floatThemeIconSun = document.getElementById('float-theme-icon-sun');
  const floatThemeIconMoon = document.getElementById('float-theme-icon-moon');

  function updateThemeUI(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (themeIconSun) themeIconSun.classList.remove('hidden');
      if (themeIconMoon) themeIconMoon.classList.add('hidden');
      if (themeToggleText) themeToggleText.textContent = 'Light Mode';

      if (mobileThemeIconSun) mobileThemeIconSun.classList.remove('hidden');
      if (mobileThemeIconMoon) mobileThemeIconMoon.classList.add('hidden');
      if (mobileThemeToggleText) mobileThemeToggleText.textContent = 'Light Mode';

      if (floatThemeIconSun) floatThemeIconSun.classList.remove('hidden');
      if (floatThemeIconMoon) floatThemeIconMoon.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIconSun) themeIconSun.classList.add('hidden');
      if (themeIconMoon) themeIconMoon.classList.remove('hidden');
      if (themeToggleText) themeToggleText.textContent = 'Dark Mode';

      if (mobileThemeIconSun) mobileThemeIconSun.classList.add('hidden');
      if (mobileThemeIconMoon) mobileThemeIconMoon.classList.remove('hidden');
      if (mobileThemeToggleText) mobileThemeToggleText.textContent = 'Dark Mode';

      if (floatThemeIconSun) floatThemeIconSun.classList.add('hidden');
      if (floatThemeIconMoon) floatThemeIconMoon.classList.remove('hidden');
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const nextIsDark = !isDark;
    localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    updateThemeUI(nextIsDark);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }
  if (floatingThemeToggle) {
    floatingThemeToggle.addEventListener('click', toggleTheme);
  }

  // Initial theme sync with localStorage or current document class
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    updateThemeUI(savedTheme === 'dark');
  } else {
    // Default to light theme for new visitors
    updateThemeUI(false);
  }


  // ---------- 2. Mobile Menu Drawer ----------
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  function closeMobileMenu() {
    if (!mobileNav) return;
    mobileNav.classList.add('hidden');
    if (iconOpen) iconOpen.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = !mobileNav.classList.contains('hidden');
      if (isOpen) {
        closeMobileMenu();
      } else {
        mobileNav.classList.remove('hidden');
        if (iconOpen) iconOpen.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }


  // ---------- 3. Selected Work Portfolio Category Filter (Race-Condition Free) ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      workCards.forEach(card => {
        const item = card.closest('.work-card-link') || card;

        // Cancel any pending timer to avoid filter race conditions
        if (item._filterTimeout) {
          clearTimeout(item._filterTimeout);
          item._filterTimeout = null;
        }

        if (filter === 'all' || card.dataset.category === filter) {
          item.style.display = '';
          item._filterTimeout = setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          item._filterTimeout = setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });


  // ---------- 4. Interactive Tech Stack Switcher ----------
  const techTabs = document.querySelectorAll('.tech-tab');
  const techPanels = document.querySelectorAll('.tech-panel');

  techTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      techTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.tech;

      techPanels.forEach(panel => {
        if (panel.dataset.panel === category) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });


  // ---------- 5. FAQ Accordion Logic with ARIA Accessibility ----------
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-item');
      const body = item.querySelector('.faq-body');
      const isOpen = item.classList.contains('open');

      // Close all accordion items for clean UX & ARIA sync
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const h = i.querySelector('.faq-header');
        const b = i.querySelector('.faq-body');
        if (h) h.setAttribute('aria-expanded', 'false');
        if (b) b.setAttribute('aria-hidden', 'true');
      });

      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        if (body) body.setAttribute('aria-hidden', 'false');
      }
    });
  });


  // ---------- 6. Intersection Observer with Graceful Fallback ----------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver support
    revealElements.forEach(el => el.classList.add('in-view'));
  }


  // ---------- 7. Active Navigation Link Highlighting ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#primary-nav .nav-link');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
  }


  // ---------- 8. Back-to-Top Button ----------
  const backToTop = document.getElementById('back-to-top');
  let ticking = false;

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 500) {
            backToTop.classList.remove('hidden');
            backToTop.style.opacity = '1';
          } else {
            backToTop.style.opacity = '0';
            setTimeout(() => { if (window.scrollY <= 500) backToTop.classList.add('hidden'); }, 200);
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ---------- 9. Contact Form → Anti-Spam & EmailJS Submission ----------
  const form          = document.getElementById('contact-form');
  const note          = document.getElementById('form-note');
  const submitBtn     = document.getElementById('submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');

  // EmailJS credentials
  const EMAILJS_SERVICE_ID  = 'service_0xonud9';
  const EMAILJS_TEMPLATE_ID = 'template_0cw2u8f';

  if (form) {
    const fields = [
      { input: document.getElementById('name'),    validate: v => v.trim().length >= 2 && v.trim().length <= 100 },
      { input: document.getElementById('email'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      { input: document.getElementById('message'), validate: v => v.trim().length >= 10 && v.trim().length <= 2000 }
    ];

    function showFieldError(input, isValid) {
      if (!input) return;
      input.classList.toggle('error', !isValid);
      const errorEl = input.parentElement.querySelector('.field-error');
      if (errorEl) errorEl.classList.toggle('hidden', isValid);
    }

    // Live validation
    fields.forEach(({ input, validate }) => {
      if (input) {
        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            showFieldError(input, validate(input.value));
          }
        });
      }
    });

    function setNote(msg, isError = false) {
      if (!note) return;
      note.textContent = msg;
      note.className = [
        'text-xs font-mono text-center mt-3 block',
        isError
          ? 'text-red-500 dark:text-red-400'
          : 'text-emerald-600 dark:text-emerald-400'
      ].join(' ');
    }

    function setBtnState(loading) {
      if (!submitBtn || !submitBtnText) return;
      submitBtn.disabled = loading;
      submitBtnText.textContent = loading ? 'Sending…' : 'Send Message';
      submitBtn.style.opacity  = loading ? '0.7' : '';
      submitBtn.style.cursor   = loading ? 'wait' : '';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Anti-Spam Check 1: Honeypot trap
      const honeypot = document.getElementById('website_hp')?.value;
      if (honeypot && honeypot.trim() !== '') {
        // Trapped bot: simulate silent success without calling EmailJS
        setBtnState(true);
        setTimeout(() => {
          setNote('✓ Message received. Thank you!');
          setBtnState(false);
          form.reset();
        }, 800);
        return;
      }

      // Anti-Spam Check 2: Rate limiting (60 seconds cooldown)
      const lastSubmit = localStorage.getItem('nava_form_last_submit');
      const now = Date.now();
      if (lastSubmit && (now - parseInt(lastSubmit, 10)) < 60000) {
        const remainingSecs = Math.ceil((60000 - (now - parseInt(lastSubmit, 10))) / 1000);
        setNote(`⚠ Please wait ${remainingSecs}s before submitting another message.`, true);
        return;
      }

      // Validate input fields
      let allValid = true;
      fields.forEach(({ input, validate }) => {
        if (input) {
          const ok = validate(input.value);
          showFieldError(input, ok);
          if (!ok) allValid = false;
        }
      });

      if (!allValid) return;

      // Gather form inputs
      const nameVal    = document.getElementById('name').value.trim();
      const emailVal   = document.getElementById('email').value.trim();
      const needVal    = document.getElementById('need')?.value ?? 'Digital Solution';
      const messageVal = document.getElementById('message').value.trim();

      // Submit via EmailJS
      setBtnState(true);
      setNote('Sending message…');

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name     : nameVal,
          from_email    : emailVal,
          service_needed: needVal,
          message       : messageVal,
          to_email      : 'teamnavadigital@gmail.com',
          reply_to      : emailVal
        });

        // Store rate-limiting timestamp
        localStorage.setItem('nava_form_last_submit', Date.now().toString());

        setNote('✓ Message sent! Redirecting to confirmation page…');
        setTimeout(() => {
          window.location.href = 'thank-you.html';
        }, 1000);

      } catch (err) {
        console.error('EmailJS Submission Error:', err);
        setNote('✗ Could not send automatically. Please contact us directly via WhatsApp (+91 99890 61802) or email (teamnavadigital@gmail.com).', true);
        setBtnState(false);
      }
    });
  }

});
