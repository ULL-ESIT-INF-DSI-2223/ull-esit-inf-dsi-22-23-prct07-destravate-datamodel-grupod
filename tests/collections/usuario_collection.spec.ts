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
      new Stats(),
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
      new Stats(),
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
      new Stats(),
      [],
      [],
      []
    );
    usuarios.addElement(usuario);
    expect(usuarios.getElement(usuario.id)).to.be.equal(usuario);
  });
});
