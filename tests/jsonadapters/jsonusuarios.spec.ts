import "mocha";
import { expect } from "chai";
import { JsonUsuarios } from "../../src/jsonadapters/jsonusuarios";
import { Usuario } from "../../src/datatypes/usuarios";
import { Stats } from "../../src/datatypes/stats";
import fs from "fs";

describe("JsonUsuario", () => {
  it("Debe existir la clase JsonUsuario", () => {
    expect(JsonUsuarios).to.exist;
  });
  it("Se debe poder crear un objeto de la clase JsonUsuario", () => {
    const jsonUsuario = new JsonUsuarios();
    expect(jsonUsuario).to.be.an.instanceOf(JsonUsuarios);
  });
});
