import type { Subject } from '../types'

export const NURSING_SUBJECTS: Subject[] = [
  // SEMESTRE I
  {
    id: 's1-1',
    name: 'Morfología Integral',
    code: 'ENF101',
    semester: 1,
    credits: 6,
    prerequisites: [],
    category: 'fisiopatologia'
  },
  {
    id: 's1-2',
    name: 'Química General y Orgánica',
    code: 'ENF102',
    semester: 1,
    credits: 5,
    prerequisites: [],
    category: 'psicologia-ciclo-vital'
  },
  {
    id: 's1-3',
    name: 'Biología Celular',
    code: 'ENF103',
    semester: 1,
    credits: 5,
    prerequisites: [],
    category: 'psicologia-ciclo-vital'
  },
  {
    id: 's1-4',
    name: 'Razonamiento Matemático',
    code: 'ENF104',
    semester: 1,
    credits: 4,
    prerequisites: [],
    category: 'psicologia-ciclo-vital'
  },
  {
    id: 's1-5',
    name: 'Bases Teóricas de la Enfermería',
    code: 'ENF105',
    semester: 1,
    credits: 4,
    prerequisites: [],
    category: 'bases-integradores'
  },

  // SEMESTRE II
  {
    id: 's2-1',
    name: 'Microbiología',
    code: 'ENF201',
    semester: 2,
    credits: 5,
    prerequisites: [],
    category: 'fisiopatologia'
  },
  {
    id: 's2-2',
    name: 'Bioquímica',
    code: 'ENF202',
    semester: 2,
    credits: 5,
    prerequisites: ['s1-2', 's1-3'],
    category: 'psicologia-ciclo-vital'
  },
  {
    id: 's2-3',
    name: 'Psicología Evolutiva',
    code: 'ENF203',
    semester: 2,
    credits: 4,
    prerequisites: [],
    category: 'psicologia-ciclo-vital'
  },
  {
    id: 's2-4',
    name: 'Socioantropología',
    code: 'ENF204',
    semester: 2,
    credits: 4,
    prerequisites: [],
    category: 'antropologia-prevencion'
  },
  {
    id: 's2-5',
    name: 'Bases del Cuidado de Enfermería',
    code: 'ENF205',
    semester: 2,
    credits: 5,
    prerequisites: ['s1-1'],
    category: 'bases-integradores'
  },
  {
    id: 's2-6',
    name: 'Habilidades Comunicativas',
    code: 'ENF206',
    semester: 2,
    credits: 3,
    prerequisites: ['s1-4', 's2-3'],
    category: 'educacion-ingles'
  },

  // SEMESTRE III
  {
    id: 's3-1',
    name: 'Fisiología',
    code: 'ENF301',
    semester: 3,
    credits: 6,
    prerequisites: ['s2-1', 's2-3'],
    category: 'fisiopatologia'
  },
  {
    id: 's3-2',
    name: 'Salud Pública I',
    code: 'ENF302',
    semester: 3,
    credits: 5,
    prerequisites: [],
    category: 'antropologia-prevencion'
  },
  {
    id: 's3-3',
    name: 'Enfermería en la Promoción y Prevención en Salud',
    code: 'ENF303',
    semester: 3,
    credits: 5,
    prerequisites: ['s2-5'],
    category: 'antropologia-prevencion'
  },
  {
    id: 's3-4',
    name: 'Cuidado de Enfermería en el Ciclo Vital',
    code: 'ENF304',
    semester: 3,
    credits: 6,
    prerequisites: ['s1-6', 's1-7'],
    category: 'psicologia-ciclo-vital'
  },
  {
    id: 's2-7',
    name: 'Inglés I',
    code: 'ING201',
    semester: 3,
    credits: 3,
    prerequisites: ['s1-5', 's2-2'],
    category: 'educacion-ingles'
  },

  // SEMESTRE IV
  {
    id: 's4-1',
    name: 'Fisiopatología',
    code: 'ENF401',
    semester: 4,
    credits: 6,
    prerequisites: ['s2-7'],
    category: 'fisiopatologia'
  },
  {
    id: 's4-2',
    name: 'Farmacología General',
    code: 'ENF402',
    semester: 4,
    credits: 5,
    prerequisites: ['s3-1'],
    category: 'fisiopatologia'
  },
  {
    id: 's4-3',
    name: 'Salud Pública II',
    code: 'ENF403',
    semester: 4,
    credits: 5,
    prerequisites: ['s3-2'],
    category: 'antropologia-prevencion'
  },
  {
    id: 's4-4',
    name: 'Bases de Enfermería en Salud Familiar y Comunitaria',
    code: 'ENF404',
    semester: 4,
    credits: 5,
    prerequisites: ['s3-3', 's3-4'],
    category: 'bases-integradores'
  },
  {
    id: 's4-5',
    name: 'Cuidado de Enfermería en Adulto y Adulto Mayor',
    code: 'ENF405',
    semester: 4,
    credits: 6,
    prerequisites: ['s3-5', 's4-2'],
    category: 'adulto-mayor'
  },
  {
    id: 's3-5',
    name: 'Inglés II',
    code: 'ING301',
    semester: 4,
    credits: 3,
    prerequisites: ['s2-6', 's2-7'],
    category: 'educacion-ingles'
  },

  // SEMESTRE V
  {
    id: 's5-1',
    name: 'Farmacología Clínica y Farmacovigilancia',
    code: 'ENF501',
    semester: 5,
    credits: 5,
    prerequisites: ['s3-5'],
    category: 'fisiopatologia'
  },
  {
    id: 's5-2',
    name: 'Cuidados de Enfermería en Salud Familiar',
    code: 'ENF502',
    semester: 5,
    credits: 6,
    prerequisites: ['s3-3', 's3-4', 's3-5', 's4-1', 's4-2', 's4-3'],
    category: 'antropologia-prevencion'
  },
  {
    id: 's5-3',
    name: 'Cuidado de Enfermería en el Niño y Adulto',
    code: 'ENF503',
    semester: 5,
    credits: 6,
    prerequisites: ['s4-3'],
    category: 'adulto-mayor'
  },
  {
    id: 's5-4',
    name: 'Fundamentos de Gestión y Liderazgo en Enfermería',
    code: 'ENF504',
    semester: 5,
    credits: 4,
    prerequisites: ['s4-5', 's5-2'],
    category: 'psicologia-ciclo-vital'
  },
  {
    id: 's5-5',
    name: 'Integrador I: Cuidados de Enfermería I',
    code: 'ENF505',
    semester: 5,
    credits: 8,
    prerequisites: ['s4-4', 's4-6', 's5-2'],
    category: 'bases-integradores'
  },
  {
    id: 's4-6',
    name: 'Inglés III',
    code: 'ING401',
    semester: 5,
    credits: 3,
    prerequisites: ['s3-3', 's4-2'],
    category: 'educacion-ingles'
  },

  // SEMESTRE VI
  {
    id: 's6-1',
    name: 'Cuidado de Enfermería en Salud Mental y Comunidad',
    code: 'ENF601',
    semester: 6,
    credits: 6,
    prerequisites: ['s5-1'],
    category: 'psicologia-ciclo-vital'
  },
  {
    id: 's6-2',
    name: 'Cuidado de Enfermería en el Adulto y Adulto Mayor con Alteraciones de Salud',
    code: 'ENF602',
    semester: 6,
    credits: 7,
    prerequisites: ['s2-4'],
    category: 'bases-integradores'
  },
  {
    id: 's6-3',
    name: 'Métodos de Análisis en Enfermería',
    code: 'ENF603',
    semester: 6,
    credits: 5,
    prerequisites: ['s5-3'],
    category: 'bases-integradores'
  },
  {
    id: 's6-4',
    name: 'Administración en Unidades de Enfermería',
    code: 'ENF604',
    semester: 6,
    credits: 5,
    prerequisites: ['s5-2'],
    category: 'bases-integradores'
  },
  {
    id: 's1-6',
    name: 'Razonamiento Científico y TICS',
    code: 'ENF106',
    semester: 6,
    credits: 3,
    prerequisites: ['s1-3'],
    category: 'educacion-ingles'
  },
  {
    id: 's5-6',
    name: 'Inglés IV',
    code: 'ING501',
    semester: 6,
    credits: 3,
    prerequisites: ['s4-1', 's4-2', 's4-3'],
    category: 'educacion-ingles'
  },

  // SEMESTRE VII
  {
    id: 's7-1',
    name: 'Ética y Legislación en Enfermería',
    code: 'ENF701',
    semester: 7,
    credits: 4,
    prerequisites: ['s5-4'],
    category: 'psicologia-ciclo-vital'
  },
  {
    id: 's7-2',
    name: 'Cuidados de Enfermería en Salud Familiar y Comunitaria',
    code: 'ENF702',
    semester: 7,
    credits: 7,
    prerequisites: ['s5-2', 's5-5'],
    category: 'antropologia-prevencion'
  },
  {
    id: 's7-3',
    name: 'Cuidado de Enfermería en el Niño y Adolescente con Alteraciones de la Salud',
    code: 'ENF703',
    semester: 7,
    credits: 7,
    prerequisites: ['s6-1'],
    category: 'antropologia-prevencion'
  },
  {
    id: 's7-4',
    name: 'Desarrollo de Proyectos en Enfermería',
    code: 'ENF704',
    semester: 7,
    credits: 5,
    prerequisites: ['s6-2'],
    category: 'bases-integradores'
  },
  {
    id: 's1-7',
    name: 'Pensamiento Crítico',
    code: 'ENF107',
    semester: 7,
    credits: 3,
    prerequisites: [],
    category: 'educacion-ingles'
  },

  // SEMESTRE VIII
  {
    id: 's8-1',
    name: 'Cuidado Integral del Niño y Adulto',
    code: 'ENF801',
    semester: 8,
    credits: 8,
    prerequisites: ['s5-5', 's6-4', 's7-2'],
    category: 'antropologia-prevencion'
  },
  {
    id: 's8-2',
    name: 'Seminario de Investigación en Enfermería',
    code: 'ENF802',
    semester: 8,
    credits: 5,
    prerequisites: ['s5-6', 's6-3', 's6-4'],
    category: 'antropologia-prevencion'
  },
  {
    id: 's8-3',
    name: 'Integrador II: Cuidado de Enfermería II',
    code: 'ENF803',
    semester: 8,
    credits: 10,
    prerequisites: ['s6-4', 's7-1', 's7-2', 's7-3'],
    category: 'bases-integradores'
  },
  {
    id: 's10-2',
    name: 'Responsabilidad Social',
    code: 'ENF1002',
    semester: 8,
    credits: 4,
    prerequisites: ['s10-1'],
    category: 'antropologia-prevencion'
  },

  // SEMESTRE IX
  {
    id: 's9-1',
    name: 'Integrador III: Gestión del Cuidado en Unidades de Enfermería',
    code: 'ENF901',
    semester: 9,
    credits: 15,
    prerequisites: ['s7-4'],
    category: 'bases-integradores'
  },

  // SEMESTRE X
  {
    id: 's10-1',
    name: 'Integrador IV: Gestión del Cuidado en Salud Familiar y Comunitaria',
    code: 'ENF1001',
    semester: 10,
    credits: 15,
    prerequisites: ['s8-1', 's8-2', 's8-3', 's9-1'],
    category: 'bases-integradores'
  },
]
