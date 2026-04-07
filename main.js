/* ═══════════════════════════════════════════════════════════
   DUHIA GRAM PANCHAYAT — main.js
   All bugs fixed. Loads after config.js and photos.js.
   ═══════════════════════════════════════════════════════════ */

/* ─── BOOT ───────────────────────────────────────────────── */
// Three.js is loaded as a regular script (no defer) so THREE is
// always available by the time this runs.
document.addEventListener('DOMContentLoaded', function () {
  renderDynamicContent();   // build cards from CONFIG
  applyLang('hi');          // set default language AFTER cards exist
  initCursor();
  initParticles();
  init3DVillage();
  initScrollReveal();
  initCounters();
  initAIChat();
  updateResolvedCount();
});

/* ─── LANGUAGE ───────────────────────────────────────────── */
var currentLang = 'hi';

function setLang(lang, btn) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(function (b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  applyLang(lang);
}

function applyLang(lang) {
  document.querySelectorAll('[data-hi]').forEach(function (el) {
    var val = el.getAttribute('data-' + lang);
    if (val !== null) el.innerHTML = val;
  });
}

/* ─── RENDER DYNAMIC CONTENT FROM CONFIG ────────────────── */
function renderDynamicContent() {
  // Photos
  if (typeof PHOTOS !== 'undefined') {
    document.querySelectorAll('.photo-pradhan').forEach(function (img) { img.src = PHOTOS.pradhan; });
    document.querySelectorAll('.photo-sahayak').forEach(function (img) { img.src = PHOTOS.sahayak; });
  }

  // Announcements
  var announceBag = document.getElementById('announce-list');
  if (announceBag && CONFIG.announcements) {
    announceBag.innerHTML = CONFIG.announcements.map(function (a) {
      return '<div class="announce-item reveal">' +
        '<div class="announce-icon">' + a.icon + '</div>' +
        '<div class="announce-text">' +
          '<h3 data-hi="' + a.titleHi + '" data-en="' + a.titleEn + '">' + a.titleHi + '</h3>' +
          '<p data-hi="' + a.textHi + '" data-en="' + a.textEn + '">' + a.textHi + '</p>' +
          '<div class="announce-date">📅 ' + a.date + '</div>' +
        '</div></div>';
    }).join('');
  }

  // Schemes
  var schemeBag = document.getElementById('schemes-grid');
  if (schemeBag && CONFIG.schemes) {
    schemeBag.innerHTML = CONFIG.schemes.map(function (s) {
      return '<div class="scheme-card reveal" onclick="window.open(\'' + s.url + '\',\'_blank\')">' +
        '<div class="scheme-header" style="background:linear-gradient(135deg,' + s.color + ')">' +
          '<i class="' + s.icon + '"></i>' +
          '<h3 data-hi="' + s.nameHi + '" data-en="' + s.nameEn + '">' + s.nameHi + '</h3>' +
        '</div>' +
        '<div class="scheme-body">' +
          '<p data-hi="' + s.descHi + '" data-en="' + s.descEn + '">' + s.descHi + '</p>' +
          '<a href="' + s.url + '" target="_blank" class="scheme-link" onclick="event.stopPropagation()">' +
            '<i class="fas fa-external-link-alt"></i> ' +
            '<span data-hi="अधिक जानें" data-en="Learn More">अधिक जानें</span>' +
          '</a>' +
        '</div></div>';
    }).join('');
  }

  // Re-run scroll reveal for new elements
  initScrollReveal();
}

/* ─── CUSTOM CURSOR ──────────────────────────────────────── */
function initCursor() {
  var dot  = document.getElementById('cursor');
  var ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Only on devices that support hover (not touch-only phones)
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    dot.style.display  = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  var mx = -200, my = -200; // mouse position
  var rx = -200, ry = -200; // ring position (lags behind = physics feel)

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    dot.style.opacity  = '1';
    ring.style.opacity = '0.65';
  });

  // Click effect
  document.addEventListener('mousedown', function () { document.body.classList.add('cursor-click'); });
  document.addEventListener('mouseup',   function () { document.body.classList.remove('cursor-click'); });

  // Spring physics loop for ring
  (function loop() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = Math.round(rx) + 'px';
    ring.style.top  = Math.round(ry) + 'px';
    requestAnimationFrame(loop);
  })();

  // Grow cursor when hovering buttons/cards
  var HOVER_SEL = 'a, button, .service-card, .scheme-card, .announce-item, .profile-card, .contact-item, .ai-chip, .lang-btn, .ctab, .submit-btn, .action-btn';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(HOVER_SEL)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(HOVER_SEL)) document.body.classList.remove('cursor-hover');
  });
}

/* ─── PARTICLE PHYSICS ───────────────────────────────────── */
function initParticles() {
  var canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H;
  var COLORS = ['#FF6B00', '#D4AF37', '#138808', 'rgba(255,255,255,0.7)'];

  function resize() {
    W = canvas.width  = canvas.parentElement.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() { this.init(); }
  Particle.prototype.init = function () {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.vx    = (Math.random() - 0.5) * 0.6;
    this.vy    = (Math.random() - 0.5) * 0.6;
    this.r     = Math.random() * 2.2 + 0.5;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.5 + 0.1;
    this.life  = 1;
    this.decay = Math.random() * 0.003 + 0.001;
  };
  Particle.prototype.update = function (mx, my) {
    var dx = this.x - mx, dy = this.y - my;
    var d  = Math.sqrt(dx * dx + dy * dy);
    if (d < 100 && d > 0) { this.vx += (dx / d) * 0.25; this.vy += (dy / d) * 0.25; }
    this.vx *= 0.985; this.vy *= 0.985;
    this.x += this.vx; this.y += this.vy;
    this.life -= this.decay;
    if (this.life <= 0 || this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) this.init();
  };
  Particle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.life * this.alpha;
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  var count = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 14000));
  var particles = [];
  for (var i = 0; i < count; i++) particles.push(new Particle());

  var mmx = -999, mmy = -999;
  document.addEventListener('mousemove', function (e) { mmx = e.clientX; mmy = e.clientY; });

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update(mmx, mmy);
      particles[i].draw();
      // Draw connections to nearby particles
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.save();
          ctx.globalAlpha = (1 - d / 110) * 0.13;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth   = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
}

/* ─── 3D VILLAGE (Three.js) ──────────────────────────────── */
function init3DVillage() {
  // THREE must be loaded before this runs (no defer on three.js script tag)
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded — 3D village skipped');
    return;
  }
  var canvas = document.getElementById('village-canvas');
  if (!canvas) return;

  var H   = 320;
  var W   = canvas.parentElement.offsetWidth || window.innerWidth;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  var scene  = new THREE.Scene();
  scene.fog  = new THREE.Fog(0x87CEEB, 28, 68);

  var camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 120);
  camera.position.set(0, 7, 20);
  camera.lookAt(0, 2, 0);

  // Ground
  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 80),
    new THREE.MeshLambertMaterial({ color: 0x5DBB5D })
  );
  ground.rotation.x   = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Road
  var road = new THREE.Mesh(
    new THREE.PlaneGeometry(3.5, 60),
    new THREE.MeshLambertMaterial({ color: 0x9E8870 })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.y = 0.01;
  scene.add(road);

  function makeHouse(x, z, wallColor, roofColor, sc) {
    sc = sc || 1;
    var g    = new THREE.Group();
    var body = new THREE.Mesh(
      new THREE.BoxGeometry(2.2 * sc, 2.2 * sc, 2.2 * sc),
      new THREE.MeshLambertMaterial({ color: wallColor })
    );
    body.position.y   = sc * 1.1;
    body.castShadow   = true;
    body.receiveShadow = true;
    g.add(body);
    var roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.7 * sc, 1.4 * sc, 4),
      new THREE.MeshLambertMaterial({ color: roofColor })
    );
    roof.position.y = sc * 2.2 + sc * 0.7;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    g.add(roof);
    var door = new THREE.Mesh(
      new THREE.BoxGeometry(0.4 * sc, 0.7 * sc, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x5D4037 })
    );
    door.position.set(0, 0.35 * sc, sc * 1.1 + 0.02);
    g.add(door);
    g.position.set(x, 0, z);
    return g;
  }

  function makeTree(x, z) {
    var g = new THREE.Group();
    var trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.2, 1.3, 8),
      new THREE.MeshLambertMaterial({ color: 0x5D4037 })
    );
    trunk.position.y = 0.65;
    g.add(trunk);
    [0, 0.55, 1.05].forEach(function (off, i) {
      var leaves = new THREE.Mesh(
        new THREE.SphereGeometry(0.9 - i * 0.14, 8, 6),
        new THREE.MeshLambertMaterial({ color: i === 0 ? 0x2E7D32 : 0x388E3C })
      );
      leaves.position.y = 1.3 + off;
      g.add(leaves);
    });
    g.position.set(x, 0, z);
    return g;
  }

  // Panchayat Bhavan (biggest, saffron roof)
  scene.add(makeHouse(0, -9, 0xFFFDE7, 0xFF6B00, 1.5));

  // Village houses
  [[-6, 0, 0xFFEB3B, 0xE53935, 1],
   [-6, -4, 0x90CAF9, 0x5C6BC0, 0.9],
   [-6, 4, 0xFFCDD2, 0x8D6E63, 0.95],
   [6, 0, 0xC8E6C9, 0x388E3C, 1.05],
   [6, -4, 0xFFE0B2, 0x795548, 0.88],
   [6, 4, 0xE1BEE7, 0x7B1FA2, 0.92]
  ].forEach(function (d) { scene.add(makeHouse(d[0], d[1], d[2], d[3], d[4])); });

  // Trees
  [-3.8, 3.8].forEach(function (x) {
    for (var z = -10; z <= 8; z += 3.8) scene.add(makeTree(x, z));
  });

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  scene.add(new THREE.HemisphereLight(0x87CEEB, 0x5DBB5D, 0.3));
  var sun = new THREE.DirectionalLight(0xFFF4E0, 1.2);
  sun.position.set(12, 22, 10);
  sun.castShadow = true;
  scene.add(sun);

  var t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.007;
    camera.position.x = Math.sin(t) * 6;
    camera.position.z = 20 + Math.cos(t * 0.5) * 2;
    camera.lookAt(0, 2, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', function () {
    var nw = canvas.parentElement.offsetWidth || window.innerWidth;
    camera.aspect = nw / H;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, H);
  });
}

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
function initScrollReveal() {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) { obs.observe(el); });
}

/* ─── COUNTER ANIMATION ──────────────────────────────────── */
function initCounters() {
  var statsBar = document.querySelector('.stats-bar');
  if (!statsBar) return;
  var done = false;
  var obs = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting || done) return;
    done = true;
    document.querySelectorAll('.stat-counter').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var step   = Math.max(1, Math.ceil(target / 60));
      var cur    = 0;
      var iv = setInterval(function () {
        cur = Math.min(cur + step, target);
        el.textContent = cur.toLocaleString('hi-IN');
        if (cur >= target) clearInterval(iv);
      }, 22);
    });
  }, { threshold: 0.3 });
  obs.observe(statsBar);
}

/* ─── TABS ───────────────────────────────────────────────── */
function showTab(tabId, btn) {
  document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelectorAll('.ctab').forEach(function (b) { b.classList.remove('active'); });
  var panel = document.getElementById('tab-' + tabId);
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');
}

/* ─── COMPLAINTS DATA ────────────────────────────────────── */
var STORAGE_KEY = 'duhia_v4';

function getComplaints()     { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
function saveComplaints(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

function genId() {
  var arr = getComplaints();
  return 'DUH-' + new Date().getFullYear() + '-' + String(arr.length + 1).padStart(3, '0');
}

function updateResolvedCount() {
  var el = document.getElementById('resolved-count');
  if (!el) return;
  el.textContent = getComplaints().filter(function (c) { return c.status === 'resolved'; }).length;
}

/* ─── FORM VALIDATION ────────────────────────────────────── */
function markField(id, ok, msg) {
  var input = document.getElementById(id);
  if (!input) return ok;
  var group = input.closest('.form-group');
  var err   = group && group.querySelector('.field-error');
  if (group) group.classList.toggle('has-error', !ok);
  if (err)   { err.textContent = msg; err.classList.toggle('show', !ok); }
  return ok;
}

/* ─── SUBMIT COMPLAINT ───────────────────────────────────── */
function submitComplaint() {
  var name   = (document.getElementById('c-name')   || {}).value || '';
  var mobile = (document.getElementById('c-mobile') || {}).value || '';
  var type   = (document.getElementById('c-type')   || {}).value || '';
  var desc   = (document.getElementById('c-desc')   || {}).value || '';
  var loc    = (document.getElementById('c-location')|| {}).value || '';

  var isHi = currentLang === 'hi';
  var ok = true;
  ok = markField('c-name',   name.trim().length >= 2,    isHi ? 'नाम कम से कम 2 अक्षर'      : 'Name too short') && ok;
  ok = markField('c-mobile', /^\d{10}$/.test(mobile.trim()), isHi ? '10 अंक का नंबर दर्ज करें' : 'Enter 10-digit number') && ok;
  ok = markField('c-type',   type !== '',                isHi ? 'समस्या का प्रकार चुनें'    : 'Select problem type') && ok;
  ok = markField('c-desc',   desc.trim().length >= 10,   isHi ? 'कम से कम 10 अक्षर लिखें'   : 'Write at least 10 chars') && ok;

  if (!ok) { showToast(isHi ? 'सभी जानकारी सही भरें' : 'Fill all fields correctly', true); return; }

  var typeMap = { road: 'सड़क/गड्ढा', water: 'पानी/हैंडपम्प', electricity: 'बिजली', drainage: 'नाली/सफाई', scheme: 'योजना', other: 'अन्य' };
  var id = genId();
  var arr = getComplaints();
  arr.push({
    id:      id,
    name:    name.trim(),
    mobile:  mobile.trim(),
    type:    typeMap[type] || type,
    desc:    desc.trim(),
    loc:     loc.trim(),
    status:  'pending',
    date:    new Date().toLocaleDateString('hi-IN'),
    ts:      Date.now(),
  });
  saveComplaints(arr);
  updateResolvedCount();

  // Clear form
  ['c-name', 'c-mobile', 'c-desc', 'c-location'].forEach(function (fid) {
    var el = document.getElementById(fid);
    if (el) el.value = '';
  });
  var typeEl = document.getElementById('c-type');
  if (typeEl) typeEl.value = '';
  document.querySelectorAll('.form-group.has-error').forEach(function (g) {
    g.classList.remove('has-error');
    var err = g.querySelector('.field-error');
    if (err) err.classList.remove('show');
  });

  showToast((isHi ? '✅ शिकायत दर्ज! नंबर: ' : '✅ Filed! ID: ') + id);
}

/* ─── TRACK COMPLAINT ────────────────────────────────────── */
function trackComplaint() {
  var idEl = document.getElementById('track-id');
  var res  = document.getElementById('track-result');
  if (!res) return;

  var id = idEl ? idEl.value.trim().toUpperCase() : '';
  if (!id) { showToast(currentLang === 'hi' ? 'शिकायत नंबर दर्ज करें' : 'Enter complaint ID', true); return; }

  var arr = getComplaints();
  var c = arr.find(function (x) { return x.id === id; });

  var statusLabel = { pending: 'लंबित', 'in-progress': 'प्रगति में', resolved: 'हल हो गई' };
  var statusClass = { pending: 'status-pending', 'in-progress': 'status-progress', resolved: 'status-resolved' };

  if (c) {
    res.className = 'track-result found';
    res.innerHTML =
      '<h3 style="margin-bottom:10px">📋 ' + c.id + '</h3>' +
      '<p><b>नाम:</b> ' + c.name + '</p>' +
      '<p><b>प्रकार:</b> ' + c.type + '</p>' +
      '<p><b>विवरण:</b> ' + c.desc + '</p>' +
      '<p><b>स्थान:</b> ' + (c.loc || '—') + '</p>' +
      '<p style="margin-top:10px"><b>स्थिति:</b> ' +
        '<span class="status-badge ' + (statusClass[c.status] || 'status-pending') + '">' +
          '<span class="status-dot"></span>' + (statusLabel[c.status] || c.status) +
        '</span></p>' +
      '<p><b>दिनांक:</b> ' + c.date + '</p>';
  } else {
    res.className = 'track-result not-found';
    res.innerHTML = '<p>❌ ' + (currentLang === 'hi' ? 'शिकायत नहीं मिली। सही नंबर दर्ज करें।' : 'Complaint not found.') + '</p>';
  }
}

/* ─── PRADHAN PORTAL ─────────────────────────────────────── */
function openPortal() {
  var portal = document.getElementById('pradhan-portal');
  if (!portal) return;
  portal.classList.add('open');
  document.getElementById('portal-login').style.display = 'block';
  document.getElementById('portal-dash').style.display  = 'none';
  setTimeout(function () { document.getElementById('portal-pass').focus(); }, 100);
}
function closePortal() {
  var portal = document.getElementById('pradhan-portal');
  if (portal) portal.classList.remove('open');
  var pass = document.getElementById('portal-pass');
  if (pass) pass.value = '';
}
function loginPortal() {
  var pass = document.getElementById('portal-pass');
  if (!pass) return;
  if (pass.value === CONFIG.portalPassword) {
    document.getElementById('portal-login').style.display = 'none';
    document.getElementById('portal-dash').style.display  = 'block';
    renderPortalDash();
  } else {
    showToast(currentLang === 'hi' ? 'गलत पासवर्ड!' : 'Wrong password!', true);
    pass.value = '';
    pass.focus();
  }
}

function renderPortalDash() {
  var arr      = getComplaints();
  var pending  = arr.filter(function (c) { return c.status === 'pending'; }).length;
  var progress = arr.filter(function (c) { return c.status === 'in-progress'; }).length;
  var resolved = arr.filter(function (c) { return c.status === 'resolved'; }).length;

  document.getElementById('dash-pending').textContent  = pending;
  document.getElementById('dash-progress').textContent = progress;
  document.getElementById('dash-resolved').textContent = resolved;

  var tbody = document.getElementById('complaints-tbody');
  if (!tbody) return;
  if (!arr.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#aaa;padding:28px">कोई शिकायत नहीं</td></tr>';
    return;
  }
  var statusMap = {
    'pending':     '<span class="status-badge status-pending"><span class="status-dot"></span>लंबित</span>',
    'in-progress': '<span class="status-badge status-progress"><span class="status-dot"></span>प्रगति में</span>',
    'resolved':    '<span class="status-badge status-resolved"><span class="status-dot"></span>हल हो गई</span>',
  };
  tbody.innerHTML = arr.map(function (c, i) {
    return '<tr>' +
      '<td><b style="color:var(--blue)">' + c.id + '</b></td>' +
      '<td>' + c.name + '</td>' +
      '<td><a href="tel:' + c.mobile + '" style="color:var(--blue-lt);font-weight:700">' + c.mobile + '</a></td>' +
      '<td>' + c.type + '</td>' +
      '<td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="' + c.desc + '">' + c.desc + '</td>' +
      '<td>' + (statusMap[c.status] || c.status) + '</td>' +
      '<td style="white-space:nowrap">' +
        '<button class="action-btn btn-progress" onclick="updateStatus(' + i + ',\'in-progress\')">प्रगति</button> ' +
        '<button class="action-btn btn-resolve"  onclick="updateStatus(' + i + ',\'resolved\')">हल करें</button>' +
      '</td></tr>';
  }).join('');
}

function updateStatus(i, s) {
  var arr = getComplaints();
  if (!arr[i]) return;
  arr[i].status = s;
  saveComplaints(arr);
  updateResolvedCount();
  renderPortalDash();
  showToast(currentLang === 'hi' ? '✅ स्थिति अपडेट!' : '✅ Status updated!');
}

function exportCSV() {
  var arr = getComplaints();
  if (!arr.length) { showToast('कोई शिकायत नहीं', true); return; }
  var hdr  = '\uFEFFID,नाम,मोबाइल,प्रकार,विवरण,स्थिति,दिनांक\n';
  var rows = arr.map(function (c) {
    return '"' + c.id + '","' + c.name + '","' + c.mobile + '","' + c.type + '","' + c.desc.replace(/"/g,'""') + '","' + c.status + '","' + c.date + '"';
  }).join('\n');
  var blob = new Blob([hdr + rows], { type: 'text/csv;charset=utf-8;' });
  var a    = document.createElement('a');
  a.href   = URL.createObjectURL(blob);
  a.download = 'duhia_complaints_' + new Date().toISOString().split('T')[0] + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

function clearAllComplaints() {
  if (!confirm('सभी शिकायतें हमेशा के लिए साफ करें?\n(यह वापस नहीं होगा)')) return;
  saveComplaints([]);
  updateResolvedCount();
  renderPortalDash();
  showToast('सब साफ हो गया');
}

// Close portal on backdrop click or Escape key
document.addEventListener('click', function (e) { if (e.target.id === 'pradhan-portal') closePortal(); });
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closePortal();
  if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'portal-pass') loginPortal();
});

/* ─── AI CHAT ─────────────────────────────────────────────── */
var aiHistory = [];

function initAIChat() {
  var input = document.getElementById('ai-input');
  if (!input) return;
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAI(); }
  });
  // Quick-question chips
  document.querySelectorAll('.ai-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var inp = document.getElementById('ai-input');
      if (inp) { inp.value = chip.textContent.trim(); sendAI(); }
    });
  });
}

function sendAI() {
  var input = document.getElementById('ai-input');
  if (!input) return;
  var question = input.value.trim();
  if (!question) return;
  input.value = '';

  addAIMsg(question, 'user');
  var typingEl = addAIMsg(currentLang === 'hi' ? '⏳ सोच रहा हूँ...' : '⏳ Thinking...', 'bot typing');

  var messages = aiHistory.concat([{ role: 'user', content: question }]);

  callAI(messages, CONFIG.aiSystemPrompt)
    .then(function (reply) {
      if (typingEl) {
        typingEl.classList.remove('typing');
        typingEl.textContent = reply;
      }
      aiHistory = messages.concat([{ role: 'assistant', content: reply }]).slice(-12);
    })
    .catch(function (err) {
      console.error('AI error:', err);
      if (typingEl) {
        typingEl.classList.remove('typing');
        typingEl.textContent = currentLang === 'hi'
          ? '⚠️ इंटरनेट जांचें या सीधे बात करें: 📞 ' + CONFIG.pradhan.phone
          : '⚠️ Check internet or call: 📞 ' + CONFIG.pradhan.phone;
      }
    });
}

function callAI(messages, system) {
  var proxy  = CONFIG.chatProxyUrl  || '';
  var apiKey = CONFIG.anthropicApiKey || '';

  if (proxy.trim()) {
    // Production — Netlify serverless function hides the API key
    return fetch(proxy, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages, system: system }),
    }).then(function (r) {
      if (!r.ok) throw new Error('Proxy ' + r.status);
      return r.json();
    }).then(function (d) {
      return (d.content && d.content[0] && d.content[0].text) || d.reply || 'माफ करें, उत्तर नहीं मिला।';
    });
  }

  if (apiKey.trim()) {
    // Local dev only — never expose API key in production HTML
    return fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 600, system: system, messages: messages }),
    }).then(function (r) {
      if (!r.ok) throw new Error('API ' + r.status);
      return r.json();
    }).then(function (d) {
      return d.content && d.content[0] && d.content[0].text;
    });
  }

  // No API configured — helpful offline reply
  return Promise.resolve(
    currentLang === 'hi'
      ? '🙏 AI सहायक अभी उपलब्ध नहीं है। सीधे बात करें:\n📞 प्रधान विनीत राय: ' + CONFIG.pradhan.phone + '\n📞 सहायक आकाश राय: ' + CONFIG.sahayak.phone
      : '🙏 AI assistant not set up yet. Please contact:\n📞 Pradhan Vineet Rai: ' + CONFIG.pradhan.phone
  );
}

function addAIMsg(text, type) {
  var box = document.getElementById('ai-messages');
  if (!box) return null;
  var el = document.createElement('div');
  el.className   = 'ai-msg ' + type;
  el.textContent = text;
  box.appendChild(el);
  box.scrollTop = box.scrollHeight;
  return el;
}

/* ─── TOAST ──────────────────────────────────────────────── */
var _toastTimer;
function showToast(msg, isError) {
  var toast = document.getElementById('toast');
  var msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg.replace(/^[✅❌⚠️]\s?/, '');
  toast.className   = 'toast' + (isError ? ' error' : '');
  // Force repaint so transition fires every time
  void toast.offsetWidth;
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3800);
}
