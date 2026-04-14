/* header.js — injects shared header, mobile nav & footer into every page */
(function () {
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  const links = [
    { href: 'index.html',       label: 'Home' },
    { href: 'about.html',       label: 'About Us' },
    { href: 'services.html',    label: 'Services' },
    { href: 'mechanical.html',  label: 'Mechanical' },
    { href: 'civil.html',       label: 'Civil' },
    { href: 'electrical.html',  label: 'Electrical' },
    { href: 'compit.html',      label: 'Comp & IT' },
    { href: 'contact.html',     label: 'Contact Us' },
  ];

  const isRoot = !location.pathname.includes('/pages/');

  function buildLinks(baseClass) {
    return links.map(l => {
      const href = isRoot ? l.href : l.href;
      const active = currentPage === l.href.split('/').pop() ? 'active' : '';
      return `<a href="${href}" class="${active} ${baseClass}-link">${l.label}</a>`;
    }).join('');
  }

  const logoHref = 'index.html';

  // ── HEADER HTML ──
  document.body.insertAdjacentHTML('afterbegin', `
    <header>
      <a href="${logoHref}" class="logo-area">
        <img src="css/images/logo.png" alt="V3 Software Technology" class="logo-img-real">
        <div class="logo-text">
          <div class="brand">V3 <span>SOFTWARE</span> TECHNOLOGY</div>
          <div class="tagline">ISO 9001:2015 Certified</div>
          <div class="tagline">Transforming Your Design Vision To Reality</div>
        </div>
      </a>

      <nav id="desktop-nav">${buildLinks('desktop')}</nav>

      <button class="hamburger" id="hamburger-btn" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </header>

    <!-- Mobile Drawer -->
    <div class="mobile-nav" id="mobile-nav">
      ${buildLinks('mobile')}
    </div>

    <!-- WhatsApp Float -->
    <a href="https://wa.me/919503666566" target="_blank" class="whatsapp-float" title="Chat on WhatsApp">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
  `);

  // ── FOOTER ──
  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <div style="display:flex;flex-direction:column;gap:6px;">
        <p>© 2026 V3 Software Technology, Pune. All rights reserved.</p>
        <p style="font-size:12px;color:rgba(255,255,255,0.35);">
          Developed by <a href="https://www.techmallconsultancy.com" target="_blank" style="color:var(--cyan);text-decoration:none;font-weight:600;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">Tech Mall Consultancy</a>
        </p>
      </div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;">
        <a href="tel:9503666566">📞 9503666566</a>
        <a href="mailto:info.v3softech@gmail.com">✉️ info.v3softech@gmail.com</a>
        <a href="https://wa.me/919503666566" target="_blank">💬 WhatsApp</a>
      </div>
    </footer>
  `);

  // ── HAMBURGER TOGGLE ──
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ── FADE-UP OBSERVER ──
  setTimeout(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
  }, 100);
})();
