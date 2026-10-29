import { MEMBERS } from "./members.js";
import { refreshMemberPhotos } from "./member-photos.js";

/* ====== CONTENIDO (editá acá) ====== */
const LINKS = {
  telegram: "https://t.me/pibeslibertariossalta",
  cafecito: "https://cafecito.app/pibeslibertariossla",
  beacons:  "https://beacons.ai/pibeslibertariossalta",
  instagram: "https://instagram.com/pibeslibertariossalta",
  tiktok:   "https://tiktok.com/@pibeslibertariossalta",
  youtube:  "https://www.youtube.com/channel/UCfD2R3DWhIXBH9ElsHcNIMQ",
  facebook: "https://www.facebook.com/pibes.libertarios.salta",
};
const SOCIAL = [
  ["Instagram", "@pibeslibertariossalta", LINKS.instagram],
  ["TikTok", "@pibeslibertariossalta", LINKS.tiktok],
  ["YouTube", "Pibes Libertarios Salta", LINKS.youtube],
  ["Facebook", "pibes.libertarios.salta", LINKS.facebook],
  ["Telegram", "grupo público", LINKS.telegram],
];
/* Publicaciones: se editan en posts.json (title, image, url; date y text son opcionales).
   Se generan tantas páginas como hagan falta, en el orden del archivo. */
const POSTS = await fetch("posts.json", { cache: "no-cache" })
  .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
  .then(d => Array.isArray(d) ? d.filter(p => p && p.title) : Promise.reject(new Error("no es una lista")))
  .catch(err => { console.error("No se pudo cargar posts.json:", err); return []; });
const POSTS_FIRST = 1, POSTS_PER_PAGE = 2;
// posts.json es contenido externo: se escapa el texto y solo se aceptan enlaces http(s) o rutas relativas
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const safeUrl = u => (u = String(u ?? "").trim()) && (/^https?:\/\//i.test(u) || !/^[a-z][\w+.-]*:/i.test(u)) ? esc(u) : "";   // la primera página lleva el título del capítulo, por eso entra una sola
/* Cada cara = una página. 'ye' amarilla / 'bk' negra. Orden: frente, dorso, frente, dorso... */
const PAGES = [
  { cls: "cover", title: "Portada", html: `
      <div class="frame">
        <div class="small foil">SALTA · ARGENTINA</div>
        <div class="emblem" role="img" aria-label="Símbolo de Pibes Libertarios"><i></i></div>
        <h1 class="sr">Pibes Libertarios</h1>
        <div class="sub foil">y su <b>batalla cultural</b></div>
        <div class="small foil" style="margin-top:.8em">· CRÓNICAS DE LA LIBERTAD · LIBRO I ·</div>
      </div>` },
  { cls: "ye", title: "Seguinos", html: `
      <div class="kicker">Antes de empezar</div><h2>Seguinos</h2><div class="rule"></div>
      <p>Encontranos en nuestras redes:</p>
      <ul class="toc">${SOCIAL.map(([name, handle, url]) => `
        <li><a href="${url}" target="_blank" rel="noopener"><b>${name}</b><span class="lead"></span><small>${handle}</small></a></li>`).join("")}
      </ul>
      <a class="btn" href="${LINKS.beacons}" target="_blank" rel="noopener" style="margin-top:auto;align-self:flex-start">Todos los links</a>` },
  { cls: "bk", html: `
      <div class="kicker">Prólogo</div><div class="rule"></div>
      <div class="big-quote">“No seguimos <b>personas</b>,<br>seguimos <b>ideas</b>.”</div>
      <p>Somos una agrupación política llevando el mensaje de la Libertad.</p>` },
  { cls: "ye", title: "Quiénes somos", html: `
      <div class="kicker">Capítulo I</div><h2>¿Quiénes somos?</h2><div class="rule"></div>
      <p><b>Pibes Libertarios</b> es una agrupación de jóvenes de Salta que divulga las ideas de la libertad.</p>
      <p>Nos juntamos en grupos, redes y encuentros para dar la batalla cultural cara a cara y en la calle.</p>
      <p><b>+120</b> pibes ya están en nuestro grupo público de Telegram.</p>` },
  { cls: "bk", html: `
      <div class="kicker">Capítulo II</div><h2>Nuestras ideas</h2><div class="rule"></div>
      <div class="card"><h3>Ideas sobre personas</h3><p>Seguimos ideas, no caudillos.</p></div>
      <div class="card"><h3>Batalla cultural</h3><p>Antes de cambiar leyes, hay que cambiar la cabeza.</p></div>
      <div class="card"><h3>Verdad y justicia</h3><p>La libertad empieza con justicia.</p></div>` },
  ...postFaces(),
  { cls: "ye", title: "Miembros", html: `
      <div class="kicker">Capítulo IV</div><h2>Miembros</h2><div class="rule"></div>
      <div class="members">${MEMBERS.map(m => `
        <div class="member">
          <div class="avatar member-photo">
            <img data-member-photo="${m.id}" alt="Foto de ${m.name}" hidden>
          </div>
          <b>${m.name}</b><small>${m.role}</small>
        </div>`).join("")}</div>
      <div class="member-photo-tools"><button class="member-photo-edit" type="button">Fotos en GitHub</button><p class="member-photo-status" role="status" aria-live="polite">Las fotos se actualizan desde GitHub.</p></div>` },
  { cls: "bk", html: `
      <div class="kicker">Capítulo V</div><h2>Sumate</h2><div class="rule"></div>
      <ol class="steps">
        <li>Entrá al grupo de Telegram y presentate.</li>
        <li>Venite a la próxima reunión.</li>
        <li>Compartí las ideas en tu entorno.</li>
      </ol>` },
  { cls: "ye", title: "Redes", html: `
      <div class="kicker">Epílogo</div><h2>Todas nuestras redes</h2><div class="rule"></div>
      <div class="links">
        <a class="btn" href="${LINKS.telegram}" target="_blank" rel="noopener">Telegram</a>
        <a class="btn" href="${LINKS.cafecito}" target="_blank" rel="noopener">☕ Cafecito</a>
        <a class="btn" href="${LINKS.beacons}" target="_blank" rel="noopener">Todos los links</a>
      </div>
      <p>Ayudanos a seguir creciendo.</p>` },
];
const FIN = { cls: "cover", title: "Fin", html: `
      <div class="frame">
        <div class="small foil">FIN DEL LIBRO I</div>
        <svg class="orn" viewBox="0 0 120 80"><circle cx="60" cy="40" r="14"/><path d="M60 14v-8M60 74v-8M34 40h-8M94 40h-8M41 21l-6-6M85 59l6 6M79 21l6-6M35 65l6-6"/><path d="M10 40c14 0 22-6 26-14M110 40c-14 0-22-6-26-14M10 40c14 0 22 6 26 14M110 40c-14 0-22 6-26 14"/></svg>
        <h1 class="foil" style="font-size:1.9em!important">La batalla<br>continúa</h1>
        <div class="sub foil">Viva la <b>libertad</b></div>
        <a class="btn" href="#top" id="restart">Volver al inicio</a>
      </div>` };
// Las caras van de a dos por hoja: la contratapa tiene que caer en un dorso, si no se agrega una página en blanco antes.
const FACES = [...PAGES, ...(PAGES.length % 2 ? [] : [{ cls: "ye", html: "" }]), FIN];

function postFaces() {
  const head = `<div class="kicker">Capítulo III</div><h2>Publicaciones</h2><div class="rule"></div>`;
  const tail = `<p>Más novedades, material audiovisual y convocatorias en nuestro Telegram.</p>
      <a class="btn" href="${LINKS.telegram}" target="_blank" rel="noopener">Ver más novedades</a>`;
  if (!POSTS.length) return [{ cls: "ye", title: "Publicaciones", html: `${head}<p>Pronto vas a encontrar acá nuestras publicaciones.</p>${tail}` }];
  const pages = [];
  for (let i = 0, n = POSTS_FIRST; i < POSTS.length; i += n, n = POSTS_PER_PAGE) {
    const last = i + n >= POSTS.length;
    pages.push({ cls: "ye", title: pages.length ? undefined : "Publicaciones", html:
      (pages.length ? `<div class="kicker">Capítulo III · cont.</div>` : head) + POSTS.slice(i, i + n).map(postCard).join("") +
      (last ? tail : `<p style="margin-top:auto">Seguí leyendo en la página siguiente →</p>`) });
  }
  return pages;
}
function postCard(p) {
  const img = safeUrl(p.image), url = safeUrl(p.url);
  const body = (img ? `<img src="${img}" alt="" loading="lazy">` : "") +
    `<div>${p.date ? `<time>${esc(p.date)}</time>` : ""}<h3>${esc(p.title)}</h3>${p.text ? `<p>${esc(p.text)}</p>` : ""}</div>`;
  const cls = `card post${img ? "" : " noimg"}`;
  return url ? `<a class="${cls}" href="${url}" target="_blank" rel="noopener">${body}</a>` : `<div class="${cls}">${body}</div>`;
}

/* ====== MOTOR DEL LIBRO ====== */
const $ = s => document.querySelector(s);
const book = $("#book"), world = $("#world"), scroller = $("#scroller"), dotsEl = $("#dots");
const mq = matchMedia("(max-width:760px)");
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
const INTRO = 1;      // primer scroll: el libro se acerca y queda de frente, sin pasar hojas
const WORLD0 = { desktop: .8, mobile: .6 }; // escala del mundo con el libro cerrado en el primer slide
const THICK = .075;   // grosor del libro respecto del ancho de una página
let leaves = [], N = 0, T = 0, mobile = false, cur = 0, target = 0, perFlip = 1, th = 0, snapTimer, anim = null, E = {};

function face(f, side, n) {
  const el = document.createElement("div");
  el.className = `face ${side} ${f ? f.cls : "blank"}`;
  if (f?.title === "Miembros") el.classList.add("members-page");
  if (f) el.innerHTML = f.html + (f.cls === "cover" ? "" : `<span class="pnum">${String(n).padStart(2,"0")}</span>`);
  return el;
}

// Cada hoja tiene dos caras completas: texto y textura nunca se recortan en tiras.
function makeLeaf(a, b, nFront) {
  const leaf = document.createElement("div");
  leaf.className = "leaf";
  leaf.append(face(a, "front", nFront), face(b, "back", nFront + 1));
  return leaf;
}

function build() {
  mobile = mq.matches;
  book.innerHTML = `<div class="shadow r"></div><div class="shadow l"></div><div class="board l"></div><div class="board r"></div>
    <div class="edge er"></div><div class="edge et r"></div><div class="edge eb r"></div>
    <div class="edge el"></div><div class="edge et l"></div><div class="edge eb l"></div>
    <div class="spine"></div><div class="ribbon"></div>`;
  E = { er: ".edge.er", etr: ".edge.et.r", ebr: ".edge.eb.r", el: ".edge.el", etl: ".edge.et.l", ebl: ".edge.eb.l",
        spine: ".spine", sr: ".shadow.r", sl: ".shadow.l", bl: ".board.l", br: ".board.r", rib: ".ribbon" };
  for (const k in E) E[k] = book.querySelector(E[k]);
  leaves = [];
  const pairs = [];
  // Celular usa el mismo libro de doble página que escritorio; la cámara encuadra una página a la vez.
  for (let i = 0; i < FACES.length; i += 2) pairs.push([FACES[i], FACES[i+1] || null]);
  pairs.forEach(([a, b], i) => {
    const leaf = makeLeaf(a, b, i*2 + 1);
    leaf.addEventListener("click", e => {
      if (mobile || e.target.closest("a,button,label,input")) return;
      goTo(Math.round(target) + (cur - INTRO > i + .5 ? -1 : 1));
    });
    book.append(leaf); leaves.push(leaf);
  });
  N = leaves.length;
  // celular: portada, luego por cada doble página "izquierda" y "derecha", y la contratapa = 2N vistas
  T = INTRO + (mobile ? 2 * N - 1 : N);
  const wpx = book.offsetWidth / 2;
  $("#hint").innerHTML = mobile ? 'Deslizá para abrir el libro <span>←</span>' : 'Scrolleá para abrir el libro <span>↓</span>';
  th = wpx * THICK / N;
  book.style.setProperty("--d", (th * N) + "px");
  perFlip = innerHeight * .75;
  scroller.style.height = (T * perFlip + innerHeight) + "px";

  dotsEl.innerHTML = "";
  FACES.forEach((f, i) => {
    if (!f.title) return;
    const pos = (mobile ? i : Math.ceil(i / 2)) + INTRO;
    const b = document.createElement("button");
    b.dataset.t = f.title; b.dataset.p = pos; b.setAttribute("aria-label", f.title);
    b.onclick = () => goTo(pos);
    dotsEl.append(b);
  });
  layoutDecor(wpx);
  refreshMemberPhotos();
  render(true);
}

// Decoraciones de la mesa: posiciones [x, y, tamaño, giro°] en anchos de página, centradas en el libro.
// Con pantallas anchas van a los costados; en pantallas altas (tablet vertical, celular) arriba y abajo.
const DECOR_SIDES = { print: [1.15, -.35, .6, 7], coins: [1, .5, .34, -10], note: [-1.05, .15, .5, -6] };
const DECOR_STACK = { print: [.3, -1.3, .6, 6], note: [.2, 1.12, .5, -5], coins: [.5, 1.35, .34, -10] };
function layoutDecor(wpx) {
  const s0 = mobile ? WORLD0.mobile : WORLD0.desktop;      // escala del mundo con el libro cerrado
  const vx = innerWidth / 2 / (wpx * s0), vy = innerHeight / 2 / (wpx * s0); // mitad visible, en anchos de página
  const sides = vx >= 1.65, L = structuredClone(sides ? DECOR_SIDES : DECOR_STACK);
  if (!sides) {                                            // dejar libre el cartel "Scrolléa" al pie de la pantalla
    const yb = vy - 90 / (wpx * s0);
    L.note[1] = Math.min(L.note[1], yb - .3); L.coins[1] = Math.min(L.coins[1], yb - .12);
    const free = vy - .85;                                  // alto libre sobre el libro: la foto se achica para entrar
    L.print[2] = Math.min(.6, free); L.print[1] = -(.8 + free / 2);
  }
  const k = s0, vx1 = vx * k, vy1 = vy * k; // mitad visible al terminar el primer scroll (libro de frente)
  for (const name in L) {
    const el = world.querySelector(".item." + name), [x, y, s, r] = L[name];
    const hw = s / 2 + .05, hh = s * (name === "coins" ? .28 : name === "note" ? .35 : .45) + .03; // medio alto aprox.
    const fits = vx1 - .12 >= Math.abs(x) + hw && vy1 - .05 >= Math.abs(y) + hh;
    el.hidden = (name === "print" && s < .38) || Math.abs(x) + hw > vx - .1 || Math.abs(y) + hh > vy - .02 // muy chica o no entra en pantalla
      || (Math.abs(x) - hw < .58 && Math.abs(y) - hh < .78);                   // pisaría al libro
    el.dataset.fade = fits ? "fc" : "u";                     // si al acercarse el libro quedaría cortada, se desvanece en el primer scroll
    el.style.setProperty("--x", x); el.style.setProperty("--y", y);
    el.style.setProperty("--s", s); el.style.setProperty("--r", r);
  }
}

// Cada vuelta dura ~1.3 s con aceleración y frenado, aunque el scroll sea un solo gesto
function goTo(p) {
  const to = clamp(p, 0, T) * perFlip, from = scrollY;
  if (Math.abs(to - from) < 1) return;
  const d = reduce ? 1 : (mobile ? 950 : 1300) + Math.abs(to - from) / perFlip * 220;
  anim = { from, to, d, t0: performance.now() };
}

function render(force) {
  const p = clamp(scrollY / perFlip, 0, T);
  target = p;
  cur = (reduce || force || anim) ? p : cur + (p - cur) * .09;
  if (Math.abs(p - cur) < .0005) cur = p;

  // En celular cada paso es: girar una hoja (la cámara la acompaña hasta la página izquierda)
  // o correr la vista de la página izquierda a la derecha. cam = punto del libro centrado, en anchos de página desde el lomo.
  let fc = clamp(cur - INTRO, 0, N), cam = .5, g = 0;
  if (mobile) {
    g = clamp(cur - INTRO, 0, 2 * N - 1);
    const i = Math.min(Math.floor(g), 2 * N - 2), f = g - i, k = Math.ceil(i / 2);
    fc = i % 2 ? k : k + f;
    cam = i % 2 ? lerp(-.5, .5, ease(f)) : lerp(.5, -.5, ease(f));
  }
  const u = ease(clamp(cur / INTRO));            // 0 = apoyado en la mesa, 1 = de frente a la pantalla
  const endFade = 1 - clamp((fc - (N - 1)) * 3); // contraportada: el lado derecho desaparece

  leaves.forEach((leaf, i) => {
    const raw = clamp(fc - i), t = ease(raw), lift = Math.sin(Math.PI * t);
    const z = lerp(th * (N - i), th * (i + 1), t) + lift * th * 6;
    leaf.style.transform = `translateZ(${z}px) rotateY(${-180 * t}deg)`;
    leaf.style.zIndex = t < .5 ? N + 2 - i : i + 1;
    leaf.style.setProperty("--turn-light", 1 - lift * .22);
  });

  // grosor: el bloque derecho se adelgaza y el izquierdo engorda a medida que se pasan hojas
  const Dr = th * (N - fc), Dl = th * fc;
  E.er.style.width = Dr + "px"; E.etr.style.height = Dr + "px"; E.ebr.style.height = Dr + "px";
  E.el.style.width = Dl + "px"; E.etl.style.height = Dl + "px"; E.ebl.style.height = Dl + "px";
  const rOp = endFade, lOp = clamp(fc * 3);
  [E.er, E.etr, E.ebr, E.br, E.sr].forEach(e => e.style.opacity = rOp);
  [E.el, E.etl, E.ebl, E.bl, E.sl].forEach(e => e.style.opacity = lOp);
  E.spine.style.opacity = 1 - clamp(fc * 2);
  E.rib.style.opacity = endFade;
  E.bl.style.setProperty("--lp", endFade);

  // el libro cerrado queda centrado; abierto, el lomo queda en el medio
  const x = mobile ? -cam : -.5 + .5 * ease(clamp(fc)) + .5 * ease(clamp(fc - (N - 1)));
  // La vista oblicua inicial sigue la mesa; el primer scroll acerca y endereza el libro.
  // Perspectiva real (sin shear): la mesa se inclina como vista desde una silla y el grosor del libro proyecta solo.
  const ws = mobile ? lerp(WORLD0.mobile, 1, u) : lerp(WORLD0.desktop, 1, u);
  world.style.transform = `scale(${ws}) matrix3d(1,0,0,0,0,1,0,0,0,0,1,${-1 / 2400},0,0,0,1) rotateX(${12 * (1 - u)}deg)`;
  // El libro queda apoyado en ángulo sobre la mesa; la mesa (foto) no rota, así cubre siempre la pantalla.
  book.style.transform = `rotateZ(${-9 * (1 - u)}deg) translateX(calc(var(--w) * ${x}))`;
  book.style.setProperty("--open", u);
  world.style.setProperty("--u", u);
  world.style.setProperty("--ts", lerp(1.12, 1, u) / ws);   // la foto de la mesa mantiene una escala neta que cubre la pantalla
  world.style.setProperty("--fc", clamp(fc));

  $("#hint").style.opacity = cur < .05 ? 1 : 0;
  const pager = $("#pager");
  pager.textContent = `${Math.round(g) + 1} / ${2 * N}`;
  pager.style.opacity = mobile && cur > INTRO - .05 ? 1 : 0;
  const at = Math.round(cur);
  dotsEl.querySelectorAll("button").forEach((b, k, all) => {
    const nxt = all[k+1] ? +all[k+1].dataset.p : Infinity;
    b.classList.toggle("on", at >= +b.dataset.p && at < nxt);
  });
}

function loop(now) {
  if (anim) {
    const k = clamp((now - anim.t0) / anim.d);
    scrollTo(0, anim.from + (anim.to - anim.from) * ease(k));
    if (k >= 1) anim = null;
  }
  render(); requestAnimationFrame(loop);
}

// al soltar el scroll, "asienta" la página en el entero más cercano
addEventListener("scroll", () => {
  clearTimeout(snapTimer);
  snapTimer = setTimeout(() => {
    if (anim) return;
    const p = scrollY / perFlip, r = Math.round(p);
    if (Math.abs(p - r) > .02) goTo(r);
  }, 220);
}, { passive: true });
addEventListener("wheel", e => {
  if ($("#member-photo-help").open) return;
  e.preventDefault();
  if (anim || Math.abs(e.deltaY) < 4) return;
  goTo(Math.round(target) + Math.sign(e.deltaY));
}, { passive: false });
addEventListener("keydown", e => {
  if ($("#member-photo-help").open || e.target.closest("input,button,textarea,select")) return;
  if (["ArrowRight","ArrowDown","PageDown"," "].includes(e.key)) { e.preventDefault(); goTo(Math.round(target) + 1); }
  if (["ArrowLeft","ArrowUp","PageUp"].includes(e.key)) { e.preventDefault(); goTo(Math.round(target) - 1); }
});
document.addEventListener("click", e => { if (e.target.id === "restart") { e.preventDefault(); goTo(0); } });
// Celular: deslizar (o tocar el borde derecho/izquierdo de la pantalla) pasa o vuelve una página.
let touch0 = null;
addEventListener("touchstart", e => {
  touch0 = mobile && e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
}, { passive: true });
addEventListener("touchmove", e => { if (touch0 && !$("#member-photo-help").open) e.preventDefault(); }, { passive: false });
addEventListener("touchend", e => {
  if (!touch0) return;
  const dx = e.changedTouches[0].clientX - touch0.x, dy = e.changedTouches[0].clientY - touch0.y;
  touch0 = null;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;            // fue un toque: lo resuelve el click
  goTo(Math.round(target) - Math.sign(Math.abs(dx) > Math.abs(dy) ? dx : dy));
});
document.addEventListener("click", e => {
  if (!mobile || !e.target.closest("#stage") || e.target.closest("a,button,label,input,dialog")) return;
  goTo(Math.round(target) + (e.clientX > innerWidth / 2 ? 1 : -1));
});
const rebuild = () => { const k = target; build(); scrollTo(0, Math.min(k, T) * perFlip); };
addEventListener("resize", rebuild);
mq.addEventListener("change", rebuild);

history.scrollRestoration = "manual";
build();
const m = location.hash.match(/p=([\d.]+)/);
scrollTo(0, m ? clamp(+m[1], 0, T) * perFlip : 0);
requestAnimationFrame(loop);
