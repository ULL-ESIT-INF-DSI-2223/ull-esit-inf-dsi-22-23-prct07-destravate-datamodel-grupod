import "mocha";
import { expect } from "chai";
import { Admin } from "../../src/app/Admin";
import { UsuarioCollection } from "../../src/collections/usuario_collection";
import { GrupoCollection } from "../../src/collections/grupos_collection";
import { RetoCollection } from "../../src/collections/retos_collection";
import { RutaCollection } from "../../src/collections/rutas_collection";

describe("Admin", () => {
  it("Deberia poder crear un menú de administrador", () => {
    const admin = Admin.getInstance();
    expect(admin).to.be.an.instanceOf(Admin);
  });
  it("Debería poder retornar de un menú", () => {
    const admin = Admin.getInstance();
    expect(admin.volver(admin.mainMenu.bind(admin))).to.be.equal(true);
  });
  it("Se debería poder cambiar la colección de usuarios", () => {
    const admin = Admin.getInstance();
    const usuarios = new UsuarioCollection();
    admin.setUsuarios(usuarios);
    expect(admin.getUsuarios()).to.be.equal(usuarios);
  });
  it("Se debería poder cambiar la colección de grupos", () => {
    const admin = Admin.getInstance();
    const grupos = new GrupoCollection();
    admin.setGrupos(grupos);
    expect(admin.getGrupos()).to.be.equal(grupos);
  });
  it("Se debería poder cambiar la colección de retos", () => {
    const admin = Admin.getInstance();
    const retos = new RetoCollection();
    admin.setRetos(retos);
    expect(admin.getRetos()).to.be.equal(retos);
  });
  it("Se debería poder cambiar la colección de rutas", () => {
    const admin = Admin.getInstance();
    const rutas = new RutaCollection();
    admin.setRutas(rutas);
    expect(admin.getRutas()).to.be.equal(rutas);
  });
  it("Se debería poder ejecutar el menú principal", () => {
    const admin = Admin.getInstance();
    expect(admin.mainMenu()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de mostrar usuarios", () => {
    const admin = Admin.getInstance();
    expect(admin.mostrarUsuarios()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de mostrar grupos", () => {
    const admin = Admin.getInstance();
    expect(admin.mostrarGrupos()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de mostrar retos", () => {
    const admin = Admin.getInstance();
    expect(admin.mostrarRetos()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de mostrar rutas", () => {
    const admin = Admin.getInstance();
    expect(admin.mostrarRutas()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de crear usuarios", () => {
    const admin = Admin.getInstance();
    expect(admin.crearUsuario()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de crear grupos", () => {
    const admin = Admin.getInstance();
    expect(admin.crearGrupo()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de crear retos", () => {
    const admin = Admin.getInstance();
    expect(admin.crearReto()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de crear rutas", () => {
    const admin = Admin.getInstance();
    expect(admin.crearRuta()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de modificar usuarios", () => {
    const admin = Admin.getInstance();
    expect(admin.modificarUsuario()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de modificar grupos", () => {
    const admin = Admin.getInstance();
    expect(admin.modificarGrupo()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de modificar retos", () => {
    const admin = Admin.getInstance();
    expect(admin.modificarReto()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de modificar rutas", () => {
    const admin = Admin.getInstance();
    expect(admin.modificarRuta()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de eliminar usuarios", () => {
    const admin = Admin.getInstance();
    expect(admin.eliminarUsuario()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de eliminar grupos", () => {
    const admin = Admin.getInstance();
    expect(admin.eliminarGrupo()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de eliminar retos", () => {
    const admin = Admin.getInstance();
    expect(admin.eliminarReto()).to.be.equal(true);
  });
  it("Se debería poder ejecutar el menú de eliminar rutas", () => {
    const admin = Admin.getInstance();
    expect(admin.eliminarRuta()).to.be.equal(true);
  });
});
