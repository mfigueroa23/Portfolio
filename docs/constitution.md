# Constitución — Portfolio

1. Stack fijo: Angular 22 standalone + signals, Tailwind v4, TypeScript, pnpm. Nuevas dependencias requieren aprobación.
2. Toda ruta se prerenderiza (`outputMode: static`); el repo no contiene código de servidor: contenido y formulario pasan por la API (`src/app/core/`).
3. Cada componente tiene su `*.spec.ts`; `pnpm test` pasa antes de cada commit.
4. `pnpm build` en producción sin errores ni budgets excedidos (initial < 500kB, estilos de componente < 4kB).
5. Código formateado con Prettier (`prettier --check` limpio).
6. La web no maneja secretos; viven en la API, nunca en `src/` ni en el repo.
7. Toda entrada de usuario se valida en la API (`api.figueroa-sanchez.com`), no solo en el cliente.
8. Accesible: HTML semántico, `alt` en imágenes, foco visible en elementos interactivos.
9. Código, UI y commits en inglés; Conventional Commits.
10. Las funcionalidades nuevas parten de una spec en `docs/specs/NNN-*/`.
