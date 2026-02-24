import { MOVIMENTACAO_ORIGEM } from "../../../../src/movimentacoes/models/types/MovimentacaoOrigem";
import { MOVIMENTACAO_TIPO } from "../../../../src/movimentacoes/models/types/MovimentacaoTipo";
import { Aleatorios } from "../../../../src/shared/utils/aleatorio";

describe("Aleatorios", () => {
  describe("getString", () => {
    it("deve retornar string com prefixo padrão", () => {
      const result = Aleatorios.getString();

      expect(typeof result).toBe("string");
      expect(result.startsWith("Item-")).toBe(true);
    });

    it("deve retornar string com prefixo customizado", () => {
      const result = Aleatorios.getString("Teste");

      expect(typeof result).toBe("string");
      expect(result.startsWith("Teste-")).toBe(true);
    });
  });

  describe("getInt", () => {
    it("deve retornar número inteiro entre 1 e 10", () => {
      const result = Aleatorios.getInt();

      expect(typeof result).toBe("number");
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });
  });

  describe("getFloat", () => {
    it("deve retornar número float com 2 casas decimais", () => {
      const result = Aleatorios.getFloat();

      expect(typeof result).toBe("number");
      expect(result.toString().split(".")[1]?.length).toBeLessThanOrEqual(2);
      expect(result).toBeGreaterThanOrEqual(10);
      expect(result).toBeLessThanOrEqual(200);
    });
  });

  describe("getBoolean", () => {
    it("deve retornar boolean", () => {
      const result = Aleatorios.getBoolean();

      expect(typeof result).toBe("boolean");
    });
  });

  describe("getDataString", () => {
    it("deve retornar string de data no formato YYYY-MM-DD", () => {
      const result = Aleatorios.getDataString();

      expect(typeof result).toBe("string");
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe("métodos de enum", () => {
    it("getMovimentacaoTipo deve retornar valor do array", () => {
      const result = Aleatorios.getMovimentacaoTipo();

      expect(MOVIMENTACAO_TIPO).toContain(result);
    });

    it("getMovimentacaoOrigem deve retornar valor do array", () => {
      const result = Aleatorios.getMovimentacaoOrigem();

      expect(MOVIMENTACAO_ORIGEM).toContain(result);
    });
  });
});
