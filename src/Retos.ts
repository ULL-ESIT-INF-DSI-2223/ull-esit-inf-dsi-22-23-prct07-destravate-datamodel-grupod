import { Rutas } from "./Rutas";
import { Usuario } from "./Usuarios";

export class Retos {
    private _id: number;
    private _nombre: string;
    private _ruta: Rutas[];
    private _tipo_reto: string;
    private _km_totales: number;
    private _usuarios_realizando_reto: Usuario[];

    public static ids_retos: number[] = [];

    constructor(id: number, nombre: string, ruta: Rutas[], tipo_reto: string, km_totales: number, usuarios_realizando_reto: Usuario[]){
        if (Retos.ids_retos.includes(id)){
            throw new Error("Ya existe un reto con ese id");
        }
        this._id = id;
        this._nombre = nombre;
        this._ruta = ruta;
        this._tipo_reto = tipo_reto;
        this._km_totales = km_totales;
        this._usuarios_realizando_reto = usuarios_realizando_reto;
    }

}