import "mocha";
import { expect } from "chai";
import { Admin } from "../../src/app/Admin";

describe("Admin", () => {
  it("Deberia poder crear un menú de administrador", () => {
    const admin = Admin.getInstance();
    expect(admin).to.be.an.instanceOf(Admin);
  });
  it("Debería poder retornar de un menú", () => {
    const admin = Admin.getInstance();
    expect(admin.volver(admin.mainMenu.bind(admin))).to.be.equal(true);
  });
});
