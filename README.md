# Desafio Green Acesso

Este projeto é uma API construída com **NestJS** e **Prisma** para processar arquivos CSV e PDF com dados de boletos.

---

## Requisitos

- Docker + Docker Compose
- Node.js 18+
- Yarn ou NPM

---

## Inicialização

Para iniciar o banco de dados localmente:

```bash
docker-compose up -d
```

- Necessário bater no endpoint `POST lots/seed` para gerar os lotes no banco (*Seed para criação de lotes*)

---

## Arquivos de Teste

O projeto contém dois arquivos úteis para testes: `test.csv` e `test-pdf.pdf`:

- test.csv: arquivo CSV com colunas como nome, unidade, valor, linha_digitavel.

- test-pdf.pdf: arquivo PDF.

---

## Estrutura do Projeto

- ReaderService: responsável por processar os arquivos CSV e PDF.

- BilletService: realiza consultas no banco e gera relatórios.

- billets: tabela dos boletos.

- lots: tabela de lotes.

---

## Endpoints

`POST reader/upload-csv`

Envia um arquivo .csv contendo boletos para serem armazenados no banco.

### Request

- Formato: multipart/form-data

- Campo: file com o CSV

### Response

```json
    {
        "inserted": 10
    }
```

---

`POST reader/upload-pdf`

Envia um arquivo .pdf

### Request

- Formato: multipart/form-data

- Campo: file com o PDF

### Response

```json
    {
    "message": "All files were generated successfully"
    }
```

---

`GET /boletos?relatorio=1`

Gera e retorna um relatório em PDF como Base64.

### Response:

```json
    {
        "message": "PDF was generated!",
        "base64": "JVBERi0xLjcKJc..."
    }
```

*Se relatorio não for igual a 1, nada será retornado*.

---
