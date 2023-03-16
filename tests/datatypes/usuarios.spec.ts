import "mocha";
import { expect } from "chai";
import { Usuario } from "../../src/datatypes/usuarios";
import { Stats } from "../../src/datatypes/stats";

describe("Clase Usuario", () => {
  it("Debe existir la clase Usuario", () => {
    expect(Usuario).to.exist;
  });
  it("Se debe poder crear una instancia de Usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [],
      [],
      []
    );
    expect(usuario).to.be.an.instanceOf(Usuario);
  });
  it("Se debe poder acceder a la actividad del usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [],
      [],
      []
    );
    expect(usuario.getActividad()).to.be.equal("correr");
  });
  it("Se debe poder acceder a los amigos del usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [5, 6, 7],
      new Stats(),
      [],
      [],
      []
    );
    expect(usuario.getAmigos()).to.be.deep.equal([5, 6, 7]);
  });
  it("Se debe poder acceder a las estadísticas del usuario", () => {
    const stats = new Stats();
    const usuario = new Usuario("Usuario 1", "correr", [], stats, [], [], []);
    expect(usuario.getStats()).to.be.equal(stats);
  });
  it("Se debe poder acceder a las rutas favoritas del usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [1, 2, 3],
      [],
      []
    );
    expect(usuario.getRutasFavoritas()).to.be.deep.equal([1, 2, 3]);
  });
  it("Se debe poder acceder a los retos activos del usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [],
      [10, 20, 30],
      []
    );
    expect(usuario.getRetosActivos()).to.be.deep.equal([10, 20, 30]);
  });
  it("Se debe poder acceder al historico de rutas del usuario", () => {
    const today = new Date();
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [],
      [],
      [{ fecha: today, rutaid: 1 }]
    );
    expect(usuario.getHistoricoRutas()).to.be.deep.equal([
      { fecha: today, rutaid: 1 },
    ]);
  });
});
