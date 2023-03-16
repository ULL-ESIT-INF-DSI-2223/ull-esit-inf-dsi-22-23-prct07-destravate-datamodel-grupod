import "mocha";
import { expect } from "chai";
import { Grupo } from "../../src/datatypes/grupos";
import { Stats } from "../../src/datatypes/stats";

describe("Clase Grupos", () => {
  it("Debe existir la clase Grupo", () => {
    expect(Grupo).to.exist;
  });
  it("Se debe poder crear una instancia de Grupo", () => {
    const grupos = new Grupo("Grupo 1", [], new Stats(), [], [], []);
    expect(grupos).to.be.an.instanceOf(Grupo);
  });
});
