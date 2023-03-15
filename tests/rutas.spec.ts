import "mocha";
import { expect } from "chai";
import { Ruta } from "../src/rutas";

describe("Clase Rutass", () => {
  it("Debe existir la clase Rutas", () => {
    expect(Ruta).to.exist;
  });
  it("Se debe poder crear una instancia de Rutas", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "ruta1", 1);
    expect(ruta).to.be.an.instanceOf(Ruta);
  });
});
