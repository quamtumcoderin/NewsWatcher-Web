/* eslint-disable @next/next/no-img-element */
import { Noticia } from "@/types/noticia";

interface Props {
    noticia: Noticia
}

export default function NewsCard({ noticia }: Props) {
    return (
        <a 
            href={noticia.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
        >
            <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                <img 
                    src={noticia.imagenUrl || "https://via.placeholder.com/400x200?text=Sin+Imagen"} 
                    alt={noticia.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2 group-hover:text-blue-600">
                    {noticia.titulo}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3">
                    {noticia.descripcion?.replace(/<[^>]*>?/gm, '') || "Sin descripción disponible."}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>{new Date(noticia.fechaPublicacion).toLocaleDateString()}</span>
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">Leer más</span>
                </div>
            </div>
        </a>
    )
}