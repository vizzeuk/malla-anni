# Malla Curricular Interactiva - Enfermería

Sistema de gestión de malla curricular con seguimiento de notas y progreso académico.

## 🚀 Configuración Inicial

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a la sección "SQL Editor" y ejecuta el siguiente script:

```sql
-- Crear tabla de ramos
CREATE TABLE subjects (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  semester INTEGER NOT NULL,
  credits INTEGER NOT NULL,
  prerequisites TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Crear tabla de estados de ramos
CREATE TABLE subject_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  subject_id TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'approved', 'failed', 'in-progress')) DEFAULT 'pending',
  final_grade DECIMAL(3,1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, subject_id)
);

-- Crear tabla de notas
CREATE TABLE grades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  subject_id TEXT NOT NULL,
  name TEXT NOT NULL,
  grade DECIMAL(3,1) NOT NULL,
  percentage INTEGER NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Habilitar Row Level Security
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para subjects
CREATE POLICY "Users can view their own subjects" ON subjects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subjects" ON subjects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subjects" ON subjects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subjects" ON subjects
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas de seguridad para subject_status
CREATE POLICY "Users can view their own status" ON subject_status
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own status" ON subject_status
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own status" ON subject_status
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own status" ON subject_status
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas de seguridad para grades
CREATE POLICY "Users can view their own grades" ON grades
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own grades" ON grades
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own grades" ON grades
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own grades" ON grades
  FOR DELETE USING (auth.uid() = user_id);
```

4. Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

5. Completa las variables en `.env` con tus credenciales de Supabase:
   - Ve a Settings > API en tu proyecto de Supabase
   - Copia el "Project URL" y "anon public" key

### 3. Ejecutar el Proyecto

```bash
npm run dev
```

## 📚 Funcionalidades

- ✅ Autenticación con Supabase
- ✅ Visualización de malla curricular por semestres
- ✅ Marcar ramos como: Pendiente, En Curso, Aprobado, Reprobado
- ✅ Agregar notas con porcentajes
- ✅ Cálculo automático de promedio final
- ✅ Sistema de notas chileno (aprobado ≥ 4.0)
- ✅ Sincronización en la nube

## 🎨 Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase (Auth + Database)
- Lucide React (iconos)

## 📝 Notas

Los ramos actuales son de ejemplo. Edita el archivo `src/data/subjects.ts` para agregar los ramos reales de la carrera.
