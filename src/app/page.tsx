'use client';

import { useEffect, useState } from 'react'
import { Noticia } from '@/types/noticia'
import NewsCard from '@/components/NewsCard'

export default function Home() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://api.elderestrada.eu/api/noticias')
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data)
        setCargando(false)
      })
      .catch((err) => {
        console.error("Error cargando noticias:", err)
        setCargando(false)
      })
  }, [])

  const noticiasFiltradas = noticias.filter(n => 
    n.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
    n.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
                <h1 className="text-xl font-bold text-gray-900">NewsWatcher</h1>
            </div>
            
            <input 
              type="text" 
              placeholder="Buscar tema (ej: IA, Espacio...)" 
              className="w-full sm:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {cargando ? (
            <div className="text-center py-20 text-gray-500">Cargando noticias...</div>
        ) : (
            <>
                <p className="mb-6 text-gray-500">Mostrando {noticiasFiltradas.length} noticias</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {noticiasFiltradas.map((noticia) => (
                    <NewsCard key={noticia.id} noticia={noticia} />
                ))}
                </div>
                
                {noticiasFiltradas.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        No se encontraron noticias con ese término.
                    </div>
                )}
            </>
        )}
      </div>
    </main>
  )
}