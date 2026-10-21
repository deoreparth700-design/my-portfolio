/**
 * Parth Deore — Portfolio Client Engine
 * Pastel Lavender Glassmorphism Client Engine
 * Features:
 * - CartAPI live demo integration
 * - Pop-up scroll-triggered reveal animations
 * - Interactive mouse spotlight glow & focus
 * - Real-time 3D wireframe globe that smoothly revolves on scroll
 * - Active ScrollSpy navigation
 * - Modal preview lightbox & toast system
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     PROJECT DATA (Screenshot 39 layout)
     ========================================== */
  const projects = [
    {
      id: 'cart-api',
      num: '01',
      type: 'BACKEND REST API',
      title: 'Cart API',
      colorClass: 'frame-amber',
      leadDesc: 'High-performance shopping cart REST API with JWT authentication, atomic inventory transactions, and Razorpay webhook verification with idempotency protection.',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'Razorpay', 'SQLAlchemy'],
      github: 'https://github.com/deoreparth700-design/Cart-API',
      live: 'https://cart-api-m4g4.onrender.com/static/index.html',
      image: 'assets/screenshots/cart-api-docs.png',
      alt: 'Cart API interactive OpenAPI Swagger documentation'
    },
    {
      id: 'auth-service',
      num: '02',
      type: 'BACKEND SERVICE',
      title: 'Authentication Service',
      colorClass: 'frame-green',
      leadDesc: 'Production-ready authentication API with JWT access/refresh token rotation, bcrypt hashing, sliding session expiration, and rate limiting.',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'Bcrypt', 'Render'],
      github: 'https://github.com/deoreparth700-design/auth-service',
      live: 'https://auth-service-17bm.onrender.com/',
      image: 'assets/screenshots/auth-service.png',
      alt: 'Authentication Service sign-in web portal'
    },
    {
      id: 'soet-connect',
      num: '03',
      type: 'FULL-STACK PLATFORM',
      title: 'SOET Connect',
      colorClass: 'frame-blue',
      leadDesc: 'Comprehensive alumni networking and career platform for SOET. Designed with end-to-end UML, DFDs, and relational ER modeling prior to implementation.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
      github: 'https://github.com/rohan26-bit/SOET-Connect',
      live: 'https://soet-connect-ut5i.vercel.app/',
      image: 'assets/screenshots/soet-connect.png',
      alt: 'SOET Connect alumni network portal landing interface'
    },
    {
      id: 'blog-api',
      num: '04',
      type: 'BACKEND REST API & FEED',
      title: 'Blog Platform API',
      colorClass: 'frame-purple',
      leadDesc: 'RESTful backend API powering article publishing with Redis response caching, Neon PostgreSQL database, JWT authentication, and automated Pytest test coverage.',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Pytest', 'Render'],
      github: 'https://github.com/deoreparth700-design/blog-platform-api',
      live: 'https://blog-platform-api-db7a.onrender.com/app',
      image: 'assets/screenshots/blog-platform-api.jpg',
      alt: 'Blog Platform API live article feed web interface'
    },
    {
      id: 'blockchain-exam',
      num: '05',
      type: 'FULL-STACK CAPSTONE',
      title: 'Blockchain Secure Examination System',
      colorClass: 'frame-teal',
      leadDesc: 'MGM University final year examination platform ensuring data integrity and tamper-evidence through cryptographic blockchain verification and automated evaluation.',
      tags: ['Python', 'Flask', 'PostgreSQL', 'Blockchain', 'Vercel'],
      github: 'https://github.com/deoreparth700-design/Blockchain-Based-Secure-Online-Examination-System',
      live: 'https://blockchain-based-secure-online-exam.vercel.app/',
      image: 'assets/screenshots/blockchain-exam.png',
      alt: 'MGM University blockchain-based examination system portal'
    }
  ];

  const grid = document.getElementById('projectsGrid');

  function renderProjects() {
    if (!grid) return;
    grid.innerHTML = '';

    projects.forEach((p, idx) => {
      const card = document.createElement('article');
      card.className = 'showcase-project-card reveal-pop';
      card.dataset.id = p.id;
      card.style.transitionDelay = `${(idx % 2) * 0.12}s`;

      const liveBtnHtml = p.live 
        ? `<a href="${p.live}" target="_blank" rel="noopener" class="project-live-badge-btn" aria-label="Visit live demo">
             <span>Live ↗</span>
           </a>`
        : '';

      const tagsHtml = p.tags.map(t => `<span class="tech-tag-pill">${t}</span>`).join('');

      card.innerHTML = `
        <header class="project-card-header">
          <div class="project-meta-eyebrow">
            <span class="eyebrow-num">${p.num}</span>
            <span class="eyebrow-line"></span>
            <span class="eyebrow-cat">${p.type}</span>
          </div>
          <div class="project-title-action-row">
            <h3 class="project-showcase-title">${p.title}</h3>
            <div class="project-header-actions">
              <a href="${p.github}" target="_blank" rel="noopener" class="project-gradient-btn" aria-label="View source on GitHub">
                <span class="btn-gradient-overlay"></span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <span class="btn-label">GitHub ↗</span>
              </a>
              ${liveBtnHtml}
            </div>
          </div>
        </header>

        <div class="project-colored-frame interactive-spotlight ${p.colorClass}" data-id="${p.id}" title="Click to inspect high-resolution preview">
          <div class="frame-inner-content">
            <p class="frame-lead-desc">${p.leadDesc}</p>
            <div class="mockup-stage-wrap">
              <div class="mockup-window">
                <div class="mockup-header-dots">
                  <span class="dot-red"></span>
                  <span class="dot-yellow"></span>
                  <span class="dot-green"></span>
                </div>
                <div class="mockup-img-container">
                  <img src="${p.image}" alt="${p.alt}" class="mockup-screenshot" loading="eager">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="project-card-footer">
          <div class="project-pills-row">
            ${tagsHtml}
          </div>
          <button type="button" class="inspect-pill-btn inspect-btn-trigger" data-id="${p.id}">
            Inspect Details 🔍
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

    // Attach click listeners for preview inspection
    document.querySelectorAll('.project-colored-frame, .inspect-btn-trigger').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id || el.closest('.showcase-project-card')?.dataset.id;
        if (id) openProjectModal(id);
      });
    });
  }

  renderProjects();

  /* ==========================================
     LIGHTBOX MODAL PREVIEW
     ========================================== */
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const modalGhBtn = document.getElementById('modalGhBtn');
  const modalLiveBtn = document.getElementById('modalLiveBtn');
  const modalClose = document.getElementById('modalClose');

  function openProjectModal(id) {
    const p = projects.find(item => item.id === id);
    if (!p || !modal) return;

    modalImg.src = p.image;
    modalImg.alt = p.alt;
    modalTitle.textContent = p.title;
    modalCategory.textContent = p.type;
    modalDesc.textContent = p.leadDesc;

    modalTags.innerHTML = p.tags.map(t => `<span class="tech-tag-pill">${t}</span>`).join('');
    modalGhBtn.href = p.github;

    if (p.live) {
      modalLiveBtn.style.display = 'inline-flex';
      modalLiveBtn.href = p.live;
    } else {
      modalLiveBtn.style.display = 'none';
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /* ==========================================
     COPY EMAIL & TOAST NOTIFICATION
     ========================================== */
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  window.copyEmail = function() {
    const email = 'deoreparth700@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('✓ Email copied to clipboard: ' + email);
    }).catch(() => {
      showToast('Email: ' + email);
    });
  };

  /* ==========================================
     CONTACT FORM
     ========================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName')?.value || '';
      const email = document.getElementById('formEmail')?.value || '';
      const msg = document.getElementById('formMessage')?.value || '';

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

      showToast('Opening your email client...');
      window.location.href = `mailto:deoreparth700@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* ==========================================
     ACTIVE NAVIGATION SCROLLSPY
     ========================================== */
  const navLinks = document.querySelectorAll('.pill-nav-link');
  const sections = ['hero', 'about', 'projects', 'skills', 'contact'].map(id => document.getElementById(id)).filter(Boolean);

  window.addEventListener('scroll', () => {
    let current = 'hero';
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        current = sec.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });

  /* ==========================================
     MOBILE NAVIGATION
     ========================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const pillNav = document.getElementById('pillNav');

  if (mobileToggle && pillNav) {
    mobileToggle.addEventListener('click', () => {
      pillNav.classList.toggle('open');
    });

    pillNav.querySelectorAll('.pill-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        pillNav.classList.remove('open');
      });
    });
  }

  /* ==========================================
     SCROLL-TRIGGERED POP-UP ANIMATIONS
     ========================================== */
  function initScrollReveal() {
    const revealTargets = document.querySelectorAll('.reveal-pop');
    if (!revealTargets.length) return;

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealTargets.forEach(el => observer.observe(el));
  }

  initScrollReveal();

  /* ==========================================
     MOUSE HOVER SPOTLIGHT & FOCUS EFFECT
     ========================================== */
  function initMouseSpotlights() {
    const spotlightCards = document.querySelectorAll('.bento-card, .portrait-photo-card, .location-card, .project-colored-frame, .tech-icon-card, .contact-card-box, .about-spec-box');

    spotlightCards.forEach(card => {
      card.classList.add('interactive-spotlight');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    });
  }

  initMouseSpotlights();

  /* ==========================================
     HERO HI MEMOJI STICKER INTERACTIVITY (Screenshot 37)
     ========================================== */
  function initHeroSticker() {
    const frame = document.getElementById('hiStickerFrame');
    const sticker = document.getElementById('hiSticker');
    if (!frame || !sticker) return;

    // Interactive 3D Parallax Tilt
    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = -normY * 20;
      const tiltY = normX * 20;
      sticker.style.transform = `perspective(600px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    frame.addEventListener('mouseleave', () => {
      sticker.style.transform = '';
    });

    // Delightful spring bounce on click
    frame.addEventListener('click', () => {
      sticker.style.transform = 'scale(0.88)';
      setTimeout(() => {
        sticker.style.transform = 'scale(1.14) rotate(4deg)';
        setTimeout(() => {
          sticker.style.transform = '';
        }, 220);
      }, 120);
    });
  }

  initHeroSticker();

  /* ==========================================
     3D FLOATING SKILLS GLOBE ENGINE (Screenshot 40)
     Skills float in 3D on the surface of the globe slowly
     with drag-to-spin, mouse tilt, and scroll reactivity
     ========================================== */
  function initSkillsGlobe() {
    const container = document.getElementById('skillsSphereContainer');
    const canvas = document.getElementById('skillsGlobeCanvas');
    const orbitLayer = document.getElementById('skillsOrbitLayer');
    if (!container || !canvas || !orbitLayer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const badges = Array.from(orbitLayer.querySelectorAll('.floating-tech-badge'));
    if (!badges.length) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let cx = width / 2;
    let cy = height / 2;
    let radius = Math.min(220, width * 0.28);

    function resizeGlobe() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      cx = width / 2;
      cy = height / 2;
      radius = Math.max(125, Math.min(225, width * 0.28));

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeGlobe();
    window.addEventListener('resize', resizeGlobe, { passive: true });

    // Distribute skills in 3D around sphere using Fibonacci golden spiral
    const N = badges.length;
    const skills3D = [];
    for (let i = 0; i < N; i++) {
      // Inset from extreme poles so badges stay fully readable
      const y = 1 - ((i + 0.6) / (N + 0.2)) * 2;
      const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * 2.3999632;
      skills3D.push({
        el: badges[i],
        nx: Math.cos(phi) * rAtY,
        ny: y,
        nz: Math.sin(phi) * rAtY
      });
    }

    // Additional wireframe coordinate nodes for atmospheric celestial look
    const nodeCount = 36;
    const wireframeNodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * 2.3999632;
      wireframeNodes.push({
        nx: Math.cos(phi) * rAtY,
        ny: y,
        nz: Math.sin(phi) * rAtY
      });
    }

    let rotX = -0.16;
    let rotY = 0.35;
    let targetRotX = -0.16;
    let targetRotY = 0.35;
    let autoSpin = 0;
    let autoSpinSpeed = 0.0018; // Slow floating rotation
    let isHovered = false;

    // Slow down rotation when reading or hovering over a badge
    badges.forEach(badge => {
      badge.addEventListener('mouseenter', () => { isHovered = true; });
      badge.addEventListener('mouseleave', () => { isHovered = false; });
      badge.addEventListener('focus', () => { isHovered = true; });
      badge.addEventListener('blur', () => { isHovered = false; });
    });

    // Scroll listener rotates the globe smoothly
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      targetRotY = scrollY * 0.0028;
      targetRotX = -0.16 + Math.sin(scrollY * 0.0014) * 0.28;
    }, { passive: true });

    // Interactive Drag to Spin (Mouse & Touch)
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let velX = 0;
    let velY = 0;

    function onPointerDown(e) {
      if (e.target.closest('.floating-tech-badge')) return;
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;
      velX = 0;
      velY = 0;
    }

    function onPointerMove(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const dx = clientX - startX;
        const dy = clientY - startY;
        startX = clientX;
        startY = clientY;

        velY = dx * 0.0045;
        velX = -dy * 0.0045;
        targetRotY += velY;
        targetRotX += velX;
      } else {
        // Faint mouse parallax tilt
        const rect = container.getBoundingClientRect();
        const normX = (clientX - rect.left) / rect.width - 0.5;
        const normY = (clientY - rect.top) / rect.height - 0.5;
        targetRotY += normX * 0.0008;
        targetRotX += normY * 0.0006;
      }
    }

    function onPointerUp() {
      isDragging = false;
    }

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    const rings = 8;
    const meridians = 12;

    function render3DGlobe() {
      // Apply momentum decay or slow continuous auto-floating
      if (!isDragging) {
        const currentSpeed = isHovered ? 0.0005 : autoSpinSpeed;
        autoSpin += currentSpeed;
        velX *= 0.92;
        velY *= 0.92;
        targetRotX += velX;
        targetRotY += velY;
      }

      // Smooth lerp damping
      rotY += (targetRotY + autoSpin - rotY) * 0.08;
      rotX += (targetRotX - rotX) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Atmospheric radial glow behind the globe
      const glow = ctx.createRadialGradient(cx, cy, 20, cx, cy, radius * 1.18);
      glow.addColorStop(0, 'rgba(124, 58, 237, 0.16)');
      glow.addColorStop(0.5, 'rgba(168, 85, 247, 0.06)');
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Outer rim circle
      ctx.strokeStyle = 'rgba(196, 181, 253, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner faint reference orbit circle
      ctx.strokeStyle = 'rgba(196, 181, 253, 0.18)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.62, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      function project3D(x, y, z) {
        // Rotate Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const fov = 520;
        const scale = fov / (fov - z2);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale: scale
        };
      }

      // Draw 3D Latitude Rings
      for (let i = 1; i < rings; i++) {
        const lat = (i / rings - 0.5) * Math.PI;
        const rLat = radius * Math.cos(lat);
        const yLat = radius * Math.sin(lat);
        const steps = 44;

        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= steps; j++) {
          const lon = (j / steps) * Math.PI * 2;
          const px = rLat * Math.cos(lon);
          const pz = rLat * Math.sin(lon);
          const pt = project3D(px, yLat, pz);

          if (first) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.strokeStyle = 'rgba(196, 181, 253, 0.28)';
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      // Draw 3D Longitude Meridians
      for (let i = 0; i < meridians; i++) {
        const lon = (i / meridians) * Math.PI;
        const steps = 44;

        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= steps; j++) {
          const lat = (j / steps) * Math.PI * 2;
          const px = radius * Math.sin(lat) * Math.cos(lon);
          const py = radius * Math.cos(lat);
          const pz = radius * Math.sin(lat) * Math.sin(lon);
          const pt = project3D(px, py, pz);

          if (first) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.strokeStyle = 'rgba(196, 181, 253, 0.28)';
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      // Draw Celestial Coordinate Nodes
      for (let i = 0; i < wireframeNodes.length; i++) {
        const n = wireframeNodes[i];
        const pt = project3D(n.nx * radius, n.ny * radius, n.nz * radius);
        const depth = (pt.z + radius) / (radius * 2);
        const alpha = Math.max(0.12, Math.min(0.85, depth * 0.9));

        ctx.fillStyle = `rgba(124, 58, 237, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(1.4, 2.6 * depth), 0, Math.PI * 2);
        ctx.fill();
      }

      // Update 3D Positions of the Floating Skill Badges
      // Badges float on the outer surface (radius * 1.05)
      const orbitRadius = radius * 1.04;
      for (let i = 0; i < skills3D.length; i++) {
        const s = skills3D[i];
        const pt = project3D(s.nx * orbitRadius, s.ny * orbitRadius, s.nz * orbitRadius);

        // Draw glowing anchor point on the canvas at skill's location
        const depth = (pt.z + radius) / (radius * 2);
        const clampedDepth = Math.max(0, Math.min(1, depth));

        if (clampedDepth > 0.45) {
          ctx.fillStyle = `rgba(168, 85, 247, ${(clampedDepth * 0.7).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(2, 4 * clampedDepth), 0, Math.PI * 2);
          ctx.fill();
        }

        // Perspective depth calculations
        const badgeScale = Math.max(0.68, Math.min(1.16, pt.scale * 0.94));
        const opacity = Math.max(0.25, Math.min(1, 0.25 + 0.75 * Math.pow(clampedDepth, 1.25)));
        const zIndex = Math.round(clampedDepth * 100);

        s.el.style.transform = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${badgeScale.toFixed(3)})`;
        s.el.style.opacity = opacity.toFixed(3);
        s.el.style.zIndex = zIndex;

        // Ensure back-facing badges don't intercept front badges
        if (clampedDepth < 0.28) {
          s.el.style.pointerEvents = 'none';
        } else {
          s.el.style.pointerEvents = 'auto';
        }
      }

      requestAnimationFrame(render3DGlobe);
    }

    requestAnimationFrame(render3DGlobe);
  }

  initSkillsGlobe();
});

