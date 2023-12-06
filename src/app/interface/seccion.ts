export interface Seccion {
    id:string;
    idurl:string;
    sigla:string;
    profesorID:string;
    asignaturaID:string;
    alumnoID:string[];
    nombre:string;
    dias:string[];
    horas:string[];
    isExpanded?: boolean;

}
