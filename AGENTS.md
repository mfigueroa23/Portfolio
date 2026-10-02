# AGENTS.md — Portfolio

## Proyecto

Portafolio personal de Marco Figueroa (marco.figueroa-sanchez.com): SPA de una página con secciones (hero, about, experience, projects, testimonials, contact).
Angular 22 standalone con SSR en modo estático (prerender de todas las rutas) y Tailwind CSS v4. Sin código de servidor: el contenido del sitio y el formulario de contacto pasan por la API `https://api.figueroa-sanchez.com` (repo `api`); el prerender embebe el contenido y el navegador lo vuelve a pedir.
Estructura: `src/app/core/` (config, interfaces y servicios HTTP de la API), `src/app/components/` (UI reutilizable), `src/app/sections/` (bloques de la home), `src/app/pages/` (rutas lazy), `public/` (assets estáticos).

## Comandos

- Instalar: `pnpm install`
- Ejecutar: `pnpm start` (dev) · `pnpm build` (producción); ambos pasan por `scripts/ng.mjs`, que toma `API_URL` del entorno o de `.env` (copiar `.env.example`) y, si no está, usa `https://api.figueroa-sanchez.com`. En Vercel: Project Settings → Environment Variables → `API_URL`. En el CI: secret `API_URL` del repo, que `release.yaml` pasa al build y a la imagen.
- Imagen Docker: `docker build --build-arg API_URL=<url> .` pone el origen de la API en el CSP `connect-src` de `nginx.conf` (placeholder `__API_ORIGIN__`); debe ser la misma URL usada en `pnpm build`. Sin el argumento, usa producción.
- Tests: `pnpm test`
- Lint/formato: `pnpm exec prettier --check .` (`--write` para corregir)

## Estilo y convenciones

- TypeScript ~6, Angular 22: componentes standalone, signals (`signal`, `input`, `computed`), sin NgModules ni decoradores `@Input`.
- Archivos sin sufijo `.component`: `button.ts`/`.html`/`.css`/`.spec.ts`; clase `Button`, selector `app-button`.
- Estilos con utilidades Tailwind; CSS por componente mínimo (budget 4kB).
- Prettier: 100 columnas, comillas simples, 2 espacios.
- Idioma: código, UI y commits en inglés; respuestas al usuario en español.
- Commits con Conventional Commits.

## Reglas

- Lee docs/constitution.md y la spec activa (`docs/specs/NNN-*/spec.md`) antes de tocar código.
- No añadir dependencias, ni cambiar a SSR dinámico, ni tocar `angular.json`/budgets sin preguntar.
- No exponer secretos: la web no maneja secretos (viven en la API); nunca en `src/` ni en el repo.
- No modificar contenido personal (experiencia, CV en `public/`, datos de contacto) sin indicación explícita.

## Al terminar cualquier tarea

- Ejecutar `pnpm test` y `pnpm build`; ambos deben pasar sin errores ni budgets excedidos.
- Ejecutar `pnpm exec prettier --check` sobre los archivos tocados.
