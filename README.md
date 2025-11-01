
# EVA1_DESARROLLO_DE_APLICACIONES_MOVILES

Documentación del proyecto

Proyecto móvil construido con Expo y TypeScript. Utiliza el enrutamiento basado en archivos (file-based routing) y una estructura modular con pantallas, componentes y contexto de autenticación.

## Tecnologías principales

- Expo (React Native)
- TypeScript
- ESLint (configuración incluida)
- Estructura basada en `app/` con enrutamiento por archivos (router)

## Requisitos previos

Instala lo siguiente en tu máquina de desarrollo:

- Node.js (v14+ recomendado)
- npm o yarn
- (Opcional) Expo CLI: `npm install -g expo-cli` — no es obligatorio si usas `npx expo`.

## Instalación

1. Clona el repositorio y sitúate en la carpeta del proyecto.

2. Instala dependencias:

```bash
npm install
# o
# yarn install
```

3. Inicia el servidor de desarrollo de Expo:

```bash
npx expo start
# o si tienes expo-cli global
# expo start
```

En la salida podrás elegir ejecutar en emulador Android, simulador iOS (macOS) o Expo Go.

## Estructura del proyecto

Vista principal del árbol de carpetas (las más relevantes):

- `app/`
   - `_layout.tsx` — Layout raíz / proveedor de navegación.
   - `login.tsx` — Pantalla de login.
   - `modal.tsx` — Pantalla/modal reutilizable.
   - `(tabs)/` — Carpeta con pantallas bajo la pestaña principal
      - `_layout.tsx` — Layout de pestañas.
      - `explore.tsx` — Pantalla "Explorar".
      - `index.tsx` — Página principal (home) de las tabs.
- `components/`
   - `external-link.tsx` — Componente para enlaces externos.
   - `haptic-tab.tsx` — Manejo de hápticos al cambiar pestañas.
   - `context/`
      - `auth-context.tsx` — Contexto de autenticación (login/logout, estado de usuario).
   - `ui/`
      - `icon-symbol.ios.tsx` — Iconografía específica iOS.
      - `icon-symbol.tsx` — Iconografía común.
- `assets/` — Imágenes y recursos estáticos (p. ej. `assets/images/`).
- `constants/`
   - `theme.ts` — Variables de tema y estilos globales.
- `scripts/`
   - `reset-project.js` — Script proporcionado para resetear el proyecto (por el starter de Expo).
- `app.json`, `tsconfig.json`, `expo-env.d.ts`, `package.json`, `eslint.config.js` — configuraciones del proyecto.

## Pantallas y navegación

El proyecto usa el enrutamiento de Expo (file-based routing). Cualquier archivo `.tsx` dentro de `app/` representa una ruta. Los archivos `_layout.tsx` definen layouts y wrappers para rutas hijas.

- `login.tsx`: Pantalla de inicio de sesión. Debería usar `auth-context` para iniciar sesión y persistir el estado.
- `(tabs)/index.tsx` y `(tabs)/explore.tsx`: Pantallas accesibles desde la navegación por pestañas.

## Componentes y contexto

- `components/context/auth-context.tsx`: Contiene la lógica de autenticación. Revisa este archivo para ver las funciones públicas (p. ej. `signIn`, `signOut`, `user`).
- `components/ui/*`: Contiene componentes UI reutilizables (íconos, etc.).

## Estilo y tema

Las variables de diseño globales y el tema están en `constants/theme.ts`. Sigue ese archivo para mantener consistencia visual.

## Scripts útiles

Algunos comandos que suelen funcionar en este tipo de proyectos:

```bash
npm install
npx expo start
npm run lint    # si está configurado en package.json
npm run build   # configuración de build depende de package.json
node ./scripts/reset-project.js  # reinicia el proyecto según el starter
```

Consulta `package.json` para ver los scripts exactos disponibles.

## Linting y TypeScript

- El proyecto incluye `tsconfig.json` y `eslint.config.js`. Ejecuta el linter y el compilador de TypeScript desde los scripts definidos en `package.json` si están configurados.

## Consejos de desarrollo

- Lee `components/context/auth-context.tsx` antes de modificar pantallas que dependan del estado de autenticación.
- Usa el enrutamiento basado en archivos: para añadir una ruta nueva crea un archivo `.tsx` en `app/` o una subcarpeta con su propio `_layout.tsx` si necesitas un layout específico.
- Mantén los recursos en `assets/images/` y referencia con `import` para asegurar el empaquetado correcto en Expo.

## Pruebas

No hay tests incluidos por defecto. Recomendación:

- Añadir `jest` o `vitest` para tests unitarios.
- Empezar con pruebas para `auth-context` y las funciones utilitarias.

## Licencia

Incluye la licencia que prefieras (por ejemplo, MIT). Este archivo no contiene licencia explícita; añade `LICENSE` si es necesario.

## Contacto

Si necesitas ayuda con este repositorio, deja un issue o contacta al responsable del proyecto.

---

Resumen: este README ofrece un punto de partida para entender la estructura y cómo ejecutar el proyecto. Si quieres, puedo:

- Añadir comandos exactos tomados de `package.json`.
- Generar un archivo CONTRIBUTING.md más detallado.
- Añadir ejemplos de uso de `auth-context` o un diagrama simple de navegación.

