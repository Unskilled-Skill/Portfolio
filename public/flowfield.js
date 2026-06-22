/* ============================================================
   flowfield.js — shared ambient vortex background
   Self-mounting: finds <canvas data-bg-canvas> and animates it.
   Read options from data attributes:
     data-base-alpha  (default 0.22)   line opacity
   Matches the homepage field (dots + tracers, flowing vortices,
   cursor swirl, scroll-anchored) but ambient only — no game.
   ============================================================ */
(function () {
  function initFlowField(canvas) {
    if (!canvas || canvas.__rfInit) return;
    canvas.__rfInit = true;
    var ctx = canvas.getContext('2d');
    var host = canvas.parentElement;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 1);
    var baseAlpha = parseFloat(canvas.getAttribute('data-base-alpha')) || 0.22;
    var densityDiv = 9000, maxCount = 600;
    var w = 0, h = 0, pageH = 0;
    var mouse = { x: -9999, y: -9999, active: false };
    var particles = [];

    function make() {
      return { x: Math.random() * w, y: Math.random() * (pageH || h), speed: 0.5 + Math.random() * 1.1,
               life: 180 + Math.random() * 360, heat: 0, trail: [] };
    }
    function build() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      pageH = Math.max(host.scrollHeight, h);
      if (w === 0 || h === 0) return;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(Math.min(maxCount, Math.max(70, (w * pageH) / densityDiv)));
      particles = []; for (var i = 0; i < count; i++) particles.push(make());
    }
    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
    window.addEventListener('mouseleave', function () { mouse.active = false; });
    window.addEventListener('touchmove', function (e) { var t = e.touches && e.touches[0]; if (t) { mouse.x = t.clientX; mouse.y = t.clientY; mouse.active = true; } }, { passive: true });
    window.addEventListener('touchend', function () { mouse.active = false; });
    window.addEventListener('resize', build, { passive: true });
    build();
    setTimeout(build, 1200); setTimeout(build, 3200); window.addEventListener('load', build);

    function field(x, y, t) {
      var swirl = Math.sin(x * 0.0042 + t * 0.32) * Math.cos(y * 0.0042 - t * 0.26) * 1.25;
      var drift = Math.sin(x * 0.0011 + t * 0.5) * 0.25;
      return Math.PI / 2 + swirl + drift;
    }

    if (reduced) {
      var sy0 = window.scrollY || 0;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) { ctx.fillStyle = 'rgba(243,242,239,' + (baseAlpha * 0.4).toFixed(3) + ')'; ctx.fillRect(particles[i].x, particles[i].y - sy0, 1.4, 1.4); }
      return;
    }

    var t = 0;
    function loop() {
      t += 0.0016;
      var sy = window.scrollY || window.pageYOffset || 0;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var a = field(p.x, p.y, t);
        var vx = Math.cos(a) * p.speed, vy = Math.sin(a) * p.speed;
        var screenY = p.y - sy;
        if (mouse.active) {
          var dx = p.x - mouse.x, dy = screenY - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 170) { var f = (1 - d / 170); vx += (-dy / (d || 1)) * f * 2.4; vy += (dx / (d || 1)) * f * 2.4; p.heat = Math.min(1, p.heat + f * 0.08); }
        }
        p.heat *= 0.96;
        p.x += vx; p.y += vy; p.life--;
        p.trail.push(p.x, p.y); if (p.trail.length > 16) p.trail.splice(0, p.trail.length - 16);
        var lit = p.heat;
        if (screenY > -40 && screenY < h + 40) {
          var rr = lit > 0.04 ? Math.round(243 + (228 - 243) * lit) : 243;
          var gg = lit > 0.04 ? Math.round(242 + (76 - 242) * lit) : 242;
          var bb = lit > 0.04 ? Math.round(239 + (101 - 239) * lit) : 239;
          var headA = baseAlpha + lit * 0.5, pn = p.trail.length / 2;
          ctx.lineCap = 'round';
          for (var k = 1; k < pn; k++) {
            ctx.strokeStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + ((k / pn) * headA * 0.55).toFixed(3) + ')';
            ctx.lineWidth = 0.5 + (k / pn) * (0.7 + lit * 1.1);
            ctx.beginPath();
            ctx.moveTo(p.trail[(k - 1) * 2], p.trail[(k - 1) * 2 + 1] - sy);
            ctx.lineTo(p.trail[k * 2], p.trail[k * 2 + 1] - sy);
            ctx.stroke();
          }
          ctx.fillStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + headA.toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(p.x, screenY, 1.3 + lit * 1.7, 0, Math.PI * 2); ctx.fill();
        }
        if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > pageH + 20 || p.life <= 0) { particles[i] = make(); }
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  window.initFlowField = initFlowField;

  // auto-mount: poll briefly for the canvas (helmet scripts run before body content exists)
  var tries = 0;
  (function watch() {
    var found = document.querySelectorAll('canvas[data-bg-canvas]');
    if (found.length) { found.forEach(initFlowField); return; }
    if (tries++ < 240) requestAnimationFrame(watch);
  })();
})();
