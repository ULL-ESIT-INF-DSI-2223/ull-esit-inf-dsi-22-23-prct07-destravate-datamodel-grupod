import "mocha";
import { expect } from "chai";
import { JsonUsuarios } from "../../src/jsonadapters/jsonusuarios";
import { Usuario } from "../../src/datatypes/usuarios";

describe("JsonUsuario", () => {
  it("Debe existir la clase JsonUsuario", () => {
    expect(JsonUsuarios).to.exist;
  });
  it("Se debe poder crear un objeto de la clase JsonUsuario", () => {
    const jsonUsuario = new JsonUsuarios();
    expect(jsonUsuario).to.be.an.instanceOf(JsonUsuarios);
  });
  it("Se puede añadir un usuario a la base de datos", () => {
    const jsonUsuario = new JsonUsuarios();
    const usuario = new Usuario(
      "Usuario 1 TEST",
      "correr",
      [],
      {
        km_anio: 0,
        km_mes: 0,
        km_semana: 0,
        desnivel_anio: 0,
        desnivel_mes: 0,
        desnivel_semana: 0,
      },
      [],
      [],
      []
    );
    expect(jsonUsuario.addElement(usuario)).to.be.deep.eq(usuario.id);
  });
  it("Se puede modificar un usuario de la base de datos", () => {
    const jsonUsuario = new JsonUsuarios();
    const usuarios = jsonUsuario.getAllElements();
    const size = usuarios.length;
    const usuario = usuarios[size - 1];
    usuario.nombre = "Usuario 2 TEST";
    jsonUsuario.updateElement(usuario);
    expect(usuario.nombre).to.be.deep.eq("Usuario 2 TEST");
  });
  it("Se puede eliminar un usuario de la base de datos", () => {
    const jsonUsuario = new JsonUsuarios();
    const usuarios = jsonUsuario.getAllElements();
    const size = usuarios.length;
    const usuario_id = usuarios[size - 1].id;
    expect(jsonUsuario.removeElement(usuario_id)).to.be.eq(true);
  });
});
