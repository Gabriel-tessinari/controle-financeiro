import { insertDivida } from "../../../../src/dividas/repositories/dividasRepository";
import { cadastrarDivida } from "../../../../src/dividas/usecases/cadastrarDivida";
import { DividaInputMock } from "../../../mocks/dividas/DividaInputMock";
import { DividaMock } from "../../../mocks/dividas/DividaMock";

jest.mock("../../../../src/dividas/repositories/dividasRepository");

describe("cadastrarDivida", () => {
  it("deve cadastrar dívida", async () => {
    const dividaInput = DividaInputMock.criar();
    const divida = DividaMock.criar();

    (insertDivida as jest.Mock).mockResolvedValue(divida);

    const response = await cadastrarDivida(dividaInput);

    expect(response).toStrictEqual(divida);
  });
});
