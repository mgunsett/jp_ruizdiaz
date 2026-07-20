import { useRef, useEffect } from 'react'
import { Box, Text, Flex, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MatchBox from './MatchBox'
import { playerData } from '../../data/playerData'
import useMatches from '../../hooks/useMatches'
import heroBg from '@assets/polaco3.webp'

import '../../styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)

function PlayerPanel() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justifyContent={"center"}
      alignItems={{ base: 'flex-start', md: 'center' }}
      gap={{ base: '15px', md: 5 }}
      fontFamily="'Rowan-Semibold', sans-serif" 
    >
      <Text
        className="player-number"        
        fontSize={{ base: '24vw', md: '9vw', lg: '5.5vw' }}
        lineHeight={0.9}
        color="brand.gray2"
      >
        {playerData.number}
      </Text>
      <Box w={{ base: '96px', md: '1px', lg: '1px' }} h={{ base: '1px', md: '70px', lg: '80px' }} bg="brand.amber" />
      <Flex direction="column" justifyContent="center" gap={1}>
        <Flex className='player-position' gap={1} justifyContent="flex-start" alignItems={{ base: "flex-start", md: "center" }} direction='row'>
          <Text fontSize={{ base: '9px', md: '10px' }} color="brand.bone"
            textTransform="uppercase" letterSpacing="widest">
            Posición
          </Text>
          <Text fontSize={{ base: '9px', md: '12px' }} color="brand.dorado"
            fontWeight="700" textTransform="uppercase" letterSpacing={{ base: "none", md: "widest" }}>
            {playerData.position}
          </Text>
        </Flex>
        <Flex justifyContent="flex-start" alignItems="center" gap={{ base: '10px', md: '14px' }}>
          <Image src={playerData.nationalityFlag} w={{ base: '15px', md: '25px' }} />
          <Text mb="-5px" fontSize={{ base: 'xs', md: 'md' }} color="brand.amber" letterSpacing="wider">
            {playerData.nationality}
          </Text>
        </Flex>
        <Flex justifyContent="flex-start" alignItems="flex-end" gap={{ base: '8px', md: '10px' }} mt="3px" ml={-1}>
          <Image src={playerData.logoCurrentClub} ml={{ base: '2px', md: 'none' }} w={{ base: '20px', md: '30px' }} h={{ base: '20px', md: '30px' }} />
          <Text fontSize={{ base: 'xs', md: 'md' }} color="brand.amber" letterSpacing="wider">
            {playerData.currentClub}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default function Hero() {
  const outerRef     = useRef(null)
  const containerRef = useRef(null)
  const photoRef     = useRef(null)
  const line1Ref     = useRef(null)
  const line2Ref     = useRef(null)
  const line3Ref     = useRef(null)
  const vignetteRef  = useRef(null)
  const { matches }  = useMatches()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([line1Ref.current, line2Ref.current, line3Ref.current],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'expo.out', delay: 0.4 }
      )
      gsap.fromTo(photoRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.6 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(vignetteRef.current,
        { opacity: 0.15 },
        {
          opacity: 0.75,
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: '+=80vh',
            scrub: 1.2,
          },
        }
      )
    }, outerRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={outerRef} h="200vh" position="relative" zIndex={1} id="hero">
      <Box
        ref={containerRef}
        position="sticky"
        top={0}
        h="100vh"
        overflow="hidden"
        bg="brand.dark"
        sx={{
          maskImage: 'linear-gradient(black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(black 90%, transparent)',
          // dvh evita el salto al colapsar la barra del navegador en mobile; vh queda de fallback
          '@supports (height: 100dvh)': { height: '100dvh' },
        }}
      >
        {/* Foto de fondo — fundida con el fondo */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          pointerEvents="none"
          display="flex"
          justifyContent={{ base: "flex-start", md: "center" }}
          alignItems={{ base: 'flex-end', md: 'flex-start' }}
          mt={{ base: 20, md: 12 }}
          ml={{ base: '0%', md: '25%' }}
          sx={{
            maskImage:
              'radial-gradient(120% 90% at 50% 30%, black 35%, transparent 78%)',
            WebkitMaskImage:
              'radial-gradient(120% 90% at 50% 30%, black 35%, transparent 78%)',
          }}
        >
          <Image
            className="hero-bg"
            src={heroBg}
            alt=""
            aria-hidden="true"
            draggable={false}
            // Controlá el tamaño acá 👇
            w={{ base: '120vw', md: '30vw' }}
            h={{ base: '120vh', md: 'auto' }}
            objectFit={{ base: 'cover', md: 'contain' }}
            objectPosition={{ base: 'center', md: 'center top' }}
            opacity={{ base: 0.21, lg: 0.20 }}
            filter="grayscale(100%) contrast(1.05)"
            sx={{ mixBlendMode: 'luminosity' }}
            mr={'-500px'}
          />

        </Box>

        {/* Visible name text — centrado, detrás del jugador */}
        <Box
          className="player-name-container"
          position="absolute"
          inset={0}
          pointerEvents="none"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="flex-start"
          pt={{ base: '54%', md: '12%', lg: '16%' }}
        >
          <Flex
            direction="column"
            as="h1"
            overflow="hidden"
            alignItems="center"
            w="100%"
          >
            <Text
              ref={line1Ref}
              className="player-name"
              as="span"
              display="block"
              fontFamily="'Rowan-Semibold', sans-serif"
              fontSize={{ base: '6vw', md: '6vw', lg: '4.5vw' }}
              letterSpacing={{ base: '0', md: '0.45em' }}
              pl={{ base: '0em', md: '0.45em' }}
              color="brand.amber"
              lineHeight={1}
              textAlign="center"
              style={{ opacity: 0 }}
              position={{ base: "absolute", md: "static" }}
              top={{ base: '240px', md: "auto" }}
              left={{ base: "18px", md: "auto" }}
            >
              {playerData.name}
            </Text>
            <Flex justifyContent="center" alignItems="center" w="100%" gap={{ base: 2, md: 36 }} mt={{ base: '-3px', md: '-5px' }}>
              <Text
                className="player-fullname 1"
                ref={line2Ref}
                as="span"
                display="block"
                fontFamily="'Rowan-Semibold', sans-serif"
                fontSize={{ base: '16vw', md: '12.5vw', lg: '10.5vw' }}
                color="brand.bone"
                lineHeight={0.85}
                textAlign="center"
                whiteSpace={{ base: 'normal', md: 'nowrap' }}
                zIndex={{ base: 4, md: 6 }}
                position={{base:"absolute", md:"static"}}
                top={{base:'270px', md:"auto"}}
                left={{base:"15px", md:"auto"}}
              >
                {playerData.fullName}
              </Text>
              <Text
                className="player-fullname 2"
                ref={line3Ref}
                position={{base:"absolute", md:"static"}}
                top={{base:'390px', md:"auto"}}
                left={{base:"165px", md:"auto"}}
                zIndex={6}
                as="span"
                display="block"
                fontFamily="'Rowan-Semibold', sans-serif"
                fontSize={{ base: '16vw', md: '12.5vw', lg: '10.5vw' }}
                color="brand.bone"
                lineHeight={0.85}
                textAlign="center"
                whiteSpace={{ base: 'normal', md: 'nowrap' }}
                style={{ opacity: 0 }}
                
              >
                {playerData.fullName2}
              </Text>
            </Flex>
          </Flex>
        </Box>

        {/* Player photo — centrada, por encima del título */}
        <Box
          className="player-photo-container"
          position="absolute"
          inset={0}
          zIndex={5}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          pb={{ base: '110px', md: '80px', lg: 0 }}
          pointerEvents="none"
          left={{ base: '0', md: '-10%' }}
        >
          <Box
            ref={photoRef}
            h={{ base: '70vh', md: '70vh', lg: '86vh' }}
            style={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
          >
            <Image
              className="player-photo"
              src={playerData.image}
              alt={`${playerData.displayName}, ${playerData.position.toLowerCase()} profesional de ${playerData.currentClub}`}
              h="100%"
              w={{ base: '96vw', md: '48vw', lg: '40vw' }}
              objectFit="contain"
              objectPosition="bottom center"
              draggable={false}
            />
          </Box>
        </Box>

        {/* Player info — centrado, debajo del jugador */}
        <Box
          className="player-info"
          position="absolute"
          left={{ base: '60%', md: '15%' }}
          bottom={{ base: '180px', md: '6%', lg: '25%' }}
          display="flex"
          justifyContent="center"
          zIndex={15}
        >
          <PlayerPanel />
        </Box>

        {/* MatchBox desktop */}
        <Box
          position="absolute"
          bottom="12%"
          right={0}
          top={{ base: 'auto', lg: '60%' }}
          zIndex={10}
          display={{ base: 'none', lg: 'block' }}
        >
          <MatchBox last={matches.last} next={matches.next} variant="card" />
        </Box>

        {/* MatchBox mobile */}
        <Box
          position="absolute"
          bottom={{ base: '30px', md: '40px' }}
          left={0}
          right={0}
          zIndex={15}
          display={{ base: 'block', lg: 'none' }}
        >
          <MatchBox last={matches.last} next={matches.next} variant="strip" />
        </Box>

        {/* Vignette */}
        <Box
          ref={vignetteRef}
          position="absolute"
          inset={0}
          zIndex={20}
          background="radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.65) 100%)"
          pointerEvents="none"
          style={{ opacity: 0.15 }}
        />
      </Box>
    </Box>
  )
}
