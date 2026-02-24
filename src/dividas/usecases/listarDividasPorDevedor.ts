import { executarTransacao } from "../../shared/utils/executarTransacao";
import { Divida } from "../models/Divida";
import { selectPagamentosByDivida } from "../repositories/dividasPagamentosRepository";
import { selectDividasByDevedor } from "../repositories/dividasRepository";

export async function listarDividasPorDevedor(
  devedorId: number
): Promise<Divida[]> {
  return executarTransacao(async (client) => {
    const dividas = await selectDividasByDevedor(devedorId, client);

    for (const divida of dividas) {
      const pagamentos = await selectPagamentosByDivida(divida.id, client);
      divida.pagamentos = pagamentos;
    }

    return dividas;
  });
}
