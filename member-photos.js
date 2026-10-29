import { MEMBERS } from "./members.js";

const book = document.querySelector("#book");
const dialog = document.querySelector("#member-photo-help");

export function refreshMemberPhotos() {
  const status = book.querySelector(".member-photo-status");
  if (status) status.textContent = "Las fotos se actualizan desde GitHub.";
  for (const image of book.querySelectorAll("img[data-member-photo]")) {
    const member = MEMBERS.find(item => item.id === image.dataset.memberPhoto);
    if (!member?.photo) {
      image.hidden = true;
      image.removeAttribute("src");
      image.parentElement.classList.remove("has-photo");
      continue;
    }
    // Relativo al módulo, también cuando Pages publica dentro de /repositorio/.
    const url = new URL(member.photo, import.meta.url).href;
    image.onerror = () => {
      image.hidden = true;
      image.parentElement.classList.remove("has-photo");
      if (status) status.textContent = `Revisá la ruta de la foto de ${member.name} en members.js.`;
    };
    if (image.src !== url) image.src = url;
    image.hidden = false;
    image.parentElement.classList.add("has-photo");
  }
}

book.addEventListener("click", event => {
  if (event.target.closest(".member-photo-edit")) dialog.showModal();
});

// En el dominio predeterminado de Pages se puede abrir el repositorio sin configurarlo.
const owner = location.hostname.match(/^([a-z0-9-]+)\.github\.io$/i);
if (owner) {
  const directory = new URL(".", import.meta.url).pathname;
  const repository = directory.split("/").filter(Boolean)[0] || `${owner[1]}.github.io`;
  const link = dialog.querySelector(".photo-help-github");
  link.href = `https://github.com/${owner[1]}/${encodeURIComponent(decodeURIComponent(repository))}`;
  link.hidden = false;
}
