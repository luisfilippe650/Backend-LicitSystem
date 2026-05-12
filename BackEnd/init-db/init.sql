-- 1. CRIAÇÃO DO BANCO DE DADOS (Caso não exista)
CREATE DATABASE IF NOT EXISTS licit_system;
USE licit_system;

-- 2. TABELA: usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ultimo_login` datetime DEFAULT NULL,
  `perfil` enum('admin','gestor','fornecedor','visualizacao') DEFAULT 'fornecedor',
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `uq_usuario_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 3. TABELA: secretarias
CREATE TABLE IF NOT EXISTS `secretarias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sigla` varchar(10) NOT NULL,
  `nome` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sigla` (`sigla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Inserindo dados iniciais das secretarias
INSERT IGNORE INTO `secretarias` (`id`, `sigla`, `nome`) VALUES
(64,'SEAD','Secretaria Municipal de Administração'),
(65,'GAB','Gabinete'),
(66,'SEGOV','Secretaria Municipal de Governo'),
(67,'SMADS','Secretaria Municipal de Assistência e Desenvolvimento Social'),
(68,'SECULT','Secretaria Municipal de Cultura'),
(69,'SMDET','Secretaria Municipal de Desenvolvimento Econômico e Turismo'),
(70,'SAJ','Secretaria Municipal de Assuntos Jurídicos'),
(71,'SMDUR','Secretaria Municipal de Desenvolvimento Urbano e Rural'),
(72,'SEDU','Secretaria Municipal de Educação'),
(73,'SEMELJ','Secretaria Municipal de Esporte, Lazer e Juventude'),
(74,'SEFIN','Secretaria Municipal de Finanças'),
(75,'SEMMA','Secretaria Municipal de Meio Ambiente'),
(76,'SMOSP','Secretaria Municipal de Obras e Serviços Públicos'),
(77,'SEMUS','Secretaria Municipal de Saúde'),
(78,'SMSP','Secretaria Municipal de Segurança Pública'),
(79,'SMPD','Secretaria Municipal da Pessoa com Deficiência'),
(80,'SMPP','Secretaria Municipal de Políticas Públicas'),
(81,'SMDH','Secretaria Municipal da Mulher e de Direitos Humanos'),
(82,'SEFAZ','Secretaria Municipal da Fazenda');

-- Inserindo dados iniciais das categorias
INSERT IGNORE INTO `categorias` (`id`, `nome`, `tipo`) VALUES
(1, 'Geral', 'Global'),
(2, 'Materiais', 'Item'),
(3, 'Serviços', 'Lote');

-- Inserindo usuário administrador padrão (Senha: admin123)
-- Importante para que a FK de licitacoes não falhe
INSERT IGNORE INTO `usuarios` (`id`, `nome`, `email`, `senha`, `perfil`) VALUES
(1, 'Administrador', 'admin@licitsystem.com.br', 'admin123', 'admin');

-- 5. TABELA: licitacoes
CREATE TABLE IF NOT EXISTS `licitacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `secretaria_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  `numero` int NOT NULL,
  `ano` int NOT NULL,
  `tipo` enum('Pregão Eletrônico','Concorrência Pública') NOT NULL,
  `status` enum('Aberto','Em Andamento','Suspenso','Revogado','Finalizado') DEFAULT 'Aberto',
  `classificacao` enum('Global','Item','Lote') DEFAULT 'Global',
  `objeto` varchar(300) DEFAULT NULL,
  `descricao_objeto` text,
  `valor_estimado` decimal(15,2) DEFAULT NULL,
  `data_publicacao` date DEFAULT NULL,
  `data_abertura` date DEFAULT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_numero_ano` (`numero`,`ano`),
  CONSTRAINT `licitacoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `licitacoes_ibfk_2` FOREIGN KEY (`secretaria_id`) REFERENCES `secretarias` (`id`),
  CONSTRAINT `licitacoes_ibfk_3` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 6. TABELA: anexos
CREATE TABLE IF NOT EXISTS `anexos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `licitacao_id` int NOT NULL,
  `nome` varchar(200) NOT NULL,
  `caminho` varchar(500) NOT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  `categoria` varchar(30) NOT NULL DEFAULT 'documento',
  `tamanho_kb` int DEFAULT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `anexos_ibfk_1` FOREIGN KEY (`licitacao_id`) REFERENCES `licitacoes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 7. TABELA: convites
CREATE TABLE IF NOT EXISTS `convites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `token` varchar(100) NOT NULL,
  `usuario_acesso` varchar(100) NOT NULL,
  `senha_acesso` varchar(255) NOT NULL,
  `perfil_acesso` enum('admin','gestor','fornecedor','visualizacao') DEFAULT 'visualizacao',
  `validade_dias` int DEFAULT '7',
  `usado` tinyint(1) DEFAULT '0',
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP,
  `expira_em` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  CONSTRAINT `convites_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 8. TABELA: licitacao_logs
CREATE TABLE IF NOT EXISTS `licitacao_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `licitacao_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `acao` varchar(50) NOT NULL,
  `detalhes` text,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `licitacao_logs_ibfk_1` FOREIGN KEY (`licitacao_id`) REFERENCES `licitacoes` (`id`),
  CONSTRAINT `licitacao_logs_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;