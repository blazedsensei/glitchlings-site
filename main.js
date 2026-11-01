/* Glitchlings site: the talking pet in the hero, the egg you can hatch, the species cards, the house rooms and the
   live release details. Sprite strips and their timings come from tools/build_website_assets.py (sprites.js). */
(function () {
  "use strict";

  var RELEASES = "blazedsensei/glitchlings-releases";
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // From assets/species.json. type pair, voice, quirk, favourite food, how it feels about baths, accent colour.
  var SPECIES = [
    { id: "emberkit", name: "Emberkit", noun: "fox kit", types: ["fire", "normal"], acc: "#ff8a3d", food: "toasted fish", bath: "endures",
      line: "Warm, quick, tail ends in a flame.",
      voice: "Warm, quick-witted and eager. Talks fast and burns bright, and is a little vain about its tail.",
      quirk: "Curls up on anything running hot, sets the cursor 'on fire' when excited, hates rain sounds." },
    { id: "cat", name: "Astrapurr", noun: "star cat", types: ["psychic", "crystal"], acc: "#b79cff", food: "fish", bath: "endures",
      line: "Dreamy, perceptive, reads the stars in your wallpaper.",
      voice: "Dreamy and perceptive, a little regal. Speaks softly of stars and omens and notices what you left unsaid.",
      quirk: "Gazes at the sky in your wallpaper and dozes in warm spots near running fans while crystal shards drift round its tail." },
    { id: "dog", name: "Splitch", noun: "glitch pup", types: ["water", "glitch"], acc: "#4fd8e8", food: "bone", bath: "fine",
      line: "Playful, a bit chaotic, loyal to the last pixel.",
      voice: "Bouncy, a bit chaotic and fiercely loyal. Says what it feels out loud, sometimes twice when it glitches.",
      quirk: "Shakes off pixel droplets when excited, glitches a step ahead when the mouse moves fast, loves fetch." },
    { id: "frog", name: "Lilyhop", noun: "frog", types: ["water", "grass"], acc: "#5fd6a0", food: "fly", bath: "loves",
      line: "Serene, cryptic, wears a lily pad for a hat.",
      voice: "Calm, cryptic and serene: a zen master in a lily-pad hat with unexpected glitched humour.",
      quirk: "Perches atop window title bars and contemplates existential code bugs and digital weather." },
    { id: "drizzlotl", name: "Drizzlotl", noun: "axolotl", types: ["water", "psychic"], acc: "#6cc8ff", food: "worm", bath: "loves",
      line: "Sleepy, dreamy, gills are tiny rain clouds.",
      voice: "Slow, dreamy, half-asleep. Drifts between thoughts and sometimes finishes them.",
      quirk: "Its gill-clouds rain when it is sad. It naps on the taskbar's edge and hums to the fan noise." },
    { id: "mossbun", name: "Mossbun", noun: "rabbit", types: ["grass", "normal"], acc: "#8fe08a", food: "clover", bath: "endures",
      line: "Gentle, tidy, a garden rides on its back.",
      voice: "Soft, gentle and a little shy. Notices small things and tends them.",
      quirk: "Grows a flower on its back when happy, nibbles the corners of neglected windows, hides from loud sounds." },
    { id: "staticquill", name: "Staticquill", noun: "hedgehog", types: ["electric", "normal"], acc: "#ffd84d", food: "beetle", bath: "fine",
      line: "Calm until startled, then the spines light up.",
      voice: "Calm, dry and matter-of-fact. Crackles into sharp bursts when startled or excited.",
      quirk: "Spines spark when the keyboard clatters. It grounds itself on the taskbar and hates balloons." },
    { id: "chillpip", name: "Chillpip", noun: "penguin chick", types: ["ice", "water"], acc: "#9fe6ff", food: "fish", bath: "loves",
      line: "Fluffy, brave, breath comes out as frost.",
      voice: "Bright, plucky and matter-of-fact. Small but sure of itself, breath puffing frost.",
      quirk: "Belly-slides along the taskbar, frosts the edges of hot windows and fluffs up at compliments." },
    { id: "rollstone", name: "Rollstone", noun: "pillbug", types: ["rock", "grass"], acc: "#b8c7a3", food: "mushroom", bath: "fine",
      line: "Slow, sturdy, curls into a boulder.",
      voice: "Slow, solid, unbothered. Short sentences, long pauses, quietly funny.",
      quirk: "Curls into a boulder when startled, collects pebble icons and rolls, very slowly, to wherever you are." },
    { id: "breezlet", name: "Breezlet", noun: "owlet", types: ["wind", "normal"], acc: "#b6f0e6", food: "mouse", bath: "fine",
      line: "Windblown, curious, never quite lands.",
      voice: "Airy, curious, quick to wonder. Sentences that drift off to look at something.",
      quirk: "Hovers over the active window, turns its head all the way round at new sounds, sheds feathers when excited." },
    { id: "lumoth", name: "Lumoth", noun: "moth", types: ["light", "psychic"], acc: "#ffeaa0", food: "nectar", bath: "endures",
      line: "Soft, luminous, drawn to bright windows.",
      voice: "Soft, luminous and thoughtful. Speaks in warm light and short kind sentences.",
      quirk: "Drifts toward the brightest window. Its wings glow at night and it dims itself when you look tired." },
    { id: "duskit", name: "Duskit", noun: "kitten", types: ["shadow", "glitch"], acc: "#b98cff", food: "treats", bath: "endures",
      line: "Half smoke, all eyes, appears where you weren't looking.",
      voice: "Quiet, sly and amused. Appears mid-sentence, says one true thing, and is smoke again.",
      quirk: "Melts into the taskbar shadow and reappears elsewhere, and watches you from the corner of the screen." },
    { id: "prismail", name: "Prismail", noun: "snail", types: ["crystal", "rock"], acc: "#d29bff", food: "mineral salt", bath: "loves",
      line: "Slow, cheerful, carries a geode full of gems.",
      voice: "Cheerful, unhurried, a little proud of its shell. Finds something to admire in everything.",
      quirk: "Polishes its gems on the taskbar edge, leaves a glittering trail and hides in its shell at loud sounds." },
    { id: "capybara", name: "Capybara", noun: "capybara", types: ["water", "fire"], acc: "#f0a878", food: "yuzu", bath: "loves",
      line: "A hot-spring soaker, calm, friends with everyone.",
      voice: "Slow, warm and unbothered, as if speaking from a hot bath, and pleased to see whoever comes along.",
      quirk: "Sits in the warmest spot on the screen with its eyes half shut, lets anything perch on its head, and steams when content." }
  ];
  var MYTHICS = [
    { id: "seamdrake", name: "Seamdrake", acc: "#7ef0ff", line: "the First Glitch" },
    { id: "auroryx", name: "Auroryx", acc: "#a8ffd8", line: "an aurora stag" },
    { id: "tempestrel", name: "Tempestrel", acc: "#ffe45c", line: "a storm kestrel" },
    { id: "cinderwing", name: "Cinderwing", acc: "#ffd27a", line: "a small phoenix" },
    { id: "fathomere", name: "Fathomere", acc: "#6ff0d0", line: "a lantern-eyed serpent" }
  ];
  var BATH = { loves: "loves them", fine: "doesn't mind", endures: "puts up with them" };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // Point a .sprite element at one strip: "emberkit:idle".
  function setSprite(node, key) {
    var parts = key.split(":"), sp = parts[0], anim = parts[1];
    var t = (window.SPRITES && window.SPRITES[sp] && window.SPRITES[sp][anim]) || [1, 150];
    node.style.backgroundImage = "url(img/sprites/" + sp + "_" + anim + ".png)";
    node.style.setProperty("--n", t[0]);
    node.style.setProperty("--ms", t[1] + "ms");
  }
  function restart(node) { node.style.animation = "none"; void node.offsetWidth; node.style.animation = ""; }
  function sprite(key, cls) { var n = el("div", "sprite" + (cls ? " " + cls : "")); setSprite(n, key); return n; }

  $$("[data-sprite]").forEach(function (n) { setSprite(n, n.getAttribute("data-sprite")); });

  // ---------- hero bubble ----------
  var LINES = [
    "You've been in Spotify a while. Is this a good song?",
    "You said your interview's on Thursday. Nervous?",
    "I'm hungry. Not urgent. A bit urgent.",
    "Back from the Glimmerwild! I found you a shiny pebble.",
    "I dreamt about a fish the size of a house.",
    "Lilyhop is on your window again. I'm not saying anything."
  ];
  var bubble = $("[data-bubble]");
  if (bubble && !REDUCED) {
    var li = 0;
    bubble.textContent = LINES[0];
    setInterval(function () {
      bubble.classList.add("out");
      setTimeout(function () {
        li = (li + 1) % LINES.length;
        bubble.textContent = LINES[li];
        bubble.classList.remove("out");
      }, 320);
    }, 4800);
  } else if (bubble) {
    bubble.textContent = LINES[1];
  }

  // ---------- species cards ----------
  var grid = $("[data-species]");
  var openCard = null, detail = null;

  function typeChips(types) {
    var wrap = el("div", "types");
    types.forEach(function (t) { wrap.appendChild(el("span", "type", t)); });
    return wrap;
  }

  function buildDetail(s) {
    var d = el("div", "detail");
    d.id = "detail";
    d.style.setProperty("--acc", s.acc);
    d.setAttribute("role", "region");
    d.setAttribute("aria-label", s.name);
    d.appendChild(sprite(s.id + ":happy_idle"));
    var body = el("div");
    body.appendChild(el("h3", null, s.name));
    var sub = el("p", null, "The " + s.noun + ". " + s.line);
    sub.style.color = "var(--muted)";
    body.appendChild(sub);
    var dl = el("dl");
    [["Voice", s.voice], ["Quirks", s.quirk], ["Favourite", s.food], ["Baths", BATH[s.bath]], ["Type", s.types.join(" / ")]]
      .forEach(function (row) { dl.appendChild(el("dt", null, row[0])); dl.appendChild(el("dd", null, row[1])); });
    body.appendChild(dl);
    d.appendChild(body);
    return d;
  }

  function closeDetail() {
    if (detail) detail.remove();
    if (openCard) openCard.setAttribute("aria-expanded", "false");
    detail = null; openCard = null;
  }

  function toggle(card, s) {
    if (openCard === card) { closeDetail(); return; }
    closeDetail();
    // put the panel after the last card on the clicked card's row
    var cards = $$(".mon", grid), last = card;
    cards.forEach(function (c) { if (c.offsetTop === card.offsetTop) last = c; });
    detail = buildDetail(s);
    last.after(detail);
    openCard = card;
    card.setAttribute("aria-expanded", "true");
  }

  if (grid) {
    SPECIES.forEach(function (s) {
      var b = el("button", "mon reveal");
      b.type = "button";
      b.style.setProperty("--acc", s.acc);
      b.setAttribute("aria-expanded", "false");
      b.setAttribute("aria-controls", "detail");
      var stage = el("div", "stage");
      stage.appendChild(sprite(s.id + ":idle"));
      b.appendChild(stage);
      b.appendChild(el("span", "name", s.name));
      b.appendChild(el("span", "noun", s.noun));
      b.appendChild(typeChips(s.types));
      b.addEventListener("click", function () { toggle(b, s); });
      grid.appendChild(b);
    });
    var lastWidth = window.innerWidth;
    window.addEventListener("resize", function () {
      if (window.innerWidth !== lastWidth && openCard) { var c = openCard, s = SPECIES[$$(".mon", grid).indexOf(c)]; closeDetail(); toggle(c, s); }
      lastWidth = window.innerWidth;
    });
  }

  var mythRow = $("[data-mythics]");
  if (mythRow) {
    MYTHICS.forEach(function (m) {
      var d = el("div", "mythic");
      d.tabIndex = 0;
      d.style.setProperty("--acc", m.acc);
      d.setAttribute("aria-label", m.name + ", " + m.line);
      d.appendChild(sprite(m.id + ":idle"));
      d.appendChild(el("strong", null, m.name));
      d.appendChild(el("span", null, m.line));
      mythRow.appendChild(d);
    });
  }

  var parade = $("[data-parade]");
  if (parade) SPECIES.forEach(function (s) { parade.appendChild(sprite(s.id + ":idle")); });

  // ---------- hatch ----------
  var nest = $("[data-nest]"), egg = $("[data-egg]"), hint = $("[data-hint]"), result = $("[data-result]");
  if (nest && egg) {
    var HOLD_MS = 1600;
    var warm = 0, holding = false, state = "egg", last = 0, current = null, prevId = null;

    function pickEgg() {
      var pool = SPECIES.filter(function (s) { return s.id !== prevId; });
      current = pool[Math.floor(Math.random() * pool.length)];
      prevId = current.id;
      setSprite(egg, current.id + ":hatch");
      egg.className = "sprite still";
      warm = 0; paint(); state = "egg";
      hint.textContent = "Press and hold the egg to keep it warm";
    }
    function paint() { nest.style.setProperty("--warm", warm.toFixed(3)); nest.parentNode.style.setProperty("--warm", warm.toFixed(3)); }

    function tick(now) {
      var dt = last ? now - last : 16; last = now;
      if (state === "egg") {
        warm = holding ? Math.min(1, warm + dt / HOLD_MS) : Math.max(0, warm - dt / (HOLD_MS * 1.5));
        paint();
        nest.classList.toggle("wobble", holding && warm > 0.15 && !REDUCED);
        if (warm >= 1) hatch();
      }
      if (warm > 0 || holding) requestAnimationFrame(tick); else last = 0;
    }
    function hatch() {
      state = "hatching"; holding = false;
      nest.classList.remove("wobble");
      hint.textContent = "Something's moving…";
      egg.className = "sprite once";
      restart(egg);
      var t = window.SPRITES[current.id].hatch;
      setTimeout(hatched, REDUCED ? 0 : t[0] * t[1] + 500);
    }
    function hatched() {
      state = "pet";
      setSprite(egg, current.id + ":happy_idle");
      egg.className = "sprite";
      restart(egg);
      warm = 0; paint();
      result.style.setProperty("--acc", current.acc);
      result.innerHTML = "";
      result.appendChild(el("span", "name", "It's a " + current.name + "!"));
      result.appendChild(el("p", null, "The " + current.noun + ". " + current.voice));
      hint.textContent = "Press the pet for another egg";
    }
    function start(e) {
      if (e) e.preventDefault();
      if (state === "pet") { pickEgg(); return; }
      if (state !== "egg" || holding) return;
      holding = true;
      requestAnimationFrame(tick);
    }
    function stop() { holding = false; }

    nest.addEventListener("pointerdown", function (e) {
      try { nest.setPointerCapture(e.pointerId); } catch (err) { /* not every pointer can be captured */ }
      start(e);
    });
    nest.addEventListener("pointerup", stop);
    nest.addEventListener("pointercancel", stop);
    nest.addEventListener("lostpointercapture", stop);
    nest.addEventListener("keydown", function (e) { if ((e.key === " " || e.key === "Enter") && !e.repeat) start(e); else if (e.key === " " || e.key === "Enter") e.preventDefault(); });
    nest.addEventListener("keyup", function (e) { if (e.key === " " || e.key === "Enter") stop(); });
    nest.addEventListener("click", function (e) { e.preventDefault(); });
    nest.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    pickEgg();
  }

  // ---------- rooms ----------
  var room = $("[data-room]");
  if (room) {
    var day = $(".day", room), night = $(".night", room), nightBtn = $("[data-night]");
    $$("[data-room-pick]").forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-room-pick");
        day.src = "img/rooms/" + id + ".webp";
        night.src = "img/rooms/" + id + "_night.webp";
        day.alt = "The " + b.textContent.toLowerCase() + " room in a pet's house.";
        $$("[data-room-pick]").forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
      });
    });
    nightBtn.addEventListener("click", function () {
      var on = !room.classList.contains("is-night");
      room.classList.toggle("is-night", on);
      nightBtn.setAttribute("aria-pressed", String(on));
    });
  }

  // ---------- reveal on scroll ----------
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !REDUCED) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
  }

  // ---------- the newest release: version, size, download link ----------
  if (window.fetch && location.protocol !== "file:") {
    fetch("https://api.github.com/repos/" + RELEASES + "/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rel) {
        if (!rel || !rel.tag_name) return;
        var v = String(rel.tag_name).replace(/^v/i, "");
        $$("[data-version]").forEach(function (n) { n.textContent = "Version " + v; });
        var zip = (rel.assets || []).filter(function (a) { return /\.zip$/i.test(a.name); })[0];
        if (!zip) return;
        $$("[data-download]").forEach(function (a) { a.href = zip.browser_download_url; });
        var mb = Math.round(zip.size / 1048576 / 10) * 10;
        $$("[data-size]").forEach(function (n) { n.textContent = zip.name + ", about " + mb + " MB"; });
      })
      .catch(function () { /* the page already says 0.14 */ });
  }
})();
