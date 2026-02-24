import { insertDevedor } from "../../../../src/devedores/repositories/devedoresRepository";
import { cadastrarDevedor } from "../../../../src/devedores/usecases/cadastrarDevedor";
import { DevedorInputMock } from "../../../mocks/devedores/DevedorInputMock";

jest.mock("../../../../src/devedores/repositories/devedoresRepository");

describe("cadastrarDevedor", () => {
  it("deve cadastrar devedor", async () => {
    const devedor = DevedorInputMock.criar();
    const id = 18;

    (insertDevedor as jest.Mock).mockResolvedValue(id);

    const response = await cadastrarDevedor(devedor);

    expect(response).toStrictEqual(id);
  });
});
