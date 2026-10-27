// NAVA Digital Interactive Core Logic & Robust Event Handling

document.addEventListener('DOMContentLoaded', () => {

  // Add JS enabled marker to html
  document.documentElement.classList.add('js-enabled');

  // ---------- 0. Dynamic Copyright Year ----------
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

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


  // ---------- 3. Explore Service Buttons (Smooth Scroll & Auto-select) ----------
  const exploreServiceBtns = document.querySelectorAll('.explore-service-btn');
  const needSelect = document.getElementById('need');

  exploreServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const service = btn.getAttribute('data-service');
      if (needSelect && service) {
        // Match option text or value
        let matched = false;
        for (let i = 0; i < needSelect.options.length; i++) {
          if (needSelect.options[i].value === service || needSelect.options[i].text.includes(service)) {
            needSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          needSelect.value = service;
        }
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        e.preventDefault();
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const messageInput = document.getElementById('message');
          if (messageInput) messageInput.focus();
        }, 500);
      }
    });
  });


  // ---------- 4. Project Details Modal Logic ----------
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalCategory = document.getElementById('modal-project-category');
  const modalTitle = document.getElementById('modal-project-title');
  const modalPurpose = document.getElementById('modal-project-purpose');
  const modalProblem = document.getElementById('modal-project-problem');
  const modalTech = document.getElementById('modal-project-tech');
  const modalLiveLink = document.getElementById('modal-live-link');

  const projectDetailsMap = {
    svr: {
      category: 'E-Commerce Platform / Production',
      title: 'SVR Home Foods',
      purpose: 'Transformed an artisanal home food business into an online storefront with intuitive category navigation, responsive shopping cart, and automated WhatsApp order routing.',
      problem: 'The business previously relied on manual phone calls and disorganized direct messages, leading to missed orders and payment confusion. The new system automates order compilation directly into formatted WhatsApp messages with clear item breakdown and order totals.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Firebase Hosting', 'WhatsApp Business API'],
      liveUrl: 'https://srisvrhomefoods.web.app/'
    },
    guessproof: {
      category: 'Web Application / SaaS Concept',
      title: 'GuessProof AI Platform',
      purpose: 'An interactive cybersecurity web application designed to evaluate password vulnerability, dictionary vectors, and pattern leaks with instantaneous client-side calculation.',
      problem: 'Most users reuse weak or breached passwords without understanding threat vectors. GuessProof AI provides visual real-time feedback on password complexity, entropy, and crack time without sending sensitive data to external servers.',
      tech: ['Modern JavaScript', 'Tailwind CSS', 'REST APIs', 'Client-Side Analytics', 'Vercel Deployment'],
      liveUrl: 'https://guess-proof-ai.vercel.app/'
    }
  };

  function openProjectModal(projectId) {
    const data = projectDetailsMap[projectId];
    if (!data || !projectModal) return;

    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalPurpose) modalPurpose.textContent = data.purpose;
    if (modalProblem) modalProblem.textContent = data.problem;

    if (modalTech) {
      modalTech.innerHTML = data.tech.map(t => `
        <span class="px-2.5 py-1 rounded-md bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">${t}</span>
      `).join('');
    }

    if (modalLiveLink) {
      modalLiveLink.href = data.liveUrl;
    }

    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });


  // ---------- 5. Interactive Tech Stack Switcher ----------
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


  // ---------- 6. FAQ Accordion Logic with ARIA Accessibility ----------
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


  // ---------- 7. Intersection Observer with Graceful Fallback ----------
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


  // ---------- 8. Active Navigation Link Highlighting ----------
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


  // ---------- 9. Back-to-Top Button ----------
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


  // ---------- 10. Contact Form → Anti-Spam & EmailJS Submission ----------
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  const submitBtn = document.getElementById('submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');

  // EmailJS credentials
  const EMAILJS_SERVICE_ID = 'service_g98hrf7';
  const EMAILJS_TEMPLATE_ID = 'template_1y0z8s6';
  const EMAILJS_PUBLIC_KEY = 'onvovVwx2bhkeSuys';

  if (form) {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const serviceInput = document.getElementById('service') || document.getElementById('need');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const consentInput = document.getElementById('consent');
    const consentError = document.getElementById('consent-error');

    const fields = [
      { input: nameInput, validate: v => v.trim().length >= 2 && v.trim().length <= 100 },
      { input: emailInput, validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      { input: phoneInput, validate: v => v.trim() === '' || /^[+0-9\s\-()]{7,20}$/.test(v.trim()), optional: true },
      { input: messageInput, validate: v => v.trim().length >= 10 && v.trim().length <= 3000 }
    ];

    function showFieldError(input, isValid) {
      if (!input) return;
      input.classList.toggle('error', !isValid);
      const errorEl = input.parentElement?.querySelector('.field-error');
      if (errorEl) errorEl.classList.toggle('hidden', isValid);
    }

    // Live validation
    fields.forEach(({ input, validate, optional }) => {
      if (input) {
        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            const val = input.value;
            const ok = optional && val.trim() === '' ? true : validate(val);
            showFieldError(input, ok);
          }
        });
      }
    });

    if (consentInput && consentError) {
      consentInput.addEventListener('change', () => {
        if (consentInput.checked) {
          consentError.classList.add('hidden');
        }
      });
    }

    function setNote(msg, isError = false) {
      if (!note) return;
      note.textContent = msg;
      note.classList.remove('hidden');
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
      submitBtnText.textContent = loading ? 'Sending Message…' : 'Send Message';
      submitBtn.style.opacity = loading ? '0.7' : '';
      submitBtn.style.cursor = loading ? 'wait' : '';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Anti-Spam Check 1: Honeypot trap
      const honeypot = document.getElementById('website_hp')?.value;
      if (honeypot && honeypot.trim() !== '') {
        // Trapped bot: simulate silent success without calling EmailJS
        setBtnState(true);
        setTimeout(() => {
          setNote('✓ Project enquiry received. Thank you!');
          setBtnState(false);
          form.reset();
        }, 800);
        return;
      }

      // Anti-Spam Check 2: Rate limiting (30 seconds cooldown)
      const lastSubmit = localStorage.getItem('nava_form_last_submit');
      const now = Date.now();
      if (lastSubmit && (now - parseInt(lastSubmit, 10)) < 30000) {
        const remainingSecs = Math.ceil((30000 - (now - parseInt(lastSubmit, 10))) / 1000);
        setNote(`⚠ Please wait ${remainingSecs}s before submitting another enquiry.`, true);
        return;
      }

      // Validate input fields
      let allValid = true;
      fields.forEach(({ input, validate, optional }) => {
        if (input) {
          const val = input.value;
          const ok = optional && val.trim() === '' ? true : validate(val);
          showFieldError(input, ok);
          if (!ok) allValid = false;
        }
      });

      // Validate consent checkbox
      if (consentInput) {
        if (!consentInput.checked) {
          allValid = false;
          if (consentError) consentError.classList.remove('hidden');
        } else if (consentError) {
          consentError.classList.add('hidden');
        }
      }

      if (!allValid) return;

      // Gather form inputs
      const nameVal = nameInput?.value.trim() || '';
      const emailVal = emailInput?.value.trim() || '';
      const phoneVal = phoneInput?.value.trim() || '';
      const serviceVal = serviceInput?.value || 'General Inquiry / Information';
      const subjectVal = subjectInput?.value.trim() || (serviceVal ? `Inquiry: ${serviceVal}` : 'NAVA Digital India Contact');
      const messageVal = messageInput?.value.trim() || '';

      // Submit via EmailJS
      setBtnState(true);
      setNote('Sending message…');

      try {
        if (typeof emailjs === 'undefined') {
          throw new Error('EmailJS SDK is not loaded. Please check your internet connection.');
        }

        const templateParams = {
          name: nameVal,
          from_name: nameVal,
          user_name: nameVal,
          email: emailVal,
          from_email: emailVal,
          user_email: emailVal,
          reply_to: emailVal,
          phone: phoneVal || 'Not provided',
          phone_number: phoneVal || 'Not provided',
          user_phone: phoneVal || 'Not provided',
          service: serviceVal,
          service_needed: serviceVal,
          topic: serviceVal,
          subject: subjectVal,
          message: messageVal,
          consent_given: 'Yes',
          submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          to_name: 'NAVA Digital India',
          to_email: 'navagroup.official@gmail.com'
        };

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

        // Store rate-limiting timestamp
        localStorage.setItem('nava_form_last_submit', Date.now().toString());

        setNote('✓ Message sent successfully! Redirecting…');
        setTimeout(() => {
          window.location.href = 'thank-you.html';
        }, 1200);

      } catch (err) {
        console.error('EmailJS Submission Error:', err);
        const errMsg = err?.text || err?.message || 'Could not send message automatically.';
        setNote(`✗ ${errMsg}. You can also reach us via WhatsApp (+91 99890 61802) or email (navagroup.official@gmail.com).`, true);
        setBtnState(false);
      }
    });
  }

});
