import "mocha";
import { expect } from "chai";
import { Usuario } from "../../src/datatypes/usuarios";
import { Stats } from "../../src/datatypes/stats";
import { Ruta } from "../../src/datatypes/rutas";

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
  it("Se puden obtener los kilometros totales del usuario", () => {
    const stats = new Stats();
    stats.updateStats(100, 100);
    const usuario = new Usuario("Usuario 1", "correr", [], stats, [], [], []);
    expect(usuario.getKmRecorridosAnio()).to.be.equal(100);
    expect(usuario.getKmRecorridosMes()).to.be.equal(100);
    expect(usuario.getKmRecorridosSemana()).to.be.equal(100);
  });
  it("Se puede cambiar el nombre del usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [],
      [],
      []
    );
    usuario.cambiarNombre("Usuario 2");
    expect(usuario.nombre).to.be.equal("Usuario 2");
  });
  it("Se puede cambiar la actividad del usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [],
      [],
      []
    );
    usuario.cambiarActividad("bicicleta");
    expect(usuario.getActividad()).to.be.equal("bicicleta");
  });
  it("Se puede añadir un amigo al usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [],
      [],
      []
    );
    usuario.addAmigo(5);
    expect(usuario.getAmigos()).to.be.deep.equal([5]);
  });
  it("Se puede añadir una ruta favorita al usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [],
      [],
      []
    );
    usuario.addRutaFavorita(5);
    expect(usuario.getRutasFavoritas()).to.be.deep.equal([5]);
  });
  it("Se puede añadir un reto activo al usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [],
      [],
      []
    );
    usuario.addRetoActivo(5);
    expect(usuario.getRetosActivos()).to.be.deep.equal([5]);
  });
  it("Se puede añadir una ruta al historico del usuario", () => {
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "correr", [1]);
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [],
      new Stats(),
      [],
      [],
      []
    );
    usuario.addHistoricoRuta(ruta);
    expect(usuario.getHistoricoRutas().length).to.be.equal(1);
  });
  it("Se debe poder eliminar un amigo del usuario", () => {
    const usuario = new Usuario(
      "Usuario 1",
      "correr",
      [5, 6, 7],
      new Stats(),
      [],
      [],
      []
    );
    usuario.removeAmigo(6);
    expect(usuario.getAmigos()).to.be.deep.equal([5, 7]);
  });
});
