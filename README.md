# 🅰️ Nombre del Proyecto (Angular)

Reto técnico Fullstack Developer. Sistema de gestion de reclamos de customer care.

**Estado:** `MVP`  
**Demo:** https://claims-intercorp-front.josephfc.dev/


---

> [!IMPORTANT]
> Debido a la necesidad de desplegar el proyecto, se utilizo el servicio de [Render](https://render.com/), el cual brinda un paquete "Free" donde el tiempo de actividad es de 15 minutos, se recomienda entrar al dominio principal de la Api `https://proof-intercorp-backend.onrender.com/` y esperar a que se despliegue el proyecto.

---

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Variables de entorno](#🔒-environment-variables)
4. [Estructura del proyecto](#🗂️-estructura-del-proyecto)
5. [Consideraciones técnicas](#🔧-consideraciones-técnicas)
6. [Desiciones técnicas](#🤔-desiciones-técnicas)
7. [Licencia](#📝-licencia)

---

## 🚀 Despliegue local

### Requisitos

- **Node.js:** `>= 20.x` (recomendado LTS)
- **pnpm:** `>= 9.x`
- **Angular CLI:** `>= 20.x`

> Verifica versiones:

```bash
node -v
pnpm -v
pnpm dlx ng version
```

### Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/josephfc/claims-intercorp-front.git
```

2. Instalar dependencias

```bash
pnpm install
```

3. Iniciar el servidor

```bash
pnpm start
```

4. Acceder a la aplicación en `http://localhost:4200`

---

## 🔒 Environment Variables

```bash
/src/environments/environment.ts // Variables globales
/src/environments/environment.development.ts // Variables de desarrollo
/src/environments/environment.prod.ts // Variables de producción
```

| Variable      | Descripción              | Ejemplo                      |
| ------------- | ------------------------ | ---------------------------- |
| `production`  | Flag de produccion       | `true`                       |
| `API_URL`     | URL de la API            | `http://localhost:8080/api/` |
| `PRODUCTION`  | Flag de produccion       | `true`                       |
| `VERSION`     | Versión del proyecto     | `1.0.0`                      |
| `NAME`        | Nombre del proyecto      | `Intercorp`                  |
| `DESCRIPTION` | Descripción del proyecto | `Intercorp`                  |
| `AUTHOR`      | Autor del proyecto       | `Joseph`                     |
| `URL_STORAGE` | URL de almacenamiento    | `http://localhost:8080`      |
| `PREFIX_CODE` | Prefijo de código        | `INT-`                       |

---

## 🗂️ Estructura del proyecto

```bash
.
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── components/         # componentes reusables (formularios, widgets, etc.)
│   │   │   ├── config/             # configuración de Angular (i18n, primeng, etc.)
│   │   │   ├── consts/             # constantes reusables
│   │   │   ├── layouts/            # layots para páginas
│   │   │   ├── servicios/          # servicios (API, states, etc.)
│   │   │   ├── types/              # tipos de datos TS
│   │   │   └── utils/              # utilidades
│   │   ├── modules/                # páginas/rutas de alto nivel
│   │   ├── app.routes.ts           # rutas de la aplicación
│   │   └── app.*
│   ├── environments/               # environment.ts / environment.prod.ts / environment.development.ts
│   ├── styles.scss                 # estilos globales (scss)
│   └── main.ts
├── angular.json
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## 🔧 Consideraciones técnicas

1. Componentes [PrimeNG](https://www.primefaces.org/primeng/) como framework de UI.
2. Gestor de paquetes [pnpm](https://pnpm.io/).
3. Herramientas de desarrollo [Angular CLI](https://cli.angular.io/).
4. Estrategia de estidos: `scss` global y [TailwindCSS](https://tailwindcss.com/).
5. HTTP: `HttpClient`, [TanStack Query](https://tanstack.com/query/v4/docs/overview).
6. Calidad: `Prettier`, `ESLint`, `Husky`, `Lint-Staged`.

## 🤔 Desiciones técnicas

1. Se tomó la desición de utilizar terminos en inglés por defecto en todo el proyecto (Base de datos, Backend, Frontend, etc.), por razones de buenas prácticas.
2. Se reemplazo la estrategia de usar una página para crear un `claim` por un modal de creación en la página del listado de `claims`.
3. Debido a la limitante con el framework de UI de PrimeNG con los inputs, se hicieron validaciones mediante condiciones y estilos de CSS, para indicar interactividad y validación.

## 📝 Licencia

Este proyecto está bajo la licencia MIT.
