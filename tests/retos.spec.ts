import "mocha";
import { expect } from "chai";
import { Reto } from "../src/retos";

describe("Clase Retos", () => {
  it("Debe existir la clase Reto", () => {
    expect(Reto).to.exist;
  });
  it("Se debe poder crear una instancia de Reto", () => {
    const reto = new Reto("Reto1", [1], "ruta1", 1, [1]);
    expect(reto).to.be.an.instanceOf(Reto);
  });
});
