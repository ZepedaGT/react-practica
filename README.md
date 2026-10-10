# Sistema de gestión de empleados

Aplicación web para gestionar empleados, desarrollada con React y TypeScript. Permite trabajar con operaciones CRUD mediante una API REST y cuenta con un sistema de inicio de sesión.

## Tecnologías utilizadas

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* Zustand
* TanStack Query
* JSON Server / API REST

## Funcionalidades

* Inicio y cierre de sesión.
* Gestión de empleados.
* Consultar, crear, editar y eliminar empleados.
* Consumo de API mediante Axios.
* Manejo del estado y las peticiones.
* Interfaz adaptable y sencilla.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone URL_DE_TU_REPOSITORIO
   ```

2. Entrar a la carpeta del proyecto:

   ```bash
   cd NOMBRE_DEL_PROYECTO
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Crear el archivo `.env.local` en la raíz del proyecto:

   ```env
   VITE_API_URL=http://localhost:3001
   ```

5. Iniciar el proyecto:

   ```bash
   npm run dev
   ```

## API

El proyecto utiliza una API REST para las operaciones de empleados.

Endpoint principal:

```text
GET /employees
```

Para trabajar localmente, la API debe estar disponible en `http://localhost:3001`.

En producción, se configura la URL pública de la API mediante la variable de entorno `VITE_API_URL`.

## Despliegue

El frontend está preparado para desplegarse en Vercel. Es necesario configurar la variable `VITE_API_URL` con la dirección pública de la API.

## Autor

Proyecto académico desarrollado como práctica de desarrollo frontend.
