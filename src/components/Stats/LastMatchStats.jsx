import { useEffect, useRef } from 'react'
import { Box, Flex, Grid, HStack, Image, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useLastMatchStats from '../../hooks/useLastMatchStats'

gsap.registerPlugin(ScrollTrigger)

// ─── ESTADÍSTICAS DEL ÚLTIMO PARTIDO ──────────────────────────────
// Los datos llegan solos desde API-Football (sincronización del panel)
// a players/{slug}/stats/last. La landing decide qué mostrar con una
// regla automática, sin configuración por jugador:
//   - Un dato en null (la API no lo midió) no se muestra.
//   - Un grupo sin ningún dato se oculta entero.
//   - Arqueros ven atajadas y goles recibidos; jugadores de campo ven
//     goles, asistencias, ataque, juego y defensa.
//   - Si no jugó, se muestra el partido con la leyenda "No sumó minutos".

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const POSITIONS = { ARQ: 'Arquero', DEF: 'Defensor', MED: 'Mediocampista', DEL: 'Delantero' }

const isNum = (v) => typeof v === 'number' && Number.isFinite(v)

function formatDate(iso) {
  const [y, m, d] = String(iso || '').split('-').map(Number)
  if (!y || !m || !d) return ''
  return `${d} ${MONTHS[m - 1]} ${y}`
}

// "aciertos / total" cuando están los dos, si no el que haya.
const pair = (ok, total) => (s) => {
  if (isNum(s[ok]) && isNum(s[total])) return `${s[ok]}/${s[total]}`
  if (isNum(s[total])) return s[total]
  return null
}
const single = (key) => (s) => (isNum(s[key]) ? s[key] : null)

// Datos destacados (números grandes, con diferencia contra el partido anterior).
const HIGHLIGHTS = {
  ARQ: [
    { key: 'minutos', label: 'Minutos' },
    { key: 'rating', label: 'Rating', decimals: 1 },
    { key: 'atajadas', label: 'Atajadas' },
    { key: 'golesRec', label: 'Goles recibidos', lowerIsBetter: true },
  ],
  field: [
    { key: 'minutos', label: 'Minutos' },
    { key: 'rating', label: 'Rating', decimals: 1 },
    { key: 'goles', label: 'Goles' },
    { key: 'asistencias', label: 'Asistencias' },
  ],
}

// Detalle agrupado.
const GROUPS = {
  ARQ: [
    { title: 'Distribución', items: [
      { label: 'Pases completados', value: pair('pasesOk', 'pases') },
      { label: 'Pases clave', value: single('pasesClave') },
    ] },
  ],
  field: [
    { title: 'Ataque', items: [
      { label: 'Tiros al arco', value: pair('tirosArco', 'tiros') },
      { label: 'Regates', value: pair('regates', 'regatesInt') },
      { label: 'Pases clave', value: single('pasesClave') },
    ] },
    { title: 'Juego', items: [
      { label: 'Pases completados', value: pair('pasesOk', 'pases') },
      { label: 'Faltas recibidas', value: single('faltasR') },
    ] },
    { title: 'Defensa', items: [
      { label: 'Quites', value: single('quites') },
      { label: 'Intercepciones', value: single('intercepciones') },
      { label: 'Duelos ganados', value: pair('duelosG', 'duelos') },
      { label: 'Faltas cometidas', value: single('faltasC') },
    ] },
  ],
}

function resultOf(s) {
  if (!isNum(s.gf) || !isNum(s.gc)) return null
  if (s.gf > s.gc) return 'Victoria'
  if (s.gf < s.gc) return 'Derrota'
  return 'Empate'
}

function Delta({ item, last, prev }) {
  if (!prev || prev.jugo === false) return null
  const a = last[item.key]
  const b = prev[item.key]
  if (!isNum(a) || !isNum(b)) return null
  const diff = Number((a - b).toFixed(item.decimals || 0))
  if (!diff) return null
  const better = item.lowerIsBetter ? diff < 0 : diff > 0
  return (
    <Text
      as="span"
      fontFamily="mono" fontSize="10px" fontWeight="700"
      color={better ? 'brand.dorado' : 'brand.gray'}
      ml={1.5}
      title="Diferencia con el partido anterior"
    >
      {diff > 0 ? '▲' : '▼'} {Math.abs(diff).toFixed(item.decimals || 0)}
    </Text>
  )
}

function Tag({ children, accent }) {
  return (
    <Text
      fontFamily="mono"
      fontSize="9px" fontWeight="700"
      letterSpacing="0.18em" textTransform="uppercase"
      color={accent ? 'brand.dark' : 'brand.boneWarm'}
      bg={accent ? 'brand.amber' : 'transparent'}
      border="1px solid"
      borderColor={accent ? 'brand.amber' : 'whiteAlpha.200'}
      borderRadius="full"
      px={2.5} py={0.5}
      whiteSpace="nowrap"
    >
      {children}
    </Text>
  )
}

export function LastMatchStats() {
  const { last, prev } = useLastMatchStats()
  const wrapRef = useRef(null)
  const hasData = Boolean(last?.rival)

  useEffect(() => {
    if (!hasData) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.lastmatch-tick',
        { y: 14, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: wrapRef.current, start: 'top 88%', once: true },
        }
      )
    }, wrapRef)
    return () => ctx.revert()
  }, [hasData])

  if (!hasData) return null

  const played = last.jugo !== false
  const kind = last.posicion === 'ARQ' ? 'ARQ' : 'field'
  const result = resultOf(last)

  const highlights = played
    ? HIGHLIGHTS[kind].filter((h) => isNum(last[h.key]))
    : []
  const groups = played
    ? GROUPS[kind]
        .map((g) => ({
          ...g,
          items: g.items.map((i) => ({ ...i, shown: i.value(last) })).filter((i) => i.shown !== null),
        }))
        .filter((g) => g.items.length)
    : []

  const tags = []
  if (played && last.titular === '1') tags.push({ text: 'Titular' })
  if (played && last.titular === '0') tags.push({ text: 'Ingresó desde el banco' })
  if (last.capitan) tags.push({ text: 'Capitán', accent: true })
  if (played && POSITIONS[last.posicion]) tags.push({ text: POSITIONS[last.posicion] })
  if (last.amarillas > 0) tags.push({ text: last.amarillas > 1 ? `${last.amarillas} amarillas` : '1 amarilla' })
  if (last.rojas > 0) tags.push({ text: 'Expulsado' })

  return (
    <Box
      ref={wrapRef}
      border="1px solid"
      borderColor="brand.amberLight"
      borderRadius="10px"
      overflow="hidden"
    >
      {/* Encabezado */}
      <Flex
        align="center"
        justify="space-between"
        gap={3}
        px={{ base: 4, md: 5 }}
        py={2.5}
        bg="brand.bgRef"
        borderBottom="1px solid"
        borderColor="brand.amberLight"
      >
        <Text
          fontFamily="mono"
          fontSize="11px" fontWeight="700"
          letterSpacing="0.24em" textTransform="uppercase"
          color="brand.boneWarm"
        >
          Último partido
        </Text>
        <Text
          fontFamily="mono"
          fontSize="10px" fontWeight="700"
          letterSpacing="0.2em" textTransform="uppercase"
          color="brand.gray"
          textAlign="right"
          noOfLines={1}
        >
          {[formatDate(last.fecha), last.competicion].filter(Boolean).join(' · ')}
        </Text>
      </Flex>

      {/* Marcador */}
      <Flex
        className="lastmatch-tick"
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        gap={4}
        px={{ base: 4, md: 5 }}
        pt={{ base: 5, md: 6 }}
      >
        <HStack spacing={3}>
          {last.rivalLogo && (
            <Image src={last.rivalLogo} alt={`Escudo de ${last.rival}`} boxSize="32px" objectFit="contain" />
          )}
          <Box>
            <Text fontFamily="mono" fontSize="10px" fontWeight="700" letterSpacing="0.18em"
                  textTransform="uppercase" color="brand.gray">
              {last.condicion === 'V' ? 'Visitante ante' : 'Local ante'}
            </Text>
            <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} color="brand.bone" lineHeight={1.1}>
              {last.rival}
            </Text>
          </Box>
        </HStack>

        {result && (
          <HStack spacing={3}>
            <Text fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} color="brand.bone" lineHeight={1}>
              {last.gf} – {last.gc}
            </Text>
            <Tag accent={result === 'Victoria'}>{result}</Tag>
          </HStack>
        )}
      </Flex>

      {tags.length > 0 && (
        <Flex className="lastmatch-tick" wrap="wrap" gap={2} px={{ base: 4, md: 5 }} pt={4}>
          {tags.map((t) => <Tag key={t.text} accent={t.accent}>{t.text}</Tag>)}
        </Flex>
      )}

      {!played && (
        <Text
          className="lastmatch-tick"
          fontFamily="mono" fontSize="xs" letterSpacing="0.16em" textTransform="uppercase"
          color="brand.gray"
          px={{ base: 4, md: 5 }} py={{ base: 5, md: 6 }}
        >
          No sumó minutos en este partido
        </Text>
      )}

      {/* Destacados */}
      {highlights.length > 0 && (
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: `repeat(${highlights.length}, 1fr)` }}
          rowGap={5}
          px={{ base: 4, md: 5 }}
          py={{ base: 5, md: 6 }}
        >
          {highlights.map((h, i) => (
            <Box
              key={h.key}
              className="lastmatch-tick"
              textAlign="center"
              px={2}
              borderLeft={{ md: i === 0 ? 'none' : '1px solid' }}
              borderColor="whiteAlpha.100"
            >
              <Text
                fontFamily="heading"
                fontSize={{ base: '3xl', md: '4xl' }}
                color={h.key === 'rating' ? 'brand.dorado' : 'brand.bone'}
                lineHeight={1}
              >
                {h.decimals ? last[h.key].toFixed(h.decimals) : last[h.key]}
              </Text>
              <Text
                fontFamily="mono"
                fontSize="10px" fontWeight="700"
                letterSpacing="0.14em" textTransform="uppercase"
                color="brand.gray"
                mt={1.5}
              >
                {h.label}
                <Delta item={h} last={last} prev={prev} />
              </Text>
            </Box>
          ))}
        </Grid>
      )}

      {/* Detalle por grupo */}
      {groups.length > 0 && (
        <Grid
          templateColumns={{ base: '1fr', md: `repeat(${groups.length}, 1fr)` }}
          gap={{ base: 5, md: 8 }}
          px={{ base: 4, md: 5 }}
          pt={{ base: 5, md: 6 }}
          pb={{ base: 5, md: 6 }}
          borderTop="1px solid"
          borderColor="whiteAlpha.100"
        >
          {groups.map((g) => (
            <Box key={g.title} className="lastmatch-tick">
              <Text
                fontFamily="mono"
                fontSize="10px" fontWeight="700"
                letterSpacing="0.24em" textTransform="uppercase"
                color="brand.amber"
                mb={3}
              >
                {g.title}
              </Text>
              {g.items.map((item) => (
                <Flex
                  key={item.label}
                  justify="space-between"
                  align="baseline"
                  py={1.5}
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.50"
                >
                  <Text fontFamily="mono" fontSize="10px" fontWeight="700" letterSpacing="0.14em"
                        textTransform="uppercase" color="brand.gray">
                    {item.label}
                  </Text>
                  <Text fontFamily="heading" fontSize="md" color="brand.boneWarm">
                    {item.shown}
                  </Text>
                </Flex>
              ))}
            </Box>
          ))}
        </Grid>
      )}

      {last.fuente && (
        <Text
          fontFamily="mono" fontSize="9px" letterSpacing="0.16em" textTransform="uppercase"
          color="whiteAlpha.400" textAlign="right"
          px={{ base: 4, md: 5 }} pb={3}
        >
          Fuente: {last.fuente}
        </Text>
      )}
    </Box>
  )
}
