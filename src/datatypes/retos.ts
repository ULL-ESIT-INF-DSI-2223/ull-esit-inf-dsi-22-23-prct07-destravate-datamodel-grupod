import { Datatype } from "./datatype";

export class Reto implements Datatype {
  private static retoCount = 0;
  public id: number;
  public static ids_retos: number[] = [];

  constructor(
    public nombre: string,
    private ruta: number[],
    private tipo_reto: string,
    private km_totales: number,
    private usuarios_realizando_reto: number[]
  ) {
    this.id = Reto.retoCount++;
  }

  public getKmTotales(): number {
    return this.km_totales;
  }

  public getUsuariosRealizandoReto(): number[] {
    return this.usuarios_realizando_reto;
  }
}
