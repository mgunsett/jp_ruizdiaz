import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoMdStats } from 'react-icons/io'

//Hero
import polaco1 from '@assets/polaco1.webp'

import argentina from '@assets/argentina.webp'
import universitario from '@assets/escudo_univ.webp'
//Escudos trayectoria
import escudoCentralCordoba from '@assets/escudos/escudo_centralcordoba.webp'
import escudoBelgrano from '@assets/escudos/escudo_belgrano.webp'
import escudoBrown from '@assets/escudos/escudo_brown.webp'
import escudoCae from '@assets/escudos/escudo_cae.webp'
import escudoDelfin from '@assets/escudos/escudo_delfin.webp'
import escudoFerro from '@assets/escudos/escudo_ferro.webp'
//Gallery
import image1 from '@assets/gallery/image1.webp'
import image2 from '@assets/gallery/image2.webp'
import image3 from '@assets/gallery/image3.webp'
import image4 from '@assets/gallery/image4.webp'
import image5 from '@assets/gallery/image5.webp'
import image6 from '@assets/gallery/image6.webp'
import image7 from '@assets/gallery/image7.webp'
import image8 from '@assets/gallery/image8.webp'
import image9 from '@assets/gallery/image9.webp'
import image10 from '@assets/gallery/image10.webp'
//Video
import photoGraph from '@assets/perfil_video.webp'
//Prensa
import logo1 from '@assets/logos/logo1.webp'
import logo2 from '@assets/logos/logo2.webp'
import logo3 from '@assets/logos/logo3.webp'
//Redes
import transfermkt from '@assets/contact2.svg'
import ledsports from '@assets/contact3.webp'
import moon from '@assets/contact4.webp'


const name = 'JUAN PABLO'
const fullName = 'RUIZ'
const fullName2 = 'GOMEZ'

export const playerData = {
  name,
  fullName,
  fullName2,
  initials: `${name[0]}${fullName[0]}`,
  displayName: `${name} ${fullName}`,
  number: 19,
  position: 'Mediocampista',
  positionShort: 'MC',
  nationality: 'Argentina',
  nationalityFlag: argentina,
  age: 33,
  height: '1.84m',
  weight: '80kg',
  foot: 'Izquierdo',
  birthDate: '19 / 11 / 1992',
  birthPlace: 'Jose Marmol, Argentina',
  currentClub: 'Emelec',
  logoCurrentClub: universitario,
  image: polaco1,
  

  stats: [
    { label: 'Velocidad',      value: 90 },
    { label: 'Defensa',     value: 94 },
    { label: 'Regate',         value: 86 },
    { label: 'Pases Completos',    value: 87 },
    { label: 'Presión Alta',   value: 85 },
    { label: 'Visión de Juego',value: 89 },
  ],

  seasonStats: [
    { label: 'Partidos',    value: 49 },
    { label: 'Goles',       value: 2 },
    { label: 'Intercepciones', value: 5  },
    { label: 'Tiros al arco', value: 10  },
    { label: 'Min / Part.', value: "3,424'" },
    { label: 'Valoración', value: 7.6  },

  ],

  clubs: [
    {
      name:    'Emelec',
      country: 'Ecuador',
      years:   '2024 — Actualidad',
      logo:    universitario,
      titles:  [],
      info:    '',
    },
    {
      name:    'Delfín SC',
      country: 'Ecuador',
      years:   '2023',
      logo:    escudoDelfin,
      titles:  [],
      info:    'Prestamo',
    },
    {
      name:    'Ferro Carril Oeste',
      country: 'Argentina',
      years:   '2022',
      logo:    escudoFerro,
      titles:  [],
      info:    '',
    },
    {
      name:    'Belgrano',
      country: 'Argentina',
      years:   '2021',
      logo:    escudoBelgrano,
      titles:  [],
      info:    'Prestamo',
    },
    {
      name:    'Estudiantes (BA)',
      country: 'Argentina',
      years:   '2017 — 2018 / 2019 — 2020',
      logo:    escudoCae,
      titles:  [],
      info:    '',
    },
    {
      name:    'Central Córdoba (SdE)',
      country: 'Argentina',
      years:   '2019 — 2020',
      logo:    escudoCentralCordoba,
      titles:  [],
      info:    '',
    },
    {
      name:    'Brown de Adrogué',
      country: 'Argentina',
      years:   '2015 — 2017',
      logo:    escudoBrown,
      titles:  [],
      info:    '',
    },
  ],

  videos: [
    {
      id: 'v1',
      instagramId: 'DS3kqlVjokC',
      title: 'Highlight 2025',
      fullTitle: 'Juan Pablo Ruiz Gomez | Jugadas destacadas 2025',
      season: 'Highlight 2025',
      league: 'LIGA 1 2025',
      thumbnail: image7,
      cover: image7,
      category: 'Goles',
    },
    {
      id: 'v2',
      instagramId: 'DPANDAIjS8S',
      title: 'Gol y jugadas',
      fullTitle: 'Juan Pablo Ruiz Gomez | Compilado de goles',
      season: 'Gol y jugadas',
      league: 'LIGA 1 2025',
      thumbnail: image5,
      cover: image5,
      category: 'Goles',
    },
    {
      id: 'v3',
      instagramId: 'C1iDaZ6uAYa',
      title: 'Highlight 2023',
      fullTitle: 'Juan Pablo Ruiz Gomez | Asistencias y juego',
      season: 'Highlight 2023',
      league: 'LIGA 1 2023',
      thumbnail: image2,
      cover: image2,
      category: 'Highlights',
    },
  ],



  gallery: [
    { id: 1, src: image1, alt: 'Nicolas Silva', caption: 'Cusco FC', category: 'Partido', aspect: 'wide' },
    { id: 2, src: image2, alt: 'Nicolas Silva', caption: 'Cusco FC',    category: 'Festejo', aspect: 'tall' },
    { id: 3, src: image3, alt: 'Nicolas Silva', caption: 'Cusco FC', category: 'Entrenamiento', aspect: 'square' },
    { id: 4, src: image4, alt: 'Nicolas Silva', caption: 'Cusco FC',     category: 'Partido', aspect: 'wide' },
    { id: 5, src: image5, alt: 'Nicolas Silva', caption: 'Cusco FC',   category: 'Equipo',  aspect: 'wide' },
    { id: 6, src: image6, alt: 'Nicolas Silva', caption: 'Cusco FC',       category: 'Retrato', aspect: 'tall' },
    { id: 7, src: image7, alt: 'Nicolas Silva', caption: 'Cusco FC', category: 'Partido', aspect: 'wide' },
    { id: 8, src: image8, alt: 'Nicolas Silva', caption: 'Cusco FC',     category: 'Partido', aspect: 'wide' },
    { id: 9, src: image9, alt: 'Nicolas Silva', caption: 'Cusco FC', category: 'Partido', aspect: 'wide' },
    { id: 10, src: image10, alt: 'Nicolas Silva', caption: 'Cusco FC',     category: 'Partido', aspect: 'wide' },

  ],

  socialMedia: [
    {
      label: 'Instagram',
      icon: FaInstagram,
      iconBg: FaInstagram,
      handle: '@mati.dibenedetto',
      url: 'https://www.instagram.com/mati.dibenedetto/',
      hoverColor: '#E1306C',
      hoverGradient: 'insta-gradient',
    },
    {
      label: 'TransferMarkt',
      image: transfermkt,
      iconBg: IoMdStats,
      handle: '/matias-di-benedetto',
      url: 'https://www.transfermarkt.com.ar/matias-di-benedetto/profil/spieler/441344',
      hoverColor: '#2e73f2',
    },
  ],

  contact: [
    {
      title:      'Representante Deportivo',
      label:      'Moon Sports Group',
      image:       moon,
      handle:     '@moonsportsgroup_',
      url:        'https://www.instagram.com/moonsportsgroup_/',
      hoverColor: 'rgba(139,69,19,0.18)',
    },
    {
      title:      'Contacto Marketing',
      label:      'led sports marketing',
      image: ledsports,
      handle:     '@_ledsports',
      url:        'https://www.instagram.com/_ledsports/',
      hoverColor: 'rgba(212,168,75,0.18)',
    },
  ],
}
