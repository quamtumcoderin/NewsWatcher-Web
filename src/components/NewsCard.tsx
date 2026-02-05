/* eslint-disable @next/next/no-img-element */
import { Noticia } from "@/types/noticia"

interface Props {
    noticia: Noticia
}

export default function NewsCard({ noticia }: Props) {
    const getDominio = (url: string) => {
        try {
            return new URL(url).hostname.replace('www.', '')
        } catch {
            return 'Desconocido'
        }
    }

    return (
        <a 
            href={noticia.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-border"
        >
            <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                    src={noticia.imagenUrl || "https://via.placeholder.com/400x200?text=Sin+Imagen"} 
                    alt={noticia.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    {getDominio(noticia.url)}
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-card-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                    {noticia.titulo}
                </h3>
                <p className="text-sm text-muted line-clamp-3">
                    {noticia.descripcion?.replace(/<[^>]*>?/gm, '') || "Sin descripción disponible."}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span>{new Date(noticia.fechaPublicacion).toLocaleDateString()}</span>
                    <span className="bg-blue-50 text-primary px-2 py-1 rounded-full font-medium">Leer más</span>
                </div>
            </div>
        </a>
    )
}