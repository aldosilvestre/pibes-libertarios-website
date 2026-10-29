# Pibes Libertarios Salta

Sitio estático para GitHub Pages. No requiere Bun, un backend ni claves de edición.
Las fotos de Miembros se guardan en el repositorio y son públicas al publicar el sitio.

## Publicar en GitHub Pages

1. Subí el proyecto a la rama `main` de un repositorio, con `index.html` en la raíz.
   Conservá las carpetas `assets/`, `generated-images/`, los módulos JavaScript y
   el archivo `.nojekyll`.
2. En el repositorio, abrí **Settings → Pages**. En **Build and deployment**, elegí
   **Deploy from a branch**, la rama **main** y la carpeta **/(root)**. Guardá.
3. Esperá a que termine la publicación. La dirección del sitio aparece en esa misma
   sección. Los cambios posteriores en `main` actualizan el sitio.

Las rutas son relativas: el sitio también funciona en una dirección de proyecto
con el nombre del repositorio como subcarpeta.

## Cambiar las fotos de Miembros

1. En GitHub, abrí `assets/members/` y usá **Add file → Upload files** para subir
   las fotos. Podés usar JPG, PNG o WebP; preferí imágenes livianas.
2. Editá `members.js` desde GitHub y completá `photo` para la persona correspondiente:

   ```js
   { id: "member-01", name: "Miembro 01", role: "Coordinación", photo: "assets/members/member-01.jpg" },
   ```

3. Guardá ambos cambios con **Commit changes** y esperá la publicación de Pages.
   Todos los visitantes verán las fotos, sin iniciar sesión.

Usá rutas sin una `/` inicial y respetá mayúsculas, minúsculas y extensiones.
Para reemplazar una foto ya asociada, conservá su nombre y carpeta: no hace falta
editar `members.js` otra vez. Un campo `photo` vacío conserva la silueta de ejemplo.
Los nombres y roles se editan en ese mismo archivo.

El botón **Fotos en GitHub** del libro muestra estas instrucciones. Desde un sitio
publicado en el dominio predeterminado de Pages también permite abrir el repositorio.
Solo quienes tengan permisos en GitHub pueden modificar las imágenes públicas.

## Probar localmente

Desde esta carpeta, ejecutá un servidor estático, por ejemplo:

```sh
python3 -m http.server 8000
```

Abrí `http://localhost:8000`. Para cargar módulos JavaScript, usá HTTP en vez de
abrir `index.html` directamente como archivo.

Referencia: [configurar la publicación desde una rama](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
