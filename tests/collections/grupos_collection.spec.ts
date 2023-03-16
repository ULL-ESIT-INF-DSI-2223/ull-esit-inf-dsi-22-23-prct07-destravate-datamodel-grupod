import "mocha";
import { expect } from "chai";
import { GrupoCollection } from "../../src/collections/grupos_collection";
import { Grupo } from "../../src/datatypes/grupos";
import { Stats } from "../../src/datatypes/stats";

describe("GrupoCollection", () => {
  it("Debe existir la clase GrupoCollection", () => {
    expect(GrupoCollection).to.exist;
  });
  it("Se debe poder crear una instancia de GrupoCollection", () => {
    const grupos = new GrupoCollection();
    expect(grupos).to.be.an.instanceOf(GrupoCollection);
  });
  it("Se debe poder añadir un Grupo a la colección", () => {
    const grupos = new GrupoCollection();
    const grupo = new Grupo("Grupo1", [], new Stats(), [], [], []);
    grupos.addElement(grupo);
    expect(grupos.getElement(grupo.id)).to.be.equal(grupo);
  });
  it("Se debe poder eliminar un Grupo de la colección", () => {
    const grupos = new GrupoCollection();
    const grupo = new Grupo("Grupo1", [], new Stats(), [], [], []);
    grupos.addElement(grupo);
    grupos.removeElement(grupo.id);
    expect(grupos.getElement(grupo.id)).to.be.undefined;
  });
  it("Se debe poder obtener un Grupo de la colección", () => {
    const grupos = new GrupoCollection();
    const grupo = new Grupo("Grupo1", [], new Stats(), [], [], []);
    grupos.addElement(grupo);
    expect(grupos.getElement(grupo.id)).to.be.equal(grupo);
  });
});
