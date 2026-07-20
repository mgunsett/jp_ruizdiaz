import { extendTheme } from '@chakra-ui/react'

// ─── PALETA OSCURA — 

const brandDark = {
  brown:      '#0C1A33', // base azul marino muy oscuro (tarjetas/nodos)
  brownDark:  '#050C1A', // azul casi negro profundo
  brownLight: '#1C2E4F', // sombra azul
  amber:      '#cbd8ec', // plata azulada clara (bordes/títulos)
  amber2:     '#a8bcda8e',
  amberDark:  '#8397B8', // plata azulada media
  amberLight: '#aec5e64f', // plata translúcida (bordes suaves)
  dorado:     '#3F7BFF', // azul eléctrico luminoso (acentos destacados)
  orange:     '#2E63E0', // azul medio (hover botones)
  orangeDark: '#214BB0', // azul hover oscuro
  orangeLight:'#5A8DFF', // azul hover claro
  dark:       '#0A14289f', // fondo azul casi negro (mantener alpha)
  dark3:      '#0a1428a1',
  dark2:      '#8f9bb0', // divisores neutros azulados
  gray:       '#93A2BA', // plata apagada (texto secundario)
  gray2:      '#39568F', // azul acero apagado (números grandes/relleno)
  bone:       '#ffffff', // texto principal
  boneWarm:   '#D6E1F0', // plata clara (detalles)
  rec:        '#E5484D', // rojo del indicador REC
  bgRef:      '#0f1f4421', // bg de hover en cajas (guiño azul eléctrico)
  bone2:       '#757070a4'
}

// ─── PALETA CLARA — 
const brandLight = {
  brown:      '#FFFFFF', // superficie clara (tarjetas/nodos)
  brownDark:  '#E7EDF7', // azul-gris claro (sombras suaves)
  brownLight: '#1D3A72', // azul de apoyo (texto)
  amber:      '#123FC4', // azul royal del escudo (bordes/títulos)
  amber2:     '#123fc48e',
  amberDark:  '#0B2C94', // azul oscuro
  amberLight: '#123fc440', // azul translúcido (bordes suaves)
  dorado:     '#0A46DE', // azul eléctrico (acentos destacados)
  orange:     '#123FC4', // hover de botones
  orangeDark: '#0B2C94', // hover de botones (oscuro)
  orangeLight:'#3A6BEA', // hover de botones (claro)
  dark:       '#F3F7FC', // fondo blanco azulado (camiseta plata)
  dark3:      '#EAF0F9',
  dark2:      '#C2CFE2', // divisores sobre blanco azulado
  gray:       '#5A6A82', // texto secundario azulado
  gray2:      '#4A5F92', // azul apagado (números grandes/relleno)
  bone:       '#0A1A3B', // texto principal (azul muy oscuro)
  boneWarm:   '#123FC4', // azul (detalles/labels)
  rec:        '#C1121F', // rojo del indicador REC
  bgRef:      '#123fc412', // bg de hover en cajas
}

// Elegir paleta :
//  'dark' 
//  'light'
const PALETTE = 'dark'

const brand = PALETTE === 'light' ? brandLight : brandDark

// Colores de la firma del desarrollador (crédito en el footer)
const dev = {
  green: '#2D5A47',
  cream: '#E8D5A3',
}

const theme = extendTheme({
  colors: { brand, dev },
  fonts: {
    heading:   `'Rowan-Bold', sans-serif`,
    body:      `'Barlow', sans-serif`,
    mono:      `'Rowan-Light', monospace`,
  },
  styles: {
    global: {
      'html, body': {
        bg: brand.dark,
        color: brand.bone,
        overflowX: 'hidden',
      },
      '::-webkit-scrollbar': { width: '4px' },
      '::-webkit-scrollbar-track': { bg: brand.dark },
      '::-webkit-scrollbar-thumb': { bg: brand.amber, borderRadius: '2px' },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme
