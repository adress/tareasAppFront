export interface Tarea {
    id?: string;
    titulo?: string;
    descripcion: string;
    finalizada: boolean;
    fechaCreacion: string;
    fechaVencimiento: string;
}

export interface FormEvent {
    accion: Accion;
    tareaId?: string;
    tarea?: Tarea;
}

export enum Accion {
    Crear = 1,
    Actualizar = 2,
    Borrar = 3
}
