import { Datatype } from "./datatype";

type Actividad = "correr" | "bicicleta" | undefined;
export class Reto implements Datatype {
  private static retoCount = 0;
  public id: number;
  public static ids_retos: number[] = [];

  constructor(
    public nombre: string,
    private rutas: number[],
    private tipo_reto: Actividad,
    private km_totales: number,
    private usuarios_realizando_reto: number[]
  ) {
    this.id = Reto.retoCount++;
  }

  public getRutas(): number[] {
    return this.rutas;
  }

  public getKmTotales(): number {
    return this.km_totales;
  }

  public getUsuariosRealizandoReto(): number[] {
    return this.usuarios_realizando_reto;
  }

  public getTipoReto(): Actividad {
    return this.tipo_reto;
  }

  public setTipoReto(tipo_reto: Actividad): void {
    this.tipo_reto = tipo_reto;
  }

  public setKmTotales(km_totales: number): void {
    this.km_totales = km_totales;
  }

  public setUsuariosRealizandoReto(usuarios_realizando_reto: number[]): void {
    this.usuarios_realizando_reto = usuarios_realizando_reto;
  }

  public setRuta(ruta: number[]): void {
    this.rutas = ruta;
  }

  public añadirRuta(ruta: number): void {
    this.rutas.push(ruta);
  }

  public eliminarRuta(ruta: number): void {
    this.rutas = this.rutas.filter((element) => element !== ruta);
  }
}
