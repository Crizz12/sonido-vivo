# Sonido Vivo - Tienda Online

Proyecto frontend desarrollado para la asignatura **DSY1104 - Desarrollo Fullstack II** (Duoc UC, Escuela de Informática y Telecomunicaciones), Evaluación Parcial N°1.

## Descripción

Sitio web de una tienda de instrumentos y equipos musicales ubicada en Viña del Mar. El sistema contempla dos áreas: la tienda pública y un panel de administración.

## Tecnologías

- HTML5 (etiquetado semántico)
- CSS3 (hoja de estilos externa, diseño responsive)
- JavaScript (ES6, sin frameworks)
- localStorage para persistencia del carrito
- Git y GitHub para control de versiones

## Estructura del proyecto

```
sonido-vivo/
├── index.html              Home de la tienda
├── productos.html          Catálogo
├── carrito.html             Carrito de compras
├── login.html                Inicio de sesión
├── registro.html            Registro de usuario
├── contacto.html            Formulario de contacto
├── nosotros.html            Información de la empresa
├── blogs.html                 Listado de noticias
├── blog-1.html, blog-2.html   Detalle de noticias
├── admin/
│   ├── index.html             Dashboard del administrador
│   ├── productos.html         Mantenedor de productos
│   ├── producto-form.html     Alta/edición de producto
│   ├── usuarios.html          Mantenedor de usuarios
│   └── usuario-form.html      Alta/edición de usuario
├── css/estilos.css            Hoja de estilos externa
├── js/                        Lógica de la aplicación
└── img/                       Imágenes de productos
```

## Funcionalidades implementadas

- Catálogo de productos
- Carrito de compras con persistencia en localStorage y notificaciones
- Registro y login con validaciones de correo y contraseña en JavaScript
- Formulario de contacto con validaciones
- Selects de región/comuna
- Panel de administración con dashboard y mantenedores de productos y usuarios
- Manejo de roles (Administrador, Vendedor, Cliente)

## Cómo ejecutar

Clonar el repositorio y abrir `index.html` en el navegador (no requiere servidor ni instalación de dependencias):

```bash
git clone https://github.com/Crizz12/sonido-vivo.git
```

## Alcance de esta entrega

Esta entrega corresponde al frontend con HTML, CSS y JavaScript. La autenticación real, la persistencia en base de datos y la migración a React y Spring Boot corresponden a las entregas siguientes del proyecto semestral.

## Autor

Cristofer Cifuentes — Duoc UC, DSY1104
