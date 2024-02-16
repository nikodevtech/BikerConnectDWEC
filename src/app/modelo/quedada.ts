import { Usuario } from "./usuario";

export interface Quedada {
    id?: string;
    descripcion: string;
    fechaHora: Date;
    lugar: string;
    estado: string;
    usuarioOrganizador: string;
    // participantesIds?: string[];
    participantes?: Usuario[];
}
