'use client';

'use client';

import { useEffect, useState } from 'react'
import { TrashIcon, PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle';

interface Fuente {
    id?: number;
    nombre: string;
    url: string;
    categoria: string;
}

export default function Configuracion() {
    const [fuentes, setFuentes] = useState<Fuente[]>([])
    const [loading, setLoading] = useState(true)

    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevaUrl, setNuevaUrl] = useState('');
    const [nuevaCategoria, setNuevaCategoria] = useState('General');

    const API_URL = 'https://api.elderestrada.eu/api/fuentes'

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setFuentes(data)
                setLoading(false)
            })
    }, [])

    const handleAgregar = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!nuevoNombre || !nuevaUrl) return

        const nuevaFuente = { nombre: nuevoNombre, url: nuevaUrl, categoria: nuevaCategoria }

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaFuente)
        })

        if (res.ok) {
            const fuenteGuardada = await res.json()
            setFuentes([...fuentes, fuenteGuardada])
            setNuevoNombre('')
            setNuevaUrl('')
            setNuevaCategoria('General')
        }
    }

    const handleBorrar = async (id: number) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        setFuentes(fuentes.filter(f => f.id !== id))
    }

    return (
        <div className="min-h-screen p-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
        
                <div className="flex justify-between items-center gap-4 mb-8">
                    <Link href="/" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Gestión de Fuentes y Temas</h1>

                    <ThemeToggle />
                </div>

                <div className="news-card p-6 rounded-xl shadow-sm mb-10">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <PlusIcon className="w-5 h-5 text-[rgb(var(--primary))]" />
                        Añadir Nueva Fuente RSS
                    </h2>
                    <form onSubmit={handleAgregar} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input 
                            type="text" 
                            placeholder="Nombre (ej: El País Tech)" 
                            className="p-2 rounded border border-[rgb(var(--card-border))] bg-[rgb(var(--background))]"
                            value={nuevoNombre}
                            onChange={e => setNuevoNombre(e.target.value)}
                            required
                        />
                        <select 
                            className="p-2 rounded border border-[rgb(var(--card-border))] bg-[rgb(var(--background))]"
                            value={nuevaCategoria}
                            onChange={e => setNuevaCategoria(e.target.value)}
                        >
                            <option value="General">General</option>
                            <option value="Tecnología">Tecnología</option>
                            <option value="Ciencia">Ciencia</option>
                            <option value="Deportes">Deportes</option>
                            <option value="Economía">Economía</option>
                            <option value="Ciberseguridad">Ciberseguridad</option>
                        </select>
                        <input 
                            type="url" 
                            placeholder="URL del RSS (ej: https://...)" 
                            className="p-2 rounded border border-[rgb(var(--card-border))] bg-[rgb(var(--background))] md:col-span-2"
                            value={nuevaUrl}
                            onChange={e => setNuevaUrl(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            className="md:col-span-4 bg-[rgb(var(--primary))] text-white py-2 rounded font-medium hover:opacity-90 transition-opacity"
                        >
                            Guardar Fuente
                        </button>
                    </form>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Fuentes Activas ({fuentes.length})</h2>
            
                    {loading ? <p>Cargando...</p> : null}

                    {fuentes.map(fuente => (
                        <div key={fuente.id} className="news-card p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-lg">{fuente.nombre}</h3>
                                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {fuente.categoria}
                                    </span>
                                </div>
                                <p className="text-sm text-[rgb(var(--muted))] truncate max-w-lg">{fuente.url}</p>
                            </div>
                    
                            <button 
                                onClick={() => fuente.id && handleBorrar(fuente.id)}
                                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded transition-colors"
                                title="Eliminar fuente"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}

                    {!loading && fuentes.length === 0 && (
                        <p className="text-center text-[rgb(var(--muted))] py-10">
                            No tienes fuentes configuradas. ¡Añade una arriba!
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}