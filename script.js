import { MEMBERS } from "./members.js";
import { refreshMemberPhotos } from "./member-photos.js";

/* ====== CONTENIDO (editá acá) ====== */
const LINKS = {
  telegram: "https://t.me/pibeslibertariossalta",
  cafecito: "https://cafecito.app/pibeslibertariossla",
  beacons:  "https://beacons.ai/pibeslibertariossalta",
};
const POSTS = [
  { date: "08/10/2026", title: "Verdad y justicia por Vicente Cordeyro",
    text: "Esto no tiene que seguir repitiéndose. Por las vidas y las familias víctimas del estado provincial salteño: marchemos juntos." },
  { date: "25/09/2026", title: "La batalla cultural, ahora más que nunca",
    text: "Reunión para compartir ideas, conocernos y organizarnos. La batalla cultural se da entre todos." },
];
/* Cada cara = una página. 'ye' amarilla / 'bk' negra. Orden: frente, dorso, frente, dorso... */
const FACES = [
  { cls: "cover", title: "Portada", html: `
      <div class="frame">
        <div class="small foil">SALTA · ARGENTINA</div>
        <svg class="orn" viewBox="0 0 120 80"><circle cx="60" cy="40" r="14"/><path d="M60 14v-8M60 74v-8M34 40h-8M94 40h-8M41 21l-6-6M85 59l6 6M79 21l6-6M35 65l6-6"/><path d="M10 40c14 0 22-6 26-14M110 40c-14 0-22-6-26-14M10 40c14 0 22 6 26 14M110 40c-14 0-22 6-26 14"/></svg>
        <h1 class="foil">Pibes<br>Libertarios</h1>
        <div class="sub foil">y su <b>batalla cultural</b></div>
        <div class="small foil" style="margin-top:.8em">· CRÓNICAS DE LA LIBERTAD · LIBRO I ·</div>
      </div>` },
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
  { cls: "ye", title: "Publicaciones", html: `
      <div class="kicker">Capítulo III</div><h2>Publicaciones</h2><div class="rule"></div>
      ${postCard(POSTS[0])}
      <p style="margin-top:auto">Seguí leyendo en la página siguiente →</p>` },
  { cls: "bk", html: `
      <div class="kicker">Capítulo III · cont.</div>
      ${postCard(POSTS[1])}
      <p>Más novedades, material audiovisual y convocatorias en nuestro Telegram.</p>
      <a class="btn" href="${LINKS.telegram}" target="_blank" rel="noopener">Ver más novedades</a>` },
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
  { cls: "cover", title: "Fin", html: `
      <div class="frame">
        <div class="small foil">FIN DEL LIBRO I</div>
        <svg class="orn" viewBox="0 0 120 80"><circle cx="60" cy="40" r="14"/><path d="M60 14v-8M60 74v-8M34 40h-8M94 40h-8M41 21l-6-6M85 59l6 6M79 21l6-6M35 65l6-6"/><path d="M10 40c14 0 22-6 26-14M110 40c-14 0-22-6-26-14M10 40c14 0 22 6 26 14M110 40c-14 0-22 6-26 14"/></svg>
        <h1 class="foil" style="font-size:1.9em!important">La batalla<br>continúa</h1>
        <div class="sub foil">Viva la <b>libertad</b></div>
        <a class="btn" href="#top" id="restart">Volver al inicio</a>
      </div>` },
];
function postCard(p){ return `<div class="card"><time>${p.date}</time><h3>${p.title}</h3><p>${p.text}</p></div>`; }

/* ====== MOTOR DEL LIBRO ====== */
const $ = s => document.querySelector(s);
const book = $("#book"), world = $("#world"), scroller = $("#scroller"), dotsEl = $("#dots");
const mq = matchMedia("(max-width:760px)");
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
const INTRO = 1;      // primer scroll: el libro se acerca y queda de frente, sin pasar hojas
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
  if (mobile) FACES.forEach(f => pairs.push([f, null]));
  else for (let i = 0; i < FACES.length; i += 2) pairs.push([FACES[i], FACES[i+1] || null]);
  pairs.forEach(([a, b], i) => {
    const leaf = makeLeaf(a, b, mobile ? i + 1 : i*2 + 1);
    leaf.addEventListener("click", e => {
      if (e.target.closest("a,button,label,input")) return;
      goTo(Math.round(target) + (cur - INTRO > i + .5 ? -1 : 1));
    });
    book.append(leaf); leaves.push(leaf);
  });
  N = mobile ? leaves.length - 1 : leaves.length;
  T = N + INTRO;
  const wpx = mobile ? book.offsetWidth : book.offsetWidth / 2;
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
  refreshMemberPhotos();
  render(true);
}

// Cada vuelta dura ~1.3 s con aceleración y frenado, aunque el scroll sea un solo gesto
function goTo(p) {
  const to = clamp(p, 0, T) * perFlip, from = scrollY;
  if (Math.abs(to - from) < 1) return;
  const d = reduce ? 1 : 1300 + Math.abs(to - from) / perFlip * 220;
  anim = { from, to, d, t0: performance.now() };
}

function render(force) {
  const p = clamp(scrollY / perFlip, 0, T);
  target = p;
  cur = (reduce || force || anim) ? p : cur + (p - cur) * .09;
  if (Math.abs(p - cur) < .0005) cur = p;

  const fc = clamp(cur - INTRO, 0, N);           // páginas ya pasadas (continuo)
  const u = ease(clamp(cur / INTRO));            // 0 = apoyado en la mesa, 1 = de frente a la pantalla
  const endFade = 1 - clamp((fc - (N - 1)) * 3); // contraportada: el lado derecho desaparece

  leaves.forEach((leaf, i) => {
    const raw = clamp(fc - i), t = ease(raw), lift = Math.sin(Math.PI * t);
    const z = lerp(th * (N - i), th * (i + 1), t) + lift * th * 6;
    leaf.style.transform = `translateZ(${z}px) rotateY(${-180 * t}deg)`;
    leaf.style.zIndex = t < .5 ? N + 2 - i : i + 1;
    leaf.style.visibility = (mobile && t >= 1) ? "hidden" : "visible";
    leaf.style.setProperty("--turn-light", 1 - lift * .22);
  });

  // grosor: el bloque derecho se adelgaza y el izquierdo engorda a medida que se pasan hojas
  const Dr = th * (N - fc), Dl = th * fc;
  E.er.style.width = Dr + "px"; E.etr.style.height = Dr + "px"; E.ebr.style.height = Dr + "px";
  E.el.style.width = Dl + "px"; E.etl.style.height = Dl + "px"; E.ebl.style.height = Dl + "px";
  const rOp = mobile ? 1 : endFade, lOp = mobile ? 0 : clamp(fc * 3);
  [E.er, E.etr, E.ebr, E.br, E.sr].forEach(e => e.style.opacity = rOp);
  [E.el, E.etl, E.ebl, E.bl, E.sl].forEach(e => e.style.opacity = lOp);
  E.spine.style.opacity = 1 - clamp(fc * 2);
  E.rib.style.opacity = mobile ? 0 : endFade;
  E.bl.style.setProperty("--lp", endFade);

  // el libro cerrado queda centrado; abierto, el lomo queda en el medio
  const x = mobile ? 0 : -.5 + .5 * ease(clamp(fc)) + .5 * ease(clamp(fc - (N - 1)));
  // La vista oblicua inicial sigue la mesa; el primer scroll acerca y endereza el libro.
  const depth = Math.SQRT1_2 * (1 - u);
  world.style.transform = `scale(${mobile ? lerp(.66, .8, u) : lerp(.86, 1, u)}) matrix3d(1,0,0,0,0,1,0,0,${-depth},${-depth},1,${-u / 2600},0,0,0,1) rotateX(${30 * (1 - u)}deg) rotateZ(${-14 * (1 - u)}deg)`;
  book.style.transform = `translateX(calc(var(--w) * ${x}))`;
  book.style.setProperty("--open", u);

  $("#hint").style.opacity = cur < .05 ? 1 : 0;
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
const rebuild = () => { const k = target; build(); scrollTo(0, Math.min(k, T) * perFlip); };
addEventListener("resize", rebuild);
mq.addEventListener("change", rebuild);

history.scrollRestoration = "manual";
build();
const m = location.hash.match(/p=([\d.]+)/);
scrollTo(0, m ? clamp(+m[1], 0, T) * perFlip : 0);
requestAnimationFrame(loop);
