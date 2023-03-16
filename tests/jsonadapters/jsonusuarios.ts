import "mocha";
import { expect } from "chai";
import { JsonUsuario } from "../../src/jsonadapters/jsonusuarios";

describe("JsonUsuario", () => {
  it("Debe existir la clase JsonUsuario", () => {
    expect(JsonUsuario).to.exist;
  });
});
