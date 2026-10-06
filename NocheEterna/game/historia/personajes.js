// ============================================================
//  PERSONAJES
//  Aquí se define cómo se llama y cómo se ve cada personaje.
//  Retrato: piel, pelo, estilo (corto | largo | moño | rapado | despeinado),
//  ropa, fondo, y extras opcionales: gafas, cicatriz, arrugas, uniforme.
// ============================================================

window.PERSONAJES = {
  elias: {
    nombre: 'Elías Vogt', color: '#9fb4c7',
    retrato: { piel: '#c9a07f', pelo: '#3a2a20', estilo: 'corto', ropa: '#4a4f58', fondo: '#1c2028', gafas: true }
  },
  mara: {
    nombre: 'Mara Solís', color: '#e0677a',
    retrato: { piel: '#b98463', pelo: '#1b1210', estilo: 'largo', ropa: '#5a2a2a', fondo: '#2a1a1c', cicatriz: true }
  },
  ruth: {
    nombre: 'Ruth Adler', color: '#d9c28a',
    retrato: { piel: '#d8b49a', pelo: '#c9c4bd', estilo: 'moño', ropa: '#3d3a2e', fondo: '#26231a', gafas: true, arrugas: true }
  },
  tomas: {
    nombre: 'Tomás «Chispa» Rey', color: '#7fd1c1',
    retrato: { piel: '#a87858', pelo: '#141414', estilo: 'despeinado', ropa: '#2d4a45', fondo: '#16282a' }
  },
  brandt: {
    nombre: 'Supervisor Brandt', color: '#c8c8c8',
    retrato: { piel: '#e0bfa5', pelo: '#8a7a60', estilo: 'rapado', ropa: '#1c1c1c', fondo: '#2a0c10', uniforme: true }
  },
  relojero: {
    nombre: 'Tobías Grau, el Relojero', color: '#c9a86a',
    retrato: { piel: '#c49a7c', pelo: '#9a948a', estilo: 'rapado', ropa: '#2e2a24', fondo: '#1e1a14', gafas: true, arrugas: true }
  },
  irene: {
    nombre: 'Irene Castaño', color: '#c79ad6',
    retrato: { piel: '#c8977a', pelo: '#5a2418', estilo: 'largo', ropa: '#3c2f3a', fondo: '#221a24' }
  },
  julian: {
    nombre: 'Julián Mora', color: '#a8b08a',
    retrato: { piel: '#b58866', pelo: '#2e2a26', estilo: 'corto', ropa: '#3b3b30', fondo: '#1c1e18', arrugas: true }
  },
  nico: {
    nombre: 'Nico Barros', color: '#9aa7b8',
    retrato: { piel: '#d8b294', pelo: '#3a2c20', estilo: 'rapado', ropa: '#3a3f46', fondo: '#1a1d22' }
  },
  greta: {
    nombre: 'Greta Lang', color: '#e0c874',
    retrato: { piel: '#e6c4a8', pelo: '#d8b25a', estilo: 'moño', ropa: '#2a2a2a', fondo: '#22201a' }
  },
  hans: {
    nombre: 'Hans Keller', color: '#b0b8c0',
    retrato: { piel: '#dcb495', pelo: '#8a8274', estilo: 'rapado', ropa: '#4a4f58', fondo: '#1c2028', gafas: true, arrugas: true }
  },
  klara: {
    nombre: 'Klara Dietz', color: '#d4a58a',
    retrato: { piel: '#e0b99a', pelo: '#4a2c1c', estilo: 'moño', ropa: '#3a3440', fondo: '#1e1a22' }
  },
  aurora: {
    nombre: 'Aurora Blanco', color: '#a0c4d8',
    retrato: { piel: '#d9b18f', pelo: '#101010', estilo: 'corto', ropa: '#2d3a45', fondo: '#161e24' }
  },
  inspectora: {
    nombre: 'Inspectora Hel', color: '#d0d0e0',
    retrato: { piel: '#e8cdb8', pelo: '#e0dcd4', estilo: 'moño', ropa: '#141418', fondo: '#240a10', uniforme: true, gafas: true }
  },
  leo: {
    nombre: 'Leo Sanz', color: '#b8c8a0',
    retrato: { piel: '#d6ae8e', pelo: '#5a3a22', estilo: 'despeinado', ropa: '#4a4f58', fondo: '#1c2028' }
  },
  voss: {
    nombre: 'Canciller Aldric Voss', color: '#e8e2d0',
    retrato: { piel: '#dcc0a8', pelo: '#e8e4dc', estilo: 'corto', ropa: '#0e0e10', fondo: '#3a0a12', uniforme: true, arrugas: true }
  },
  pantalla: {
    nombre: 'TELEPANTALLA', color: '#ff4455',
    retrato: { emblema: true, fondo: '#5a0a14' }
  },
  guardia: {
    nombre: 'Guardia Negra', color: '#888',
    retrato: { visor: true, ropa: '#0e0e10', fondo: '#1a0a0c' }
  }
};

// ============================================================
//  OPERATIVOS: quién puede salir a misiones de noche.
//  habilidades: sigilo, fuerza, labia, tecnica (nivel 0-3).
//  esencial: si falla, vuelve herido en vez de ser capturado.
//  si: condición para estar disponible (una bandera de la historia).
//  costeSospecha: sospecha que suma salir a una misión.
// ============================================================

window.OPERATIVOS_INICIALES = [
  { id: 'mara',  nombre: 'Mara',  papel: 'Enfermera',    habilidades: { sigilo: 2, labia: 2, fuerza: 1 }, esencial: true },
  { id: 'ruth',  nombre: 'Ruth',  papel: 'Falsificadora', habilidades: { tecnica: 2, labia: 1 }, esencial: true },
  { id: 'tomas', nombre: 'Chispa', papel: 'Hacker',      habilidades: { tecnica: 3, sigilo: 1 }, si: 'tomasSalvado' },
  { id: 'relojero', nombre: 'Tobías', papel: 'El Relojero', habilidades: { labia: 2, tecnica: 2, sigilo: 1 }, esencial: true, si: 'relojeroRescatado' },
  { id: 'hans', nombre: 'Hans', papel: 'Archivero', habilidades: { tecnica: 2, labia: 1 }, si: 'hansRescatado' },
  { id: 'elias', nombre: 'Elías', papel: 'Archivero',    habilidades: { labia: 1, tecnica: 1 }, esencial: true, costeSospecha: 10 }
];
