/**
 * ==========================================================================
 * PARTH DEORE — PRODUCTION ANIMATIONS ENGINE (AWWWARDS-LEVEL)
 * Technologies: GSAP 3 + ScrollTrigger + Lenis Smooth Scroll
 * Features:
 * - Full-screen cinematic preloader with clip-path wipe
 * - Magnetic button cursor attraction & moving arrows
 * - Sliding active pill navigation (inspired by pszostak.pl)
 * - Top hairline gradient scroll progress indicator
 * - Staggered split-text & split-character name reveal
 * - Coordinated Bento Grid layered 3D depth & tech ticker
 * - Pinned horizontal project showcase sequence (desktop)
 * - Real-time 3D tilt and cursor-following spotlight glow
 * - Custom cursor with mix-blend-mode: difference
 * - Complete prefers-reduced-motion accessibility
 * ==========================================================================
 */

(function () {
  'use strict';

  // 1. Accessibility Check: strictly respect prefers-reduced-motion
  const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotionMedia.matches) {
    console.log('[Animations] prefers-reduced-motion is active: skipping all animations.');
    return;
  }

  // Verify GSAP and ScrollTrigger availability
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[Animations] GSAP or ScrollTrigger not loaded. Animations disabled.');
    return;
  }

  // Register ScrollTrigger plugin once
  gsap.registerPlugin(ScrollTrigger);

  let lenisInstance = null;
  const matchMediaInstance = gsap.matchMedia();

  /* ==========================================================================
     1. PRELOADER ENGINE
     - Full-screen overlay that reveals the site with a clip-path wipe
       (left-to-right, 1.2s, ease: power4.inOut)
     - Percentage counter (0→100) with custom ease
     ========================================================================== */
  function initPreloader(onCompleteCallback) {
    const preloader = document.createElement('div');
    preloader.className = 'anim-preloader';
    preloader.id = 'animPreloader';
    preloader.setAttribute('aria-hidden', 'true');

    preloader.innerHTML = `
      <div class="anim-preloader-inner">
        <div class="anim-preloader-badge">
          <span class="anim-preloader-dot"></span>
          <span>PARTH DEORE • BACKEND SYSTEMS</span>
        </div>
        <div class="anim-preloader-number">
          <span id="animPreloaderCount">0</span><span class="anim-preloader-pct">%</span>
        </div>
        <div class="anim-preloader-progress-track">
          <div class="anim-preloader-progress-bar" id="animPreloaderBar"></div>
        </div>
        <div class="anim-preloader-status" id="animPreloaderStatus">Loading system architecture...</div>
      </div>
    `;

    document.body.prepend(preloader);
    document.body.style.overflow = 'hidden';

    const countEl = document.getElementById('animPreloaderCount');
    const barEl = document.getElementById('animPreloaderBar');
    const statusEl = document.getElementById('animPreloaderStatus');

    const statuses = [
      'Initializing core engine...',
      'Synthesizing backend schemas...',
      'Assembling API contracts...',
      'Mounting reactive environment...',
      'System ready.'
    ];

    const progressObj = { value: 0 };

    gsap.to(progressObj, {
      value: 100,
      duration: 1.35,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(progressObj.value);
        if (countEl) countEl.textContent = val;
        if (barEl) barEl.style.transform = `scaleX(${val / 100})`;

        if (statusEl) {
          const stepIndex = Math.min(
            statuses.length - 1,
            Math.floor((val / 100) * statuses.length)
          );
          statusEl.textContent = statuses[stepIndex];
        }
      },
      onComplete: () => {
        // Left-to-right clip-path wipe reveal
        gsap.to(preloader, {
          clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            preloader.remove();
            document.body.style.overflow = '';
            if (typeof onCompleteCallback === 'function') {
              onCompleteCallback();
            }
          }
        });
      }
    });
  }

  /* ==========================================================================
     2. SLIDING ACTIVE CAPSULE NAVIGATION (Inspired by pszostak.pl)
     - Buttery smooth pill sliding behind the active link
     - Live hover preview and scrollspy synchronization
     ========================================================================== */
  function initSlidingNavPill() {
    const pillNav = document.getElementById('pillNav');
    if (!pillNav) return;

    let slidingPill = document.getElementById('navSlidingPill');
    if (!slidingPill) {
      slidingPill = document.createElement('span');
      slidingPill.className = 'nav-sliding-pill';
      slidingPill.id = 'navSlidingPill';
      pillNav.prepend(slidingPill);
    }

    const links = Array.from(pillNav.querySelectorAll('.pill-nav-link'));

    function moveToLink(link) {
      if (!link || !slidingPill) return;
      const navRect = pillNav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const x = linkRect.left - navRect.left;
      const width = linkRect.width;

      slidingPill.style.transform = `translate3d(${x}px, 0, 0)`;
      slidingPill.style.width = `${width}px`;
      slidingPill.style.opacity = '1';
    }

    function getActiveLink() {
      return pillNav.querySelector('.pill-nav-link.active') || links[0];
    }

    // Set initial position
    setTimeout(() => moveToLink(getActiveLink()), 100);

    // Hover previews
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => moveToLink(link));
    });

    pillNav.addEventListener('mouseleave', () => {
      moveToLink(getActiveLink());
    });

    // Observer to re-position when active class changes via ScrollSpy
    const classObserver = new MutationObserver(() => {
      moveToLink(getActiveLink());
    });

    links.forEach((link) => {
      classObserver.observe(link, { attributes: true, attributeFilter: ['class'] });
    });

    window.addEventListener('resize', () => moveToLink(getActiveLink()), { passive: true });
  }

  /* ==========================================================================
     3. TOP SCROLL PROGRESS INDICATOR
     - Hairline gradient bar at the very top of the window
     ========================================================================== */
  function initScrollProgressBar() {
    const bar = document.getElementById('animScrollProgress');
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        id: 'scroll-progress-bar',
        start: 'top top',
        end: 'max',
        scrub: true
      }
    });
  }

  /* ==========================================================================
     4. CINEMATIC HERO ENTRANCE & SPLIT-TEXT REVEAL
     - Headline words rise from behind overflow-hidden mask
     - Staggered split-character reveal for PARTH DEORE in Bento
     - Spring-based entrance for memoji avatar and portrait card
     ========================================================================== */
  function initHeroAnimations() {
    const heroWords = document.querySelectorAll('.hi-hero-title .anim-word');
    const stickerFrame = document.getElementById('hiStickerFrame');
    const oversizedTitle = document.querySelector('.oversized-title');
    const portraitCard = document.querySelector('.portrait-photo-card');
    const roleCaption = document.querySelector('.role-caption');

    const heroTl = gsap.timeline();

    // Memoji avatar spring entrance
    if (stickerFrame) {
      heroTl.fromTo(
        stickerFrame,
        { opacity: 0, scale: 0.72 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.8)' }
      );
    }

    // Headline words rise from behind masks
    if (heroWords.length) {
      heroTl.to(
        heroWords,
        {
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
        },
        stickerFrame ? '-=0.55' : 0
      );
    }

    // Split oversized name PARTH DEORE into individual letter masks
    if (oversizedTitle && !oversizedTitle.dataset.split) {
      oversizedTitle.dataset.split = 'true';
      const spans = oversizedTitle.querySelectorAll('span');
      spans.forEach((s) => {
        const text = s.textContent.trim();
        s.innerHTML = text
          .split('')
          .map((ch) => `<span class="anim-char-mask"><span class="anim-char">${ch}</span></span>`)
          .join('');
      });

      const chars = oversizedTitle.querySelectorAll('.anim-char');
      heroTl.to(
        chars,
        {
          y: 0,
          stagger: 0.035,
          duration: 0.7,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
        },
        '-=0.3'
      );
    }

    // Role caption fade & slide
    if (roleCaption) {
      heroTl.fromTo(
        roleCaption,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );
    }

    // Portrait card spring entrance
    if (portraitCard) {
      heroTl.fromTo(
        portraitCard,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
        '-=0.4'
      );
    }

    // Hero background atmosphere parallax
    const heroSection = document.getElementById('hero');
    const stickerHalo = document.querySelector('.hi-sticker-halo');
    const heroAtmosphere = document.querySelector('.anim-hero-bg-parallax');

    const parallaxTargets = [stickerHalo, heroAtmosphere].filter(Boolean);
    if (parallaxTargets.length && heroSection) {
      gsap.to(parallaxTargets, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          id: 'hero-bg-parallax',
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }

  /* ==========================================================================
     5. MAGNETIC BUTTON INTERACTIONS & MOVING ARROWS
     - Smooth magnetic attraction toward cursor on desktop
     - Elastic bounce-back release
     ========================================================================== */
  function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return;

    const magneticTargets = document.querySelectorAll(
      '.nav-circle-btn, .nav-action-pill, .project-gradient-btn, .project-live-badge-btn, .inspect-pill-btn, .resume-download-cta, .form-submit-cta, .scroll-top-btn, .copy-badge-btn'
    );

    magneticTargets.forEach((btn) => {
      btn.classList.add('anim-magnetic');

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        gsap.to(btn, {
          x: relX * 0.28,
          y: relY * 0.28,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        // Parallax offset on internal icon or label
        const inner = btn.querySelector('svg, .btn-icon, .btn-label, span');
        if (inner) {
          gsap.to(inner, {
            x: relX * 0.14,
            y: relY * 0.14,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'elastic.out(1, 0.35)',
          overwrite: 'auto'
        });

        const inner = btn.querySelector('svg, .btn-icon, .btn-label, span');
        if (inner) {
          gsap.to(inner, {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: 'elastic.out(1, 0.35)',
            overwrite: 'auto'
          });
        }
      });
    });
  }

  /* ==========================================================================
     6. SCROLL-TRIGGERED REVEALS (All Sections)
     ========================================================================== */
  function initScrollReveals() {
    // 6a. Section Headings Reveal
    const headings = document.querySelectorAll(
      '.section-main-title, .card-title-lg, .spec-title-head'
    );

    headings.forEach((heading, i) => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            id: `heading-reveal-${i}`,
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 6b. Skill Bars & Accents: Hardware-accelerated scaleX(0→1)
    const skillBars = document.querySelectorAll(
      '.skill-bar, .skill-progress-bar, [data-skill-value], .name-divider-bar, .location-accent-bar, .accent-line'
    );

    skillBars.forEach((bar, index) => {
      gsap.fromTo(
        bar,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            id: `skill-bar-${index}`,
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 6c. Staggered entrance for floating skill badges around 3D globe
    const skillSphere = document.getElementById('skillsSphereContainer');
    const skillBadges = document.querySelectorAll('.floating-tech-badge');
    if (skillSphere && skillBadges.length) {
      gsap.fromTo(
        skillBadges,
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.035,
          duration: 0.7,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            id: 'skills-sphere-badges',
            trigger: skillSphere,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  /* ==========================================================================
     7. PINNED HORIZONTAL GALLERY (Projects Section)
     - Desktop: pins section for 250% viewport height and scrubs horizontally
     - Mobile: seamlessly skipped via matchMedia (< 768px)
     ========================================================================== */
  function initPinnedHorizontalGallery() {
    matchMediaInstance.add('(min-width: 768px)', () => {
      const projectsSection = document.getElementById('projects');
      const projectsGrid = document.getElementById('projectsGrid');
      if (!projectsSection || !projectsGrid) return;

      projectsSection.classList.add('anim-horizontal-active');

      const computeDistance = () => {
        const gridWidth = projectsGrid.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(gridWidth - viewportWidth + 140);
      };

      const horizTween = gsap.to(projectsGrid, {
        x: computeDistance,
        ease: 'none',
        scrollTrigger: {
          id: 'projects-pinned-horizontal',
          trigger: projectsSection,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      return () => {
        projectsSection.classList.remove('anim-horizontal-active');
        gsap.set(projectsGrid, { clearProps: 'all' });
        if (horizTween.scrollTrigger) {
          horizTween.scrollTrigger.kill();
        }
      };
    });
  }

  /* ==========================================================================
     8. TEXT / IMAGE PARALLAX & 3D TILT
     ========================================================================== */
  function initParallaxAndTilt() {
    // 8a. Section Titles subtle Parallax
    const largeTitles = document.querySelectorAll(
      '.section-main-title, .hi-hero-title'
    );

    largeTitles.forEach((title, index) => {
      gsap.to(title, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          id: `title-parallax-${index}`,
          trigger: title,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // 8b. Project Mockup Screenshots subtle Parallax
    const projectImages = document.querySelectorAll('.mockup-screenshot');
    projectImages.forEach((img, index) => {
      const card = img.closest('.showcase-project-card') || img;
      gsap.fromTo(
        img,
        { scale: 1.0, yPercent: -4 },
        {
          scale: 1.06,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            id: `project-image-parallax-${index}`,
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    });

    // 8c. 3D Card Tilt with Perspective
    const tiltCards = document.querySelectorAll(
      '.bento-card, .showcase-project-card, .about-spec-box, .contact-card-box'
    );

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;

        const rotX = -normY * 9; // ±4.5 deg
        const rotY = normX * 9;  // ±4.5 deg

        gsap.to(card, {
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 950,
          duration: 0.25,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });
  }

  /* ==========================================================================
     9. CUSTOM CURSOR (Difference Blend Mode)
     ========================================================================== */
  function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let cursor = document.getElementById('animCursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'anim-cursor';
      cursor.id = 'animCursor';
      cursor.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursor);
    }

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    window.addEventListener('mousemove', (e) => {
      cursor.classList.add('is-active');
      xTo(e.clientX);
      yTo(e.clientY);
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-active');
    });

    const interactiveSelectors =
      'a, button, input, textarea, .sub-card, .floating-tech-badge, .bento-card, .showcase-project-card, .copy-badge-btn, .nav-circle-btn, .nav-action-pill';

    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovered'));
    });
  }

  /* ==========================================================================
     10. SMOOTH SCROLL (Lenis Synchronization)
     ========================================================================== */
  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;

    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Smooth navigation for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenisInstance.scrollTo(targetEl, { offset: -70, duration: 1.2 });
          }
        }
      });
    });
  }

  /* ==========================================================================
     11. DEV MODE CONSOLE AUDIT
     ========================================================================== */
  function logRegisteredTriggers() {
    const allTriggers = ScrollTrigger.getAll();
    console.warn(
      `%c[GSAP 3 + ScrollTrigger]%c Registered ${allTriggers.length} Active Triggers:`,
      'color: #9333ea; font-weight: bold; background: #ede9fe; padding: 2px 6px; border-radius: 4px;',
      'color: #3b82f6; font-weight: bold;',
      allTriggers.map((t, i) => ({
        index: i + 1,
        id: t.vars.id || (t.trigger ? (t.trigger.id ? `#${t.trigger.id}` : `.${t.trigger.className.split(' ')[0]}`) : 'anonymous'),
        start: t.start,
        end: t.end,
        pinned: !!t.vars.pin,
        scrub: !!t.vars.scrub
      }))
    );
  }

  /* ==========================================================================
     CLEANUP ON UNLOAD
     ========================================================================== */
  window.addEventListener('beforeunload', () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    if (lenisInstance) lenisInstance.destroy();
  });

  /* ==========================================================================
     ENGINE INITIALIZATION
     ========================================================================== */
  function startEngine() {
    initSmoothScroll();
    initScrollProgressBar();
    initSlidingNavPill();
    initMagneticButtons();
    initCustomCursor();

    initPreloader(() => {
      initHeroAnimations();
      initScrollReveals();
      initPinnedHorizontalGallery();
      initParallaxAndTilt();

      ScrollTrigger.refresh();
      logRegisteredTriggers();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startEngine);
  } else {
    startEngine();
  }
})();
