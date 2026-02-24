-- ========================================
-- Script de criação inicial do Banco de Dados
-- Projeto: Controle
-- Banco: PostgreSQL
-- ========================================

-- ===================================================
-- Tabela: devedores
-- Descrição: Armazena devedores
-- ===================================================
CREATE TABLE devedores (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- ===================================================
-- Tabela: dividas
-- Descrição: Tabela para registrar as dívidas assumidas pelos devedores
-- ===================================================
CREATE TABLE dividas (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    devedor_id INT NOT NULL,
    data_divida DATE NOT NULL DEFAULT CURRENT_DATE,
    descricao VARCHAR(255) NOT NULL,
    valor NUMERIC(15, 2) NOT NULL CHECK (valor > 0),
    observacao TEXT,
    CONSTRAINT fk_devedor FOREIGN KEY (devedor_id) REFERENCES devedores(id) ON DELETE CASCADE
);

-- ===================================================
-- Tabela: pagamentos
-- Descrição: Armazena pagamentos/parcelas feitas para abater a dívida
-- ===================================================
CREATE TABLE pagamentos (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    divida_id INT NOT NULL,
    data_pagamento DATE NOT NULL DEFAULT CURRENT_DATE,
    valor_pago NUMERIC(15, 2) NOT NULL CHECK (valor_pago > 0),
    CONSTRAINT fk_divida FOREIGN KEY (divida_id) REFERENCES dividas(id) ON DELETE CASCADE
);