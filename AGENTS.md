# AGENTS.md — Portfolio

## Proyecto

Portafolio personal de Marco Figueroa (marco.figueroa-sanchez.com): SPA de una página con secciones (hero, about, experience, projects, testimonials, contact).
Angular 22 standalone con SSR en modo estático (prerender de todas las rutas), Tailwind CSS v4 y una función serverless `api/contact.ts` que envía el formulario de contacto por email vía Brevo (`templates/contact-email.ts`).
Estructura: `src/app/components/` (UI reutilizable), `src/app/sections/` (bloques de la home), `src/app/pages/` (rutas lazy), `public/` (assets estáticos).

## Comandos

- Instalar: `pnpm install`
- Ejecutar: `pnpm start` (dev) · `pnpm build` (producción)
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
- No exponer secretos: `BREVO_API_KEY` solo en entorno del servidor; nunca en `src/`.
- No modificar contenido personal (experiencia, CV en `public/`, datos de contacto) sin indicación explícita.

## Al terminar cualquier tarea

- Ejecutar `pnpm test` y `pnpm build`; ambos deben pasar sin errores ni budgets excedidos.
- Ejecutar `pnpm exec prettier --check` sobre los archivos tocados.
