import "mocha";
import { expect } from "chai";
import { JsonUsuario } from "../../src/jsonadapters/jsonusuarios";
import { Usuario } from "../../src/datatypes/usuarios";
import { Stats } from "../../src/datatypes/stats";
import fs from "fs";

describe("JsonUsuario", () => {
  it("Debe existir la clase JsonUsuario", () => {
    expect(JsonUsuario).to.exist;
  });
  it("Se debe poder crear un objeto de la clase JsonUsuario", () => {
    const jsonUsuario = new JsonUsuario();
    expect(jsonUsuario).to.be.an.instanceOf(JsonUsuario);
  });
  it("Se debe poder añadir un usuario a la base de datos", () => {
    const jsonUsuario = new JsonUsuario();
    const usuario = new Usuario("Pepe", "correr", [], new Stats(), [], [], []);
    jsonUsuario.addElement(usuario);
    const usuariosdb = JSON.parse(
      fs.readFileSync("./data/usuarios.json", "utf8")
    );
    expect(usuariosdb.usuarios[0].id).to.be.equal(usuario.id);
  });
  it("Se debe poder eliminar un usuario de la base de datos", () => {
    const jsonUsuario = new JsonUsuario();
    const usuario = new Usuario("Juan", "correr", [], new Stats(), [], [], []);
    jsonUsuario.removeElement(usuario.id);
    const usuariosdb = JSON.parse(
      fs.readFileSync("./data/usuarios.json", "utf8")
    );
    expect(usuariosdb.usuarios.length).to.be.equal(1);
  });
});
