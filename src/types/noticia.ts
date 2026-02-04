export interface Noticia {
    id: number;
    titulo: string;
    descripcion: string;
    url: string;
    imagenUrl: string;
    fechaPublicacion: string;
    fuente?: string; 
}