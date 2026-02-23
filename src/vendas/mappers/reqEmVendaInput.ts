import { FORMAS_PAGAMENTO } from "../../shared/types/FormaPagamento";
import { StatusPagamento } from "../../shared/types/StatusPagamento";
import { calcularVencimento } from "../../shared/utils/data";
import { validar } from "../../shared/utils/validar";
import { VendaInput } from "../models/VendaInput";
import { VendaItemInput } from "../models/VendaItemInput";
import { VendaPagamentoInput } from "../models/VendaPagamentoInput";

export const reqEmVendaInput = (body: any): VendaInput => {
  validaVenda(body);
  let valorItens: number = 0;
  let statusPagamento: StatusPagamento = "ABERTO";

  const itens: VendaItemInput[] = body.itens.map(
    (item: any, index: number): VendaItemInput => {
      validaVendaItem(item, index);
      valorItens += item.precoUnitario * item.quantidade;

      return {
        produtoVariacaoId: item.produtoVariacaoId,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
      };
    }
  );

  body.frete = body.frete ?? 0;
  body.outrasTaxas = body.outrasTaxas ?? 0;
  const valorTotal: number = valorItens + body.frete + body.outrasTaxas;

  const pagamentos: VendaPagamentoInput[] = geraVendaPagamentoLote(
    body,
    valorTotal
  );

  if (body.valorPago >= valorTotal) {
    statusPagamento = "PAGO_TOTAL";
  } else if (body.valorPago > 0) {
    statusPagamento = "PAGO_PARCIAL";
  }

  return {
    fornecedorId: body.fornecedorId,
    dataVenda: body.data,
    frete: body.frete ?? 0,
    outrasTaxas: body.outrasTaxas ?? 0,
    statusPagamento,
    pagamentos,
    itens,
  };
};

function validaVenda(body: any): void {
  validar(
    typeof body.fornecedorId !== "number" || body.fornecedorId <= 0,
    "Venda: id de fornecedor inválido."
  );

  validar(!body.data, "Venda: data inválida.");

  validar(
    !Array.isArray(body.itens) || body.itens.length === 0,
    "A lista de itens deve conter ao menos um item."
  );
}

function validaVendaItem(item: any, index: number): void {
  validar(
    typeof item.produtoVariacaoId !== "number" || item.produtoVariacaoId <= 0,
    `Venda - Item #${index + 1}: id da variação de produto inválido.`
  );

  validar(
    typeof item.quantidade !== "number" || item.quantidade <= 0,
    `Venda - Item #${index + 1}: quantidade inválida.`
  );

  validar(
    typeof item.precoUnitario !== "number" || item.precoUnitario <= 0,
    `Venda - Item #${index + 1}: preço unitário inválido.`
  );
}

function geraVendaPagamentoLote(
  body: any,
  valorTotal: number
): VendaPagamentoInput[] {
  body.quantidadeParcelas = body.quantidadeParcelas ?? 1;
  validaVendaPagamento(body);

  const pagamentos: VendaPagamentoInput[] = montaVendaPagamentoLote(
    body,
    valorTotal
  );

  return pagamentos;
}

function validaVendaPagamento(body: any): void {
  validar(
    body.valorPago == null || isNaN(body.valorPago) || body.valorPago < 0,
    "Venda: Valor pago inválido."
  );

  validar(
    body.quantidadeParcelas < 1,
    "Venda: Quantidade de parcelas inválida."
  );

  validar(
    !FORMAS_PAGAMENTO.includes(body.formaPagamento),
    "Venda: Forma de pagamento inválida."
  );
}

function montaVendaPagamentoLote(
  body: any,
  valorTotal: number
): VendaPagamentoInput[] {
  const pagamentos: VendaPagamentoInput[] = [];

  if (body.valorPago >= valorTotal) {
    pagamentos.push({
      dataPagamento: body.data,
      valorPago: valorTotal,
      formaPagamento: body.formaPagamento,
      statusParcela: "PAGO",
    });
    return pagamentos;
  }

  const valorRestante: number = valorTotal - body.valorPago;
  const parcelas: number = body.quantidadeParcelas;
  const valorParcela: number =
    parcelas > 1 ? valorRestante / parcelas : valorRestante;

  if (body.valorPago > 0) {
    pagamentos.push({
      dataPagamento: body.data,
      valorPago: body.valorPago,
      formaPagamento: body.formaPagamento,
      statusParcela: "PAGO",
    });
  }

  for (let i = 1; i <= parcelas; i++) {
    pagamentos.push({
      dataPagamento: calcularVencimento(body.data, i),
      valorPago: parseFloat(valorParcela.toFixed(2)),
      formaPagamento: body.formaPagamento,
      statusParcela: "NAO_PAGO",
    });
  }

  return pagamentos;
}
