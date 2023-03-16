import "mocha";
import { expect } from "chai";
import { JsonGrupos } from "../../src/jsonadapters/jsongrupos";
import { Grupo } from "../../src/datatypes/grupos";
import { Stats } from "../../src/datatypes/stats";
import fs from "fs";

describe("JsonGrupo", () => {
  it("Debe existir la clase JsonGrupo", () => {
    expect(JsonGrupos).to.exist;
  });
  it("Se debe poder crear un objeto de la clase JsonGrupo", () => {
    const jsonGrupo = new JsonGrupos();
    expect(jsonGrupo).to.be.an.instanceOf(JsonGrupos);
  });
  it("Se debe poder añadir un grupo a la base de datos", () => {
    const jsonGrupo = new JsonGrupos();
    const grupo = new Grupo("Grupo 1", [], new Stats(), [], [], []);
    jsonGrupo.addElement(grupo);
    const gruposdb = JSON.parse(fs.readFileSync("./data/grupos.json", "utf8"));
    expect(gruposdb.grupos[0].id).to.be.equal(grupo.id);
  });
  it("Se debe poder eliminar un grupo de la base de datos", () => {
    const jsonGrupo = new JsonGrupos();
    const grupo = new Grupo("Grupo 1", [], new Stats(), [], [], []);
    jsonGrupo.removeElement(grupo.id);
    const gruposdb = JSON.parse(fs.readFileSync("./data/grupos.json", "utf8"));
    expect(gruposdb.grupos.length).to.be.equal(1);
  });
});
