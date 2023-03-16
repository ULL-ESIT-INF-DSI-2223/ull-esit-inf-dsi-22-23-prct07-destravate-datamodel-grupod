import "mocha";
import { expect } from "chai";
import { Usuario } from "../../src/datatypes/usuarios";

describe("Clase Usuario", () => {
  it("Debe existir la clase Usuario", () => {
    expect(Usuario).to.exist;
  });
  it("Se debe poder crear una instancia de Usuario", () => {
    const usuario = new Usuario("Usuario 1");
    expect(usuario).to.be.an.instanceOf(Usuario);
  });
});
