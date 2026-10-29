import { MEMBERS } from "./members.js";

const book = document.querySelector("#book");

export function refreshMemberPhotos() {
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
      console.error(`No se pudo cargar la foto de ${member.name}: revisá la ruta "${member.photo}" en members.js.`);
    };
    if (image.src !== url) image.src = url;
    image.hidden = false;
    image.parentElement.classList.add("has-photo");
  }
}
