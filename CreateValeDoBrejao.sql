-- Criar banco
CREATE DATABASE valedobrejao;
USE valedobrejao;

-- =====================
-- TABELAS DE CADASTRO
-- =====================

-- Funcionários
CREATE TABLE funcionarios (
    idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    cargo ENUM('Funcionario', 'Administrador') NOT NULL,
    salario DECIMAL(10,2),
    login VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_admissao DATE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- Fornecedores
CREATE TABLE fornecedores (
    idFornecedor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj CHAR(14) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco VARCHAR(255)
);

-- Produtos
CREATE TABLE produtos (
    idProduto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    marca VARCHAR(50),
    preco_venda DECIMAL(10,2) NOT NULL,
    preco_custo DECIMAL(10,2),
    unidade_medida ENUM('un', 'ml', 'l', 'kg', 'g') DEFAULT 'un',
    estoque_atual INT DEFAULT 0,
    estoque_minimo INT DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE
);

-- Relacionar produto com fornecedor
CREATE TABLE produto_fornecedor (
    idProduto INT,
    idFornecedor INT,
    PRIMARY KEY (idProduto, idFornecedor),
    FOREIGN KEY (idProduto) REFERENCES produtos(idProduto),
    FOREIGN KEY (idFornecedor) REFERENCES fornecedores(idFornecedor)
);

-- =====================
-- PERMISSÕES
-- =====================

CREATE TABLE permissoes (
    idPermissao INT AUTO_INCREMENT PRIMARY KEY,
    idFuncionario INT,
    podeCadastrarFuncionario BOOLEAN DEFAULT FALSE,
    podeGerenciarEstoque BOOLEAN DEFAULT FALSE,
    podeRegistrarVendas BOOLEAN DEFAULT FALSE,
    podeCancelarVenda BOOLEAN DEFAULT FALSE,
    podeEmitirNota BOOLEAN DEFAULT FALSE,
    podeGerarRelatorios BOOLEAN DEFAULT FALSE,
    podeAbrirCaixa BOOLEAN DEFAULT FALSE,
    podeFecharCaixa BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (idFuncionario) REFERENCES funcionarios(idFuncionario)
);

-- =====================
-- VENDAS
-- =====================

CREATE TABLE vendas (
    idVenda INT AUTO_INCREMENT PRIMARY KEY,
    idFuncionario INT,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10,2),
    status ENUM('Concluída', 'Cancelada') DEFAULT 'Concluída',
    FOREIGN KEY (idFuncionario) REFERENCES funcionarios(idFuncionario)
);

CREATE TABLE venda_itens (
    idItem INT AUTO_INCREMENT PRIMARY KEY,
    idVenda INT,
    idProduto INT,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idVenda) REFERENCES vendas(idVenda),
    FOREIGN KEY (idProduto) REFERENCES produtos(idProduto)
);

CREATE TABLE cancelamentos (
    idCancelamento INT AUTO_INCREMENT PRIMARY KEY,
    idVenda INT,
    idFuncionario INT,
    motivo VARCHAR(255),
    data_cancelamento DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idVenda) REFERENCES vendas(idVenda),
    FOREIGN KEY (idFuncionario) REFERENCES funcionarios(idFuncionario)
);

-- =====================
-- ESTOQUE
-- =====================

CREATE TABLE estoque_movimentacoes (
    idMovimentacao INT AUTO_INCREMENT PRIMARY KEY,
    idProduto INT,
    tipo ENUM('Entrada', 'Saída', 'Ajuste') NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    observacao VARCHAR(255),
    FOREIGN KEY (idProduto) REFERENCES produtos(idProduto)
);

-- =====================
-- FINANCEIRO
-- =====================

CREATE TABLE caixa (
    idCaixa INT AUTO_INCREMENT PRIMARY KEY,
    idFuncionario INT,
    data_abertura DATETIME NOT NULL,
    data_fechamento DATETIME,
    saldo_inicial DECIMAL(10,2) NOT NULL,
    saldo_fechamento DECIMAL(10,2),
    status ENUM('Aberto', 'Fechado') DEFAULT 'Aberto',
    FOREIGN KEY (idFuncionario) REFERENCES funcionarios(idFuncionario)
);

CREATE TABLE financeiro_movimentacoes (
    idMov INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('Entrada', 'Saída') NOT NULL,
    descricao VARCHAR(255),
    valor DECIMAL(10,2) NOT NULL,
    data_mov DATETIME DEFAULT CURRENT_TIMESTAMP,
    idCaixa INT,
    FOREIGN KEY (idCaixa) REFERENCES caixa(idCaixa)
);
