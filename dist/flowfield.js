/* ============================================================
   flowfield.js — ambient vortex background + hidden mini-game
   Self-mounting: finds <canvas data-bg-canvas> and animates it.
   Reads options from data attributes:
     data-base-alpha  (default 0.27)   line opacity
   Dots + tracers flowing through vortices, cursor swirl, scroll-anchored.

   Hidden game (dormant until a secret trigger is found):
     • Konami code  ↑ ↑ ↓ ↓ ← → ← → B A
     • click the accent period after the name ([data-secret])
   Then catch the falling diamonds with your cursor (or finger) for 30s.
   ============================================================ */
(function () {
  function initFlowField(canvas) {
    if (!canvas || canvas.__rfInit) return;
    canvas.__rfInit = true;
    var ctx = canvas.getContext('2d');
    var host = canvas.parentElement;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 1);
    var baseAlpha = parseFloat(canvas.getAttribute('data-base-alpha')) || 0.27;
    var densityDiv = 9000, maxCount = 620;
    var GAME_MS = 30000;
    var w = 0, h = 0, pageH = 0;
    var mouse = { x: -9999, y: -9999, active: false };
    var particles = [];

    // ── Game state ──
    var collectibles = [], lastCol = 0, gameScore = 0, pops = [], sparks = [];
    var combo = 0, lastCatch = 0, spawnGap = 1300, shocks = [];
    var gameStart = 0, lastSec = -1, hudHideT = 0, gameActive = false, hud = null;

    function make() {
      return { x: Math.random() * w, y: Math.random() * (pageH || h), speed: 0.5 + Math.random() * 1.1,
               life: 180 + Math.random() * 360, heat: 0, trail: [], dying: false, fade: 1 };
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
    window.addEventListener('touchstart', function (e) { var t = e.touches && e.touches[0]; if (t) { mouse.x = t.clientX; mouse.y = t.clientY; mouse.active = true; } }, { passive: true });
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

    // ── Game HUD + secret triggers ──
    var fmt = function (ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return '0:' + (s < 10 ? '0' : '') + s; };
    var updateHud = function () {
      if (!hud) return;
      var remain = gameActive ? GAME_MS - (performance.now() - gameStart) : 0;
      hud.innerHTML = '◆ <b style="color:#e44c65;font-weight:500">' + gameScore + '</b>'
        + (combo > 1 ? ' &nbsp;<span style="color:rgba(243,242,239,0.55)">streak ×' + combo + '</span>' : '')
        + (gameActive ? ' &nbsp;<span style="color:rgba(243,242,239,0.4)">' + fmt(remain) + '</span>' : '');
    };
    var endRound = function () {
      gameActive = false; collectibles.length = 0;
      if (!hud) return;
      hud.style.opacity = '1';
      hud.innerHTML = '◆ Time! &nbsp;<b style="color:#e44c65;font-weight:500">' + gameScore + '</b> caught';
      clearTimeout(hudHideT); hudHideT = setTimeout(function () { hud.style.opacity = '0'; }, 4500);
    };
    var setGame = function (on) {
      gameActive = on;
      if (!hud) return;
      if (on) { gameScore = 0; combo = 0; spawnGap = 1300; collectibles.length = 0; sparks.length = 0; gameStart = performance.now(); lastSec = -1; clearTimeout(hudHideT); hud.style.opacity = '1'; updateHud(); }
      else { collectibles.length = 0; hud.style.opacity = '0'; }
    };
    var spawnCollectible = function () {
      var sy = window.scrollY || window.pageYOffset || 0;
      collectibles.push({ x: 40 + Math.random() * (w - 80), y: sy - 24, born: performance.now(), s: 12 + Math.random() * 4, pulse: Math.random() * 6.28, vy: 1.3 + Math.random() * 1.3, golden: Math.random() < 0.16 });
    };

    hud = document.createElement('div');
    hud.style.cssText = 'position:fixed; left:clamp(20px,5vw,72px); bottom:16px; z-index:40; font-family:"JetBrains Mono",monospace; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:rgba(243,242,239,0.55); pointer-events:none; opacity:0; transition:opacity .4s ease;';
    document.body.appendChild(hud);
    // Konami code
    var seq = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    var ki = 0;
    window.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase();
      ki = (k === seq[ki]) ? ki + 1 : (k === seq[0] ? 1 : 0);
      if (ki === seq.length) { ki = 0; setGame(!gameActive); }
    });
    // secret: click the accent period after the name
    var bindSecret = function () {
      var secret = document.querySelector('[data-secret]');
      if (secret && !secret.__rfBound) {
        secret.__rfBound = true;
        secret.style.cursor = 'default';
        secret.addEventListener('click', function () { setGame(!gameActive); });
      }
    };
    bindSecret();
    setTimeout(bindSecret, 1500);

    var t = 0;
    function loop() {
      t += 0.0016;
      var sy = window.scrollY || window.pageYOffset || 0;
      ctx.clearRect(0, 0, w, h);
      var now = performance.now();
      if (shocks.length) shocks = shocks.filter(function (s) { return now - s.born < 950; });

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

        // shockwaves from catches shove + flare nearby particles
        for (var si = 0; si < shocks.length; si++) {
          var sk = shocks[si];
          var sdx = p.x - sk.x, sdy = p.y - sk.y;
          var sd = Math.sqrt(sdx * sdx + sdy * sdy) || 1;
          var sAge = (now - sk.born) / 1000;
          var ringDist = Math.abs(sd - sAge * 520);
          if (ringDist < 70) {
            var sf = (1 - ringDist / 70) * (1 - sAge / 0.95);
            vx += (sdx / sd) * sf * 7; vy += (sdy / sd) * sf * 7;
            p.heat = Math.min(1, p.heat + sf * 0.6);
            if (sf > 0.32) p.dying = true;
          }
        }

        p.x += vx; p.y += vy; p.life--;
        if (p.dying) p.fade -= 0.05;
        p.trail.push(p.x, p.y); if (p.trail.length > 16) p.trail.splice(0, p.trail.length - 16);

        var lit = p.heat;
        var ff = p.dying ? Math.max(0, p.fade) : 1;
        if (ff > 0 && screenY > -40 && screenY < h + 40) {
          var rr = lit > 0.04 ? Math.round(243 + (228 - 243) * lit) : 243;
          var gg = lit > 0.04 ? Math.round(242 + (76 - 242) * lit) : 242;
          var bb = lit > 0.04 ? Math.round(239 + (101 - 239) * lit) : 239;
          var headA = (baseAlpha + lit * 0.5) * ff, pn = p.trail.length / 2;
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
        if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > pageH + 20 || p.life <= 0 || (p.dying && p.fade <= 0)) { particles[i] = make(); }
      }

      // ── Collectibles ──
      if (gameActive) {
        var remain = GAME_MS - (now - gameStart);
        if (remain <= 0) { endRound(); }
        else { var sec = Math.ceil(remain / 1000); if (sec !== lastSec) { lastSec = sec; updateHud(); } }
        if (collectibles.length < 5 && now - lastCol > spawnGap) { lastCol = now; spawnCollectible(); }
      }
      for (var ci = collectibles.length - 1; ci >= 0; ci--) {
        var c = collectibles[ci];
        var cScreenY = c.y - sy;
        if (cScreenY > h + 70) { collectibles.splice(ci, 1); continue; }
        var age = (now - c.born) / 1000;
        if (age > 16) { collectibles.splice(ci, 1); continue; }
        var ca = field(c.x, c.y, t);
        c.x += Math.cos(ca) * 0.8;
        c.y += c.vy + 0.55;
        c.pulse += 0.1;
        if (mouse.active) {
          var cdx = c.x - mouse.x, cdy = cScreenY - mouse.y;
          if (Math.sqrt(cdx * cdx + cdy * cdy) < 34) {
            combo = (now - lastCatch < 2500) ? combo + 1 : 1;
            lastCatch = now;
            gameScore += (c.golden ? 3 : 1) * combo;
            spawnGap = Math.max(520, spawnGap - 45);
            pops.push({ x: c.x, y: c.y, born: now, golden: c.golden });
            shocks.push({ x: c.x, y: c.y, born: now });
            var col = c.golden ? '255,196,84' : '255,95,120';
            for (var s = 0; s < 12; s++) { var an = Math.random() * 6.28, spd = 1.2 + Math.random() * 3.4; sparks.push({ x: c.x, y: c.y, vx: Math.cos(an) * spd, vy: Math.sin(an) * spd, born: now, col: col }); }
            collectibles.splice(ci, 1);
            updateHud();
            continue;
          }
        }
        if (cScreenY < -40) continue;
        var fade = Math.min(1, age * 3);
        var ringS = 1 + Math.sin(c.pulse) * 0.22;
        var ringC = c.golden ? '255,196,84' : '228,76,101';
        var fillC = c.golden ? '255,210,120' : '255,95,120';
        ctx.strokeStyle = 'rgba(' + ringC + ',' + (0.55 * fade).toFixed(3) + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(c.x, cScreenY, (c.s + 7) * ringS, 0, Math.PI * 2); ctx.stroke();
        ctx.save(); ctx.translate(c.x, cScreenY); ctx.rotate(Math.PI / 4);
        ctx.fillStyle = 'rgba(' + fillC + ',' + (0.95 * fade).toFixed(3) + ')';
        ctx.fillRect(-c.s / 2, -c.s / 2, c.s, c.s); ctx.restore();
      }
      // catch bursts
      for (var pi = pops.length - 1; pi >= 0; pi--) {
        var pp = pops[pi];
        var pAge = (now - pp.born) / 1000;
        if (pAge > 0.45) { pops.splice(pi, 1); continue; }
        ctx.strokeStyle = 'rgba(' + (pp.golden ? '255,196,84' : '228,76,101') + ',' + (1 - pAge / 0.45).toFixed(3) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(pp.x, pp.y - sy, 10 + pAge * 70, 0, Math.PI * 2); ctx.stroke();
      }
      // sparks
      for (var spi = sparks.length - 1; spi >= 0; spi--) {
        var spk = sparks[spi];
        var spAge = (now - spk.born) / 1000;
        if (spAge > 0.5) { sparks.splice(spi, 1); continue; }
        spk.x += spk.vx; spk.y += spk.vy; spk.vx *= 0.91; spk.vy *= 0.91;
        var ssy = spk.y - sy;
        if (ssy < -20 || ssy > h + 20) continue;
        ctx.fillStyle = 'rgba(' + spk.col + ',' + (1 - spAge / 0.5).toFixed(3) + ')';
        ctx.fillRect(spk.x - 1.2, ssy - 1.2, 2.6, 2.6);
      }

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  window.initFlowField = initFlowField;

  // auto-mount: poll briefly for the canvas (script may load before body content)
  var tries = 0;
  (function watch() {
    var found = document.querySelectorAll('canvas[data-bg-canvas]');
    if (found.length) { found.forEach(initFlowField); return; }
    if (tries++ < 240) requestAnimationFrame(watch);
  })();
})();
