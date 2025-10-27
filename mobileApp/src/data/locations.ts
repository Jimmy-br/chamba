export type ProvinceName =
  | 'San José'
  | 'Alajuela'
  | 'Cartago'
  | 'Heredia'
  | 'Puntarenas'
  | 'Limón'
  | 'Guanacaste';

export type LocationsType = Record<ProvinceName, Record<string, string[]>>;

export const locations: LocationsType = {
  'San José': {
    'San José': [
      'Carmen', 'Merced', 'Hospital', 'Catedral', 'Zapote',
      'San Francisco de Dos Ríos', 'Uruca', 'Mata Redonda',
      'Pavas', 'Hatillo', 'San Sebastián'
    ],
    Escazú: ['Escazú', 'San Antonio', 'San Rafael'],
    Desamparados: [
      'Desamparados', 'San Miguel', 'San Juan de Dios',
      'San Rafael Arriba', 'San Antonio', 'Frailes', 'Patarrá',
      'San Cristóbal', 'Rosario', 'Damas', 'San Rafael Abajo',
      'Gravilias', 'Los Guido'
    ],
    Puriscal: [
      'Santiago', 'Mercedes Sur', 'Barbacoas', 'Grifo Alto',
      'San Rafael', 'Candelarita', 'Desamparaditos',
      'San Antonio', 'Chires'
    ],
    Tarrazú: ['San Marcos', 'San Lorenzo', 'San Carlos'],
    Aserrí: ['Aserrí', 'Tarbaca', 'Vuelta de Jorco', 'San Gabriel', 'Legua', 'Monterrey', 'Salitrillos'],
    Mora: ['Colón', 'Guayabo', 'Tabarcia', 'Piedras Negras', 'Picagres', 'Jaris', 'Quitirrisí'],
    Goicoechea: ['Guadalupe', 'San Francisco', 'Calle Blancos', 'Mata de Plátano', 'Ipís', 'Rancho Redondo', 'Purral'],
    'Santa Ana': ['Santa Ana', 'Salitral', 'Pozos', 'Uruca', 'Piedades', 'Brasil'],
    Alajuelita: ['Alajuelita', 'San Josecito', 'San Antonio', 'Concepción', 'San Felipe'],
    'Vázquez de Coronado': ['San Isidro', 'Dulce Nombre de Jesús', 'Patalillo', 'Cascajal'],
    Acosta: ['San Ignacio', 'Guaitil', 'Palmichal', 'Cangrejal', 'Sabanillas'],
    Tibás: ['San Juan', 'Cinco Esquinas', 'Anselmo Llorente', 'León XIII', 'Colima'],
    Moravia: ['San Vicente', 'San Jerónimo', 'Trinidad'],
    'Montes de Oca': ['San Pedro', 'Sabanilla', 'Mercedes', 'San Rafael'],
    Turrubares: ['San Pablo', 'San Pedro', 'San Juan de Mata', 'San Luis', 'Carara'],
    Dota: ['Santa María', 'Jardín', 'Copey'],
    Curridabat: ['Curridabat', 'Granadilla', 'Sánchez', 'Tirrases'],
    'Pérez Zeledón': ['San Isidro de El General', 'Daniel Flores', 'Rivas','Cajón', 'Santiago de Pejibaye', 'Páramo', 'Río Nuevo'],
    'León Cortés Castro': ['San Pablo', 'San Andrés', 'Llano Bonito', 'San Isidro', 'Santa Cruz', 'San Antonio']
  },
  Alajuela: {
    Central: ['Alajuela Centro', 'San José', 'Carrizal', 'San Antonio', 'Guácima', 'San Isidro', 'Sabanilla', 'San Rafael', 'Río Segundo', 'Desamparados', 'Turrúcares', 'Tambor', 'Garita', 'Sarapiquí'],
    'San Ramón': ['San Ramón Centro', 'Santiago', 'San Juan', 'Piedades Norte', 'Piedades Sur', 'San Rafael', 'San Isidro', 'Angeles', 'Alfaro', 'Volio', 'Concepción', 'Zapotal', 'Peñas Blancas'],
    Grecia: ['Grecia Centro', 'San Isidro', 'San José', 'San Roque', 'Tacares', 'Río Cuarto', 'Puente Piedra', 'Bolívar'],
    Atenas: ['Atenas Centro', 'Jesús', 'Mercedes', 'San Isidro', 'Concepción', 'San José', 'Santa Eulalia', 'Escobal'],
    Naranjo: ['Naranjo Centro', 'San Miguel', 'San José', 'Cirrí Sur', 'San Jerónimo', 'San Juan', 'El Rosario', 'Palmitos'],
    Palmares: ['Palmares Centro', 'Zaragoza', 'Buenos Aires', 'Santiago', 'Candelaria', 'Esquipulas', 'La Granja'],
    Poás: ['San Pedro', 'San Juan', 'San Rafael', 'Carrillos', 'Sabana Redonda'],
    Orotina: ['Orotina', 'Mastate', 'Hacienda Vieja', 'Coyolar', 'La Ceiba'],
    'San Carlos': ['Quesada', 'Florencia', 'Buenavista', 'Aguas Zarcas', 'Venecia', 'Pital', 'La Fortuna', 'La Tigra', 'La Palmera', 'Venado', 'Cutris', 'Monterrey', 'Pocosol'],
    Zarcero: ['Zarcero', 'Laguna', 'Tapezco', 'Guadalupe', 'Palmira', 'Zapote', 'Brisas'],
    Sarchí: ['Sarchí Norte', 'Sarchí Sur', 'Toro Amarillo', 'San Pedro', 'Rodríguez'],
    Upala: ['Upala', 'Aguas Claras', 'San José', 'Bijagua', 'Delicias', 'Dos Ríos', 'Yolillal', 'Canalete'],
    'Los Chiles': ['Los Chiles', 'Caño Negro', 'El Amparo', 'San Jorge'],
    Guatuso: ['San Rafael', 'Buenavista', 'Cote', 'Katira']
  },
  Cartago: {
    Central: ['Oriental', 'Occidental', 'San Nicolás', 'Aguacaliente', 'Guadalupe', 'Corralillo', 'Tierra Blanca', 'Dulce Nombre', 'Llano Grande', 'Quebradilla'],
    Paraíso: ['Paraíso Centro', 'Santiago', 'Orosi', 'Cachí', 'Llanos de Santa Lucía'],
    'La Unión': ['Tres Ríos', 'San Diego', 'San Juan', 'San Rafael', 'Concepción', 'Dulce Nombre', 'San Ramón', 'Río Azul'],
    Jiménez: ['Juan Viñas', 'Tucurrique', 'Pejibaye'],
    Turrialba: ['Turrialba', 'La Suiza', 'Peralta', 'Santa Cruz', 'Santa Teresita', 'Pavones', 'Tuis', 'Tayutic', 'Santa Rosa', 'Tres Equis', 'La Isabel', 'Chirripó'],
    Alvarado: ['Pacayas', 'Cervantes', 'Capellades'],
    Oreamuno: ['San Rafael', 'Cot', 'Potrero Cerrado', 'Cipreses', 'Santa Rosa'],
    'El Guarco': ['El Tejar', 'San Isidro', 'Tobosi', 'Patio de Agua']
  },
  Heredia: {
    Central: ['Heredia Centro', 'Mercedes', 'San Francisco', 'Ulloa', 'Varablanca'],
    Barva: ['Barva', 'San Pedro', 'San Pablo', 'San Roque', 'Santa Lucía', 'San José de la Montaña'],
    SantoDomingo: ['Santo Domingo', 'San Vicente', 'San Miguel', 'Paracito', 'Santo Tomás', 'Santa Rosa', 'Tures', 'Pará'],
    SantaBárbara: ['Santa Bárbara', 'San Pedro', 'San Juan', 'Jesús', 'Santo Domingo', 'Purabá'],
    SanRafael: ['San Rafael', 'San Josecito', 'Santiago', 'Angeles', 'Concepción'],
    SanIsidro: ['San Isidro', 'San José', 'Concepción', 'San Francisco'],
    Belén: ['San Antonio', 'La Ribera', 'La Asunción'],
    Flores: ['San Joaquín', 'Barrantes', 'Llorente'],
    Sarapiquí: ['Puerto Viejo', 'La Virgen', 'Horquetas', 'Llanuras del Gaspar', 'Cureña']
  },
  Puntarenas: {
    Central: ['Puntarenas', 'Pitahaya', 'Chomes', 'Lepanto', 'Paquera', 'Manzanillo', 'Guacimal', 'Barranca', 'Monte Verde', 'Isla del Coco', 'Cobano', 'Chacarita', 'Chira', 'Acapulco', 'El Roble', 'Arancibia'],
    Esparza: ['Espíritu Santo', 'San Juan Grande', 'Macacona', 'San Rafael', 'San Jerónimo', 'Caldera'],
    BuenosAires: ['Buenos Aires', 'Volcán', 'Potrero Grande', 'Boruca', 'Pilas', 'Colinas', 'Chánguena', 'Bioley', 'Brunka'],
    MontesdeOro: ['Miramar', 'La Unión', 'San Isidro'],
    Osa: ['Puerto Cortés', 'Palmar', 'Sierpe', 'Bahía Ballena', 'Piedras Blancas'],
    Quepos: ['Quepos', 'Savegre', 'Naranjito'],
    Golfito: ['Golfito', 'Puerto Jiménez', 'Guaycará', 'Pavón'],
    CotoBrus: ['San Vito', 'Sabalito', 'Aguabuena', 'Limoncito', 'Pittier', 'Gutiérrez Braun'],
    Parrita: ['Parrita'],
    Corredores: ['Corredor', 'La Cuesta', 'Canoas', 'Laurel'],
    Garabito: ['Jacó', 'Tárcoles']
  },
  Limón: {
    Central: ['Limón', 'Valle La Estrella', 'Río Blanco', 'Matama'],
    Pococí: ['Guápiles', 'Jiménez', 'Rita', 'Roxana', 'Cariari', 'Colorado', 'La Colonia'],
    Siquirres: ['Siquirres', 'Pacuarito', 'Florida', 'Germania', 'Cairo', 'Alegría', 'Reventazón'],
    Talamanca: ['Bratsi', 'Sixaola', 'Cahuita', 'Telire'],
    Matina: ['Matina', 'Batán', 'Carrandí'],
    Guácimo: ['Guácimo', 'Mercedes', 'Pocora', 'Río Jiménez', 'Duacarí']
  },
  Guanacaste: {
    Liberia: ['Liberia', 'Cañas Dulces', 'Mayorga', 'Nacascolo', 'Curubandé'],
    Nicoya: ['Nicoya', 'Mansión', 'San Antonio', 'Quebrada Honda', 'Sámara', 'Nosara', 'Belén de Nosarita'],
    SantaCruz: ['Santa Cruz', 'Bolsón', 'Veintisiete de Abril', 'Tempate', 'Cartagena', 'Cuajiniquil', 'Diriá', 'Cabo Velas', 'Tamarindo'],
    Bagaces: ['Bagaces', 'Fortuna', 'Mogote', 'Río Naranjo'],
    Carrillo: ['Filadelfia', 'Palmira', 'Sardinal', 'Belén'],
    Cañas: ['Cañas', 'Palmira', 'San Miguel', 'Bebedero', 'Porozal'],
    Abangares: ['Las Juntas', 'Sierra', 'San Juan', 'Colorado'],
    Tilarán: ['Tilarán', 'Quebrada Grande', 'Tronadora', 'Santa Rosa', 'Líbano', 'Tierras Morenas', 'Arenal'],
    Nandayure: ['Carmona', 'Santa Rita', 'Zapotal', 'San Pablo', 'Porvenir', 'Bejuco'],
    LaCruz: ['La Cruz', 'Santa Cecilia', 'Garita', 'Santa Elena'],
    Hojancha: ['Hojancha', 'Monte Romo', 'Puerto Carrillo', 'Huacas', 'Matambú']
  }
};
