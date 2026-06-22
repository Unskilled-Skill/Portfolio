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
    // secret: click the accent period after the name. Delegated on document so
    // it survives SplitText rebuilding the headline (which replaces the span).
    document.addEventListener('click', function (e) {
      var el = e.target;
      if (el && el.closest && el.closest('[data-secret]')) setGame(!gameActive);
    });

    var t = 0;
    function loop() {
      t += 0.0016;
      var sy = window.scrollY || window.pageYOffset || 0;
      ctx.clearRect(0, 0, w, h);
      var now = performance.now();
      if (shocks.length) shocks = shocks.filter(function (s) { return now - s.born < 620; });

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
        if (p.ember) p.ember *= 0.93; // embers burn off and cool

        // catch explosions: nearby particles get caught in a vortex and burn off
        // as bright embers — radial shockwave + tangential swirl + ember glow.
        for (var si = 0; si < shocks.length; si++) {
          var sk = shocks[si];
          var sdx = p.x - sk.x, sdy = p.y - sk.y;
          var sd = Math.sqrt(sdx * sdx + sdy * sdy) || 1;
          var sAge = (now - sk.born) / 1000;
          var ringDist = Math.abs(sd - sAge * 300);
          if (ringDist < 55) {
            var sf = (1 - ringDist / 55) * (1 - sAge / 0.62);
            if (sf > 0) {
              var dirn = sk.golden ? -1 : 1;
              // radial outward shove
              vx += (sdx / sd) * sf * 3; vy += (sdy / sd) * sf * 3;
              // tangential swirl → spins the field into a vortex around the blast
              vx += (-sdy / sd) * sf * 5 * dirn; vy += (sdx / sd) * sf * 5 * dirn;
              p.heat = Math.min(1, p.heat + sf * 0.7);
              p.ember = Math.min(1, (p.ember || 0) + sf * 1.1);
              if (sf > 0.34) p.dying = true;
            }
          }
        }

        p.x += vx; p.y += vy; p.life--;
        if (p.dying) p.fade -= 0.05;
        p.trail.push(p.x, p.y); if (p.trail.length > 16) p.trail.splice(0, p.trail.length - 16);

        var lit = p.heat;
        var em = p.ember || 0;
        var hot = Math.max(lit, em);
        var ff = p.dying ? Math.max(0, p.fade) : 1;
        if (ff > 0 && screenY > -40 && screenY < h + 40) {
          // ink → pink (cursor heat) → bright ember (burn-off glow)
          var rr = 243 + (228 - 243) * lit; rr += (255 - rr) * em;
          var gg = 242 + (76 - 242) * lit; gg += (205 - gg) * em;
          var bb = 239 + (101 - 239) * lit; bb += (130 - bb) * em;
          rr = Math.round(rr); gg = Math.round(gg); bb = Math.round(bb);
          var headA = (baseAlpha + hot * 0.55) * ff, pn = p.trail.length / 2;
          ctx.lineCap = 'round';
          for (var k = 1; k < pn; k++) {
            ctx.strokeStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + ((k / pn) * headA * 0.55).toFixed(3) + ')';
            ctx.lineWidth = 0.5 + (k / pn) * (0.7 + hot * 1.1);
            ctx.beginPath();
            ctx.moveTo(p.trail[(k - 1) * 2], p.trail[(k - 1) * 2 + 1] - sy);
            ctx.lineTo(p.trail[k * 2], p.trail[k * 2 + 1] - sy);
            ctx.stroke();
          }
          // additive ember halo — bright burning glow that fades as it cools
          if (em > 0.12) {
            var gr = (2 + em * 5) * 1.9;
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            var grd = ctx.createRadialGradient(p.x, screenY, 0, p.x, screenY, gr);
            grd.addColorStop(0, 'rgba(' + rr + ',' + gg + ',' + bb + ',' + (0.55 * em * ff).toFixed(3) + ')');
            grd.addColorStop(1, 'rgba(' + rr + ',' + gg + ',' + bb + ',0)');
            ctx.fillStyle = grd;
            ctx.beginPath(); ctx.arc(p.x, screenY, gr, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
          }
          ctx.fillStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + headA.toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(p.x, screenY, 1.3 + hot * 1.7 + em * 1.6, 0, Math.PI * 2); ctx.fill();
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
            shocks.push({ x: c.x, y: c.y, born: now, golden: c.golden });
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
      // catch bursts — dotted rings that expand like a shockwave while spinning
      // with an accelerating ramp (rotation ∝ age², so it keeps speeding up).
      var POP_DUR = 0.68;
      for (var pi = pops.length - 1; pi >= 0; pi--) {
        var pp = pops[pi];
        var pAge = (now - pp.born) / 1000;
        if (pAge > POP_DUR) { pops.splice(pi, 1); continue; }
        var prog = pAge / POP_DUR;
        var alpha = (1 - prog) * (1 - prog); // ease-out fade
        var ringColor = pp.golden ? '255,196,84' : '228,76,101';
        var rot = pAge * pAge * 11; // ramps up — faster the longer it lives
        var radius = 6 + prog * 52;  // expanding pulse
        ctx.save();
        ctx.translate(pp.x, pp.y - sy);
        // outer dotted ring
        ctx.rotate(rot);
        ctx.setLineDash([2, 7]);
        ctx.lineCap = 'round';
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = 'rgba(' + ringColor + ',' + (alpha * 0.9).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.stroke();
        // inner dotted ring — finer dashes, counter-spin for contrast
        ctx.rotate(-rot * 1.8);
        ctx.setLineDash([1.5, 10]);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = 'rgba(' + ringColor + ',' + (alpha * 0.6).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(0, 0, radius * 0.58, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }
      ctx.setLineDash([]);
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
