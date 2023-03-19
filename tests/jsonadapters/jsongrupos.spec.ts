import "mocha";
import { expect } from "chai";
import { JsonGrupos } from "../../src/jsonadapters/jsongrupos";
import { Grupo } from "../../src/datatypes/grupos";
import { Stats } from "../../src/datatypes/stats";
import fs from "fs";
import { json } from "stream/consumers";

describe("JsonGrupo", () => {
  it("Debe existir la clase JsonGrupo", () => {
    expect(JsonGrupos).to.exist;
  });
  it("Se debe poder crear un objeto de la clase JsonGrupo", () => {
    const jsonGrupo = new JsonGrupos();
    expect(jsonGrupo).to.be.an.instanceOf(JsonGrupos);
  });
  it("Se debe poder añadir y eliminar un grupo a la base de datos", () => {
    const jsonGrupo = new JsonGrupos();
    const grupo = new Grupo("Grupo1_test", [], new Stats(), [], [], []);
    jsonGrupo.addElement(grupo);
    const gruposdb = JSON.parse(fs.readFileSync("./data/grupos.json", "utf8"));
    expect(gruposdb.grupos[gruposdb.length - 1].id).to.be.equal(grupo.id);
    jsonGrupo.removeElement(grupo.id);
    expect(gruposdb.getElement(grupo.id)).to.be.undefined;
  });
});
