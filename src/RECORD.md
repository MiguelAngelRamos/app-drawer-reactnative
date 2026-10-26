# `Record` en TypeScript

## Teoría

`Record<K, T>` es un **utility type** (tipo utilitario) que construye un tipo objeto cuyas claves son de tipo `K` y cuyos valores son de tipo `T`. Está definido en la librería estándar de TypeScript como un *mapped type*:

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

Desglosando la definición:

- `K extends keyof any`: `K` debe ser un tipo válido como clave de objeto, es decir, `string | number | symbol` (o uniones literales de ellos).
- `[P in K]`: itera sobre cada miembro de la unión `K` y crea una propiedad por cada uno.
- `T`: el tipo que tendrá el valor de **todas** esas propiedades.

Es decir, `Record` sirve para decir: "un objeto donde cada clave de este conjunto apunta a un valor de este tipo".

## Dos usos distintos según cómo sea `K`

### 1. `K` es una unión de literales: claves finitas y conocidas

```ts
type Rol = 'admin' | 'editor' | 'lector';

const permisos: Record<Rol, string[]> = {
  admin: ['crear', 'editar', 'eliminar'],
  editor: ['crear', 'editar'],
  lector: ['ver'],
};
```

Aquí el compilador **exige exhaustividad**: si falta una clave (`lector`) o sobra una (`invitado`), hay error de compilación. Esta es la mayor ventaja de `Record` frente a un tipo indexado genérico.

```ts
const incompleto: Record<Rol, string[]> = {
  admin: [],
  editor: [],
  // Error: Property 'lector' is missing
};
```

### 2. `K` es `string` (o `number`): claves dinámicas

```ts
const stockPorSku: Record<string, number> = {};

stockPorSku['ABC-123'] = 40;
stockPorSku['XYZ-999'] = 12;
```

Con `K = string`, `Record<string, number>` equivale a un *index signature*:

```ts
{ [clave: string]: number }
```

En este caso **no hay exhaustividad**, porque el conjunto de claves es infinito. Cualquier string es válida.

## Diferencia clave con `noUncheckedIndexedAccess`

Con `Record<string, T>`, al leer una clave TypeScript asume que existe:

```ts
const valor = stockPorSku['no-existe']; // tipo: number (pero en runtime es undefined)
```

Si activas `noUncheckedIndexedAccess` en `tsconfig.json`, el tipo pasa a ser `number | undefined`, que es más honesto. Con uniones literales (`Record<Rol, ...>`) este problema no existe, porque las claves están garantizadas.

## Ejemplo de proyecto real

Un caso típico en una API NestJS: mapear códigos de error de dominio a mensajes HTTP, garantizando que **ningún código quede sin manejar**.

```ts
enum CodigoError {
  PACIENTE_NO_ENCONTRADO = 'PACIENTE_NO_ENCONTRADO',
  CITA_DUPLICADA = 'CITA_DUPLICADA',
  SIN_PERMISOS = 'SIN_PERMISOS',
}

interface ErrorHttp {
  status: number;
  mensaje: string;
}

const MAPA_ERRORES: Record<CodigoError, ErrorHttp> = {
  [CodigoError.PACIENTE_NO_ENCONTRADO]: {
    status: 404,
    mensaje: 'El paciente no existe',
  },
  [CodigoError.CITA_DUPLICADA]: {
    status: 409,
    mensaje: 'Ya existe una cita en ese horario',
  },
  [CodigoError.SIN_PERMISOS]: {
    status: 403,
    mensaje: 'No tiene permisos para esta operación',
  },
};

function traducirError(codigo: CodigoError): ErrorHttp {
  return MAPA_ERRORES[codigo]; // siempre definido, sin undefined posible
}
```

Si mañana alguien agrega `CodigoError.PAGO_RECHAZADO` al enum y olvida agregarlo al mapa, **el proyecto no compila**. Eso reemplaza un `switch` con `default` que oculta errores en runtime.

## Combinaciones frecuentes

**Con `Partial`**, cuando no todas las claves son obligatorias:

```ts
const overrides: Partial<Record<Rol, string[]>> = {
  admin: ['auditar'],
};
```

**Con `keyof typeof`**, para derivar las claves desde un objeto existente:

```ts
const config = { dev: 'localhost', prod: 'api.empresa.cl' };

type Ambiente = keyof typeof config; // 'dev' | 'prod'

const puertos: Record<Ambiente, number> = {
  dev: 3000,
  prod: 443,
};
```

**Con valores anidados o genéricos:**

```ts
type Respuesta<T> = Record<string, T[]>;

const agrupado: Respuesta<number> = {
  enero: [10, 20],
  febrero: [30],
};
```

## `Record` vs `interface` vs `Map`

| Herramienta | Cuándo usarla |
|---|---|
| `interface` / `type` literal | Objeto con forma fija y claves heterogéneas, cada una con su propio tipo de valor |
| `Record<K, T>` | Todas las claves comparten **el mismo tipo de valor** |
| `Map<K, V>` | Claves que no son string/number/symbol (objetos, por ejemplo), o cuando importa el orden de inserción y las operaciones frecuentes de alta/baja |

## Resumen

- `Record<K, T>` = objeto con claves `K` y valores todos de tipo `T`.
- Es un *mapped type* sobre `K`.
- Con `K` literal obtienes **exhaustividad verificada en compilación**.
- Con `K = string` es un diccionario abierto, equivalente a un index signature.
- Su uso más valioso: tablas de lookup tipadas que obligan a cubrir todos los casos de un enum o unión.