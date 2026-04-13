# Tuluz Platform — Guía de Administración

Plataforma de emprendimiento consciente con impacto positivo para Latinoamérica e Iberia.

**URL de la plataforma:** https://tuluz-platform.vercel.app  
**GitHub Pages (sitio informativo):** https://tuluz0309.github.io/tuluz-platform/

---

## Índice

1. [Accesos y herramientas](#1-accesos-y-herramientas)
2. [Gestión de usuarios](#2-gestión-de-usuarios)
3. [Roles de usuario](#3-roles-de-usuario)
4. [Gestión de perfiles de emprendedoras](#4-gestión-de-perfiles-de-emprendedoras)
5. [Aprobación de perfiles](#5-aprobación-de-perfiles)
6. [Gestión de cursos](#6-gestión-de-cursos)
7. [Panel de administración](#7-panel-de-administración)
8. [Ver datos en Supabase](#8-ver-datos-en-supabase)
9. [Preguntas frecuentes](#9-preguntas-frecuentes)

---

## 1. Accesos y herramientas

Como administradora de Tuluz, manejas la plataforma desde dos lugares:

| Herramienta | URL | Para qué sirve |
|-------------|-----|----------------|
| **Plataforma** | https://tuluz-platform.vercel.app | Lo que ven las usuarias |
| **Panel Admin** | https://tuluz-platform.vercel.app/admin | Aprobar perfiles, gestionar contenido |
| **Supabase** | https://supabase.com/dashboard/project/uluyxgbltejshnuvceup | Base de datos, usuarios, roles |
| **Vercel** | https://vercel.com | Servidor donde corre la app |
| **GitHub** | https://github.com/TULUZ0309/tuluz-platform | Código fuente |

---

## 2. Gestión de usuarios

### Ver todos los usuarios registrados

1. Ve a **Supabase → Authentication → Users**
2. Verás la lista de todas las personas que se han registrado con:
   - Email
   - Nombre
   - Fecha de registro
   - Última vez que iniciaron sesión

### Crear un usuario manualmente

1. En **Authentication → Users** click en **"Add user"**
2. Ingresa email y contraseña
3. El usuario recibirá un email de confirmación

### Eliminar un usuario

1. En **Authentication → Users** click en el usuario
2. Scroll abajo → **"Delete user"**
> ⚠️ Esto elimina también todos sus datos (perfil, progreso, certificaciones).

---

## 3. Roles de usuario

Cada usuario tiene un rol que define a qué puede acceder:

| Rol | Acceso | Cuándo asignarlo |
|-----|--------|-----------------|
| `subscriber` | Solo ve la landing page | Por defecto al registrarse |
| `member` | Accede a cursos y mentora IA | Cuando paga o es aprobada |
| `corporate` | Acceso empresarial al marketplace | Para empresas B2B |
| `admin` | Control total de la plataforma | Solo para el equipo Tuluz |

### Cómo cambiar el rol de un usuario

**Opción A — Desde Supabase (recomendado):**
1. Ve a **Supabase → Table Editor → profiles**
2. Encuentra al usuario por nombre o email
3. Click en la celda de la columna `role`
4. Escribe el nuevo rol: `subscriber`, `member`, `corporate`, o `admin`
5. Presiona **Enter** o click en **Save**

**Opción B — SQL Editor (para cambios masivos):**
```sql
-- Cambiar a member
UPDATE profiles SET role = 'member' WHERE email = 'usuaria@email.com';

-- Cambiar a admin
UPDATE profiles SET role = 'admin' WHERE email = 'admin@tuluz.com';

-- Ver todos los usuarios con su rol
SELECT email, full_name, role, created_at FROM profiles ORDER BY created_at DESC;
```

---

## 4. Gestión de perfiles de emprendedoras

Cuando una usuaria completa su onboarding, crea un **perfil de emprendedora** con su negocio, sector e impacto.

### Ver todos los perfiles

1. **Supabase → Table Editor → entrepreneur_profiles**
2. Columnas importantes:
   - `business_name` — nombre del negocio
   - `sector` — sector de la emprendedora
   - `is_published` — si aparece en el marketplace (`true`/`false`)
   - `approved_at` — cuándo fue aprobado

### Ver perfiles pendientes de aprobación

```sql
SELECT ep.business_name, p.email, p.full_name, ep.created_at
FROM entrepreneur_profiles ep
JOIN profiles p ON ep.user_id = p.id
WHERE ep.is_published = false
ORDER BY ep.created_at DESC;
```

---

## 5. Aprobación de perfiles

Cuando una emprendedora completa su perfil, aparece en el panel de administración para que lo revises y apruebes antes de que sea visible en el marketplace.

### Aprobar un perfil desde el panel admin

1. Ve a **https://tuluz-platform.vercel.app/admin**
2. Verás la lista de perfiles pendientes
3. Click en el perfil para revisarlo
4. Click en **"Aprobar perfil"**
5. La emprendedora recibe un email de confirmación automáticamente

### Aprobar directamente desde Supabase

```sql
UPDATE entrepreneur_profiles
SET is_published = true, approved_at = NOW()
WHERE id = 'uuid-del-perfil';
```

---

## 6. Gestión de cursos

### Ver los cursos disponibles

1. **Supabase → Table Editor → courses**
2. El curso demo "Emprendimiento Consciente — Fundamentos" ya está creado con 3 módulos.

### Publicar o despublicar un curso

1. **Table Editor → courses**
2. Click en la celda `is_published`
3. Cambia entre `true` (visible) y `false` (oculto)

### Ver el progreso de las usuarias en los cursos

```sql
SELECT 
  p.full_name,
  p.email,
  cm.title AS modulo,
  mp.status,
  mp.exam_passed_at
FROM module_progress mp
JOIN profiles p ON mp.user_id = p.id
JOIN course_modules cm ON mp.module_id = cm.id
ORDER BY mp.created_at DESC;
```

---

## 7. Panel de administración

Accede en: **https://tuluz-platform.vercel.app/admin**

> Solo funciona si tu cuenta tiene rol `admin` en Supabase.

Desde el panel puedes:
- Ver perfiles de emprendedoras pendientes de aprobación
- Aprobar perfiles (se publica en marketplace + email automático)
- Revisar el perfil completo de cada emprendedora

---

## 8. Ver datos en Supabase

### Tablas principales

| Tabla | Contenido |
|-------|-----------|
| `profiles` | Todos los usuarios registrados + su rol |
| `entrepreneur_profiles` | Perfiles de negocio de las emprendedoras |
| `courses` | Cursos disponibles en la plataforma |
| `course_modules` | Módulos dentro de cada curso |
| `enrollments` | Qué usuaria está inscrita en qué curso |
| `module_progress` | Progreso de cada usuaria en cada módulo |
| `certifications` | Badges y certificaciones otorgadas |
| `marketplace_contacts` | Mensajes de empresas a emprendedoras |

### Estadísticas rápidas

```sql
-- Total de usuarias registradas
SELECT COUNT(*) AS total_usuarias FROM profiles;

-- Usuarias por rol
SELECT role, COUNT(*) AS cantidad FROM profiles GROUP BY role;

-- Perfiles de emprendedoras publicados en marketplace
SELECT COUNT(*) AS en_marketplace FROM entrepreneur_profiles WHERE is_published = true;

-- Certificaciones otorgadas
SELECT COUNT(*) AS certificaciones FROM certifications;
```

---

## 9. Preguntas frecuentes

**¿Una usuaria no puede acceder a los cursos?**
Su rol probablemente es `subscriber`. Cámbialo a `member` en Table Editor → profiles.

**¿Cómo agrego la clave de OpenAI cuando estén listas para activar la IA?**
1. Ve a Vercel → proyecto tuluz-platform → Settings → Environment Variables
2. Edita `OPENAI_API_KEY` y reemplaza `placeholder` con la clave real
3. Vercel redeploya automáticamente

**¿Cómo configuro un dominio propio (ej. app.tuluz.com)?**
1. Ve a Vercel → proyecto → Settings → Domains
2. Agrega tu dominio
3. Actualiza el DNS en tu proveedor de dominio

**¿Cómo hago backup de la base de datos?**
Supabase → Settings → Database → Backups. El plan gratuito guarda backups diarios por 7 días.

**¿Una usuaria olvidó su contraseña?**
Authentication → Users → click en la usuaria → "Send password recovery" — le llega un email automáticamente.

**¿Cómo cambio el email que aparece en los correos de la plataforma?**
Los emails se envían desde Resend. Configura el dominio remitente en resend.com → Domains.

---

## Servicios y costos

| Servicio | Plan | Costo |
|----------|------|-------|
| Vercel | Hobby | $0/mes |
| Supabase | Free | $0/mes |
| Resend | Free (3,000 emails/mes) | $0/mes |
| OpenAI (wave 2) | Pay per use | ~$5–20/mes según uso |
| GitHub | Public repo | $0/mes |

---

*Plataforma desarrollada para Tuluz — Asociación sin fines de lucro.*
