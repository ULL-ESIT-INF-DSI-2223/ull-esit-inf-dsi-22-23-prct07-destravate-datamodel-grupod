import "mocha";
import { expect } from "chai";
import { GrupoCollection } from "../../src/collections/grupos_collection";
import { Grupo } from "../../src/datatypes/grupos";

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
    const grupo = new Grupo(
      "Grupo1",
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
      [],
      -1
    );
    grupos.addElement(grupo);
    expect(grupos.getElement(grupo.id)).to.be.equal(grupo);
  });
  it("Se debe poder eliminar un Grupo de la colección", () => {
    const grupos = new GrupoCollection();
    const grupo = new Grupo(
      "Grupo1",
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
      [],
      -1
    );
    grupos.addElement(grupo);
    grupos.removeElement(grupo.id);
    expect(grupos.getElement(grupo.id)).to.be.undefined;
  });
  it("Se debe poder obtener un Grupo de la colección", () => {
    const grupos = new GrupoCollection();
    const grupo = new Grupo(
      "Grupo1",
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
      [],
      -1
    );
    grupos.addElement(grupo);
    expect(grupos.getElement(grupo.id)).to.be.equal(grupo);
  });
  it("Se debe poder actualizar un Grupo de la colección", () => {
    const grupos = new GrupoCollection();
    const grupo = new Grupo(
      "Grupo1",
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
      [],
      -1
    );
    grupos.addElement(grupo);
    grupo.nombre = "Grupo2";
    grupos.updateElement(grupo);
    expect(grupos.getElement(grupo.id)).to.be.equal(grupo);
  });
  it("Se debe poder buscar un Grupo de la colección", () => {
    const grupos = new GrupoCollection();
    const grupo = new Grupo(
      "Grupo1",
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
      [],
      -1
    );
    grupos.addElement(grupo);
    expect(grupos.findElement(grupo.nombre)).to.be.equal(grupo);
  });
  it("Se debe poder obtener el número de Grupos de la colección", () => {
    const grupos = new GrupoCollection();
    const grupo = new Grupo(
      "Grupo1",
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
      [],
      -1
    );
    grupos.addElement(grupo);
    expect(grupos.length()).to.be.equal(1);
  });
  it("Se debe poder iterar sobre la colección de Grupos", () => {
    const grupos = new GrupoCollection();
    const grupo = new Grupo(
      "Grupo1",
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
      [],
      -1
    );
    grupos.addElement(grupo);
    grupos.forEach((element) => {
      expect(element).to.be.equal(grupo);
    });
  });
  it("Se debe poder obtener un array con los nombres Grupos de la colección", () => {
    const grupos = new GrupoCollection();
    const grupo = new Grupo(
      "Grupo1",
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
      [],
      -1
    );
    grupos.addElement(grupo);
    const nombres = grupos.getAllElements().map((element) => {
      return element.nombre;
    });
    expect(nombres).to.be.eql(["Grupo1"]);
  });
});
