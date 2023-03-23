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
});
