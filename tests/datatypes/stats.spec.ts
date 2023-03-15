import "mocha";
import { expect } from "chai";
import { Stats } from "../../src/datatypes/stats";

describe("Clase Stats", () => {
  it("Debe existir la clase Stats", () => {
    expect(Stats).to.exist;
  });
  it("Se debe poder crear una instancia de Stats", () => {
    const stats = new Stats();
    expect(stats).to.be.an.instanceOf(Stats);
  });
});
