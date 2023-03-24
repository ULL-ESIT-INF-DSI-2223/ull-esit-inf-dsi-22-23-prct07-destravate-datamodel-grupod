import "mocha";
import { expect } from "chai";
import { JsonGrupos } from "../../src/jsonadapters/jsongrupos";
import { Grupo } from "../../src/datatypes/grupos";

describe("JsonGrupo", () => {
  it("Debe existir la clase JsonGrupo", () => {
    expect(JsonGrupos).to.exist;
  });
  it("Se debe poder crear un objeto de la clase JsonGrupo", () => {
    const jsonGrupo = new JsonGrupos();
    expect(jsonGrupo).to.be.an.instanceOf(JsonGrupos);
  });
  it("Se puede añadir un grupo a la base de datos", () => {
    const jsonGrupo = new JsonGrupos();
    const grupo = new Grupo(
      "Grupo 1 TEST",
      [1, 2, 3],
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
    expect(jsonGrupo.addElement(grupo)).to.be.deep.eq(grupo.id);
  });
  it("Se puede modificar un grupo de la base de datos", () => {
    const jsonGrupo = new JsonGrupos();
    const grupos = jsonGrupo.getAllElements();
    const size = grupos.length;
    const grupo = grupos[size - 1];
    grupo.nombre = "Grupo 2 TEST";
    jsonGrupo.updateElement(grupo);
    expect(grupo.nombre).to.be.deep.eq("Grupo 2 TEST");
  });
  it("Se puede eliminar un grupo de la base de datos", () => {
    const jsonGrupo = new JsonGrupos();
    const grupos = jsonGrupo.getAllElements();
    const size = grupos.length;
    const grupo_id = grupos[size - 1].id;
    expect(jsonGrupo.removeElement(grupo_id)).to.be.eq(true);
  });
});
