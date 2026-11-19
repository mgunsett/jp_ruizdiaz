import { useState, useEffect } from 'react'
import { getDoc } from 'firebase/firestore'
import { isFirebaseConfigured, playerStatsDoc } from '../lib/firebase'

// Lee la ficha del último partido (stats/last) y la anterior (stats/prev)
// para mostrar la diferencia. Si no hay datos o falla la lectura, devuelve
// null y el componente no se muestra.
export default function useLastMatchStats() {
  const [stats, setStats] = useState({ last: null, prev: null })
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) return

    const fetchStats = async () => {
      try {
        const [lastSnap, prevSnap] = await Promise.all([
          getDoc(playerStatsDoc('last')),
          getDoc(playerStatsDoc('prev')),
        ])
        setStats({
          last: lastSnap.exists() ? lastSnap.data() : null,
          prev: prevSnap.exists() ? prevSnap.data() : null,
        })
      } catch {
        // sin datos: el bloque queda oculto
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { ...stats, loading }
}
