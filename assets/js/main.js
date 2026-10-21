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
      leadDesc: 'Live e-commerce cart platform with real-time inventory management, atomic PostgreSQL transactions, and secure Razorpay payment gateway integration with HMAC webhook verification.',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'Razorpay', 'SQLAlchemy'],
      github: 'https://github.com/deoreparth700-design/Cart-API',
      live: 'https://cart-api-m4g4.onrender.com/static/index.html',
      image: 'assets/screenshots/cart-api-cart.png',
      alt: 'Cart API live storefront web application with active product catalog and Razorpay checkout'
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

    let width = 600;
    let height = 600;
    let cx = 300;
    let cy = 300;
    let radius = 220;

    function resizeGlobe() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = rect.width || 600;
      height = rect.height || 600;
      cx = width / 2;
      cy = height / 2;
      // Proportioned globe radius: 36% of the container diameter
      radius = Math.min(width, height) * 0.36;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeGlobe();
    window.addEventListener('resize', resizeGlobe, { passive: true });

    // Distribute skills evenly in 3D around sphere using Fibonacci golden spiral
    const N = badges.length;
    const skills3D = [];
    for (let i = 0; i < N; i++) {
      // Inset from extreme poles so badges stay fully readable and orbiting
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

    // Dense surface constellation nodes for glowing globe tech aesthetic
    const nodeCount = 52;
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

    let rotX = -0.15;
    let rotY = 0.35;
    let targetRotX = -0.15;
    let targetRotY = 0.35;
    let autoSpin = 0;
    const autoSpinSpeed = 0.0016; // Elegant slow floating rotation
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
      targetRotY = scrollY * 0.0026;
      targetRotX = -0.15 + Math.sin(scrollY * 0.0014) * 0.25;
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

        velY = dx * 0.0042;
        velX = -dy * 0.0042;
        targetRotY += velY;
        targetRotX += velX;
      } else {
        // Subtle mouse parallax tilt
        const rect = container.getBoundingClientRect();
        const normX = (clientX - rect.left) / rect.width - 0.5;
        const normY = (clientY - rect.top) / rect.height - 0.5;
        targetRotY += normX * 0.0006;
        targetRotX += normY * 0.0005;
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
        const currentSpeed = isHovered ? 0.0004 : autoSpinSpeed;
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

      // 1. Ethereal Ambient Halo around globe circle
      const aura = ctx.createRadialGradient(cx, cy, radius * 0.82, cx, cy, radius * 1.25);
      aura.addColorStop(0, 'rgba(168, 85, 247, 0.22)');
      aura.addColorStop(0.5, 'rgba(236, 72, 153, 0.09)');
      aura.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Translucent Glass Sphere Body
      const sphereGrad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.25, radius * 0.06, cx, cy, radius);
      sphereGrad.addColorStop(0, 'rgba(255, 255, 255, 0.92)');
      sphereGrad.addColorStop(0.35, 'rgba(245, 243, 255, 0.6)');
      sphereGrad.addColorStop(0.7, 'rgba(237, 233, 254, 0.32)');
      sphereGrad.addColorStop(1, 'rgba(224, 231, 255, 0.15)');
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Crisp Double Outer Globe Rim Circle
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.65)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(236, 72, 153, 0.32)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 2.5, 0, Math.PI * 2);
      ctx.stroke();

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      function project3D(x, y, z) {
        // Rotate around Y axis
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // Rotate around X axis
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

      // 4. Draw 3D Latitude Rings with True Depth Shading
      for (let i = 1; i < rings; i++) {
        const isEquator = (i === Math.floor(rings / 2));
        const lat = (i / rings - 0.5) * Math.PI;
        const rLat = radius * Math.cos(lat);
        const yLat = radius * Math.sin(lat);
        const steps = 44;

        for (let j = 0; j < steps; j++) {
          const lon1 = (j / steps) * Math.PI * 2;
          const lon2 = ((j + 1) / steps) * Math.PI * 2;

          const pt1 = project3D(rLat * Math.cos(lon1), yLat, rLat * Math.sin(lon1));
          const pt2 = project3D(rLat * Math.cos(lon2), yLat, rLat * Math.sin(lon2));

          const avgZ = (pt1.z + pt2.z) / 2;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);

          if (avgZ < 0) {
            // Back hemisphere
            ctx.strokeStyle = 'rgba(196, 181, 253, 0.16)';
            ctx.lineWidth = 0.75;
          } else {
            // Front hemisphere: luminous gradient with equator highlight
            const depthFactor = avgZ / radius;
            const alpha = Math.min(0.72, 0.28 + depthFactor * 0.44);
            if (isEquator) {
              ctx.strokeStyle = `rgba(236, 72, 153, ${alpha.toFixed(2)})`;
              ctx.lineWidth = 1.6;
            } else {
              ctx.strokeStyle = `rgba(124, 58, 237, ${alpha.toFixed(2)})`;
              ctx.lineWidth = 1.1;
            }
          }
          ctx.stroke();
        }
      }

      // 5. Draw 3D Longitude Meridians with True Depth Shading
      for (let i = 0; i < meridians; i++) {
        const lon = (i / meridians) * Math.PI;
        const steps = 44;

        for (let j = 0; j < steps; j++) {
          const lat1 = (j / steps) * Math.PI * 2;
          const lat2 = ((j + 1) / steps) * Math.PI * 2;

          const px1 = radius * Math.sin(lat1) * Math.cos(lon);
          const py1 = radius * Math.cos(lat1);
          const pz1 = radius * Math.sin(lat1) * Math.sin(lon);

          const px2 = radius * Math.sin(lat2) * Math.cos(lon);
          const py2 = radius * Math.cos(lat2);
          const pz2 = radius * Math.sin(lat2) * Math.sin(lon);

          const pt1 = project3D(px1, py1, pz1);
          const pt2 = project3D(px2, py2, pz2);

          const avgZ = (pt1.z + pt2.z) / 2;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);

          if (avgZ < 0) {
            ctx.strokeStyle = 'rgba(196, 181, 253, 0.14)';
            ctx.lineWidth = 0.7;
          } else {
            const depthFactor = avgZ / radius;
            const alpha = Math.min(0.68, 0.24 + depthFactor * 0.42);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha.toFixed(2)})`;
            ctx.lineWidth = 1.0;
          }
          ctx.stroke();
        }
      }

      // 6. Draw Surface Constellation Coordinate Nodes
      for (let i = 0; i < wireframeNodes.length; i++) {
        const n = wireframeNodes[i];
        const pt = project3D(n.nx * radius, n.ny * radius, n.nz * radius);
        const depth = (pt.z + radius) / (radius * 2);
        const clampedDepth = Math.max(0, Math.min(1, depth));

        if (pt.z > 0) {
          // Front glowing node
          ctx.fillStyle = `rgba(124, 58, 237, ${(clampedDepth * 0.85).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(1.8, 3.2 * clampedDepth), 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(236, 72, 153, ${(clampedDepth * 0.45).toFixed(2)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(3.2, 5.5 * clampedDepth), 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Back faint node
          ctx.fillStyle = 'rgba(196, 181, 253, 0.18)';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 7. Update 3D Positions & Anchor Beacons of Floating Skill Badges
      // Badges orbit directly around the surface of the globe circle
      const orbitRadius = radius * 1.07;
      for (let i = 0; i < skills3D.length; i++) {
        const s = skills3D[i];
        const pt = project3D(s.nx * orbitRadius, s.ny * orbitRadius, s.nz * orbitRadius);

        const depth = (pt.z + radius) / (radius * 2);
        const clampedDepth = Math.max(0, Math.min(1, depth));

        // Draw glowing surface beacon on the globe circle beneath the badge
        if (clampedDepth > 0.38) {
          ctx.fillStyle = `rgba(168, 85, 247, ${(clampedDepth * 0.75).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(2.2, 4.2 * clampedDepth), 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(236, 72, 153, ${(clampedDepth * 0.5).toFixed(2)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(4.5, 7.5 * clampedDepth), 0, Math.PI * 2);
          ctx.stroke();
        }

        // Perspective depth and visibility calculations
        const badgeScale = Math.max(0.72, Math.min(1.12, pt.scale * 0.95));
        const opacity = Math.max(0.28, Math.min(1, 0.28 + 0.72 * Math.pow(clampedDepth, 1.2)));
        const zIndex = Math.round(clampedDepth * 100);

        s.el.style.transform = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${badgeScale.toFixed(3)})`;
        s.el.style.opacity = opacity.toFixed(3);
        s.el.style.zIndex = zIndex;

        // Front-facing badges are clickable, back-facing pass pointer events
        if (clampedDepth > 0.35) {
          s.el.style.pointerEvents = 'auto';
        } else {
          s.el.style.pointerEvents = 'none';
        }
      }

      requestAnimationFrame(render3DGlobe);
    }

    requestAnimationFrame(render3DGlobe);
  }

  initSkillsGlobe();
});

