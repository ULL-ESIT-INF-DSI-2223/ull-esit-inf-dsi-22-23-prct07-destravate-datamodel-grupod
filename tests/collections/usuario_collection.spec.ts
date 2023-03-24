import "mocha";
import { expect } from "chai";
import { UsuarioCollection } from "../../src/collections/usuario_collection";
import { Usuario } from "../../src/datatypes/usuarios";
import { Stats } from "../../src/datatypes/stats";

describe("UsuarioCollection", () => {
  it("Debe existir la clase UsuarioCollection", () => {
    expect(UsuarioCollection).to.exist;
  });
  it("Se debe poder crear una instancia de UsuarioCollection", () => {
    const usuarios = new UsuarioCollection();
    expect(usuarios).to.be.an.instanceOf(UsuarioCollection);
  });
  it("Se debe poder añadir un usuario a la colección", () => {
    const usuarios = new UsuarioCollection();
    const usuario = new Usuario(
      "usuario1",
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
    usuarios.addElement(usuario);
    expect(usuarios.getElement(usuario.id)).to.be.equal(usuario);
  });
  it("Se debe poder eliminar un usuario de la colección", () => {
    const usuarios = new UsuarioCollection();
    const usuario = new Usuario(
      "usuario1",
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
    usuarios.addElement(usuario);
    usuarios.removeElement(usuario.id);
    expect(usuarios.getElement(usuario.id)).to.be.undefined;
  });
  it("Se debe poder obtener un usuario de la colección", () => {
    const usuarios = new UsuarioCollection();
    const usuario = new Usuario(
      "usuario1",
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
    usuarios.addElement(usuario);
    expect(usuarios.getElement(usuario.id)).to.be.equal(usuario);
  });
  it("Se debe poder actualizar un usuario de la colección", () => {
    const usuarios = new UsuarioCollection();
    const usuario = new Usuario(
      "usuario1",
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
    usuarios.addElement(usuario);
    usuario.nombre = "usuario2";
    usuarios.updateElement(usuario);
    expect(usuarios.getElement(usuario.id)).to.be.equal(usuario);
  });
  it("Se debe poder buscar un usuario de la colección", () => {
    const usuarios = new UsuarioCollection();
    const usuario = new Usuario(
      "usuario1",
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
    usuarios.addElement(usuario);
    expect(usuarios.findElement(usuario.nombre)).to.be.equal(usuario);
  });
  it("Se debe poder obtener el número de usuarios de la colección", () => {
    const usuarios = new UsuarioCollection();
    const usuario = new Usuario(
      "usuario1",
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
    usuarios.addElement(usuario);
    expect(usuarios.length()).to.be.equal(1);
  });
  it("Se debe poder obtener los nombres de los usuarios de la colección", () => {
    const usuarios = new UsuarioCollection();
    const usuario = new Usuario(
      "usuario1",
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
    usuarios.addElement(usuario);
    let nombres = usuarios.getAllElements().map((usuario) => usuario.nombre);
    expect(nombres).to.be.eql(["usuario1"]);
  });
});
