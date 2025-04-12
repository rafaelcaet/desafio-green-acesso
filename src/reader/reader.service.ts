import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { parse } from "csv-parse/sync";
import { PDFDocument } from "pdf-lib";
import { writeFile } from "fs/promises";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";
import * as os from "os";

@Injectable()
export class ReaderService {
  constructor(private prisma: PrismaService) {}

  // Parser para o arquivo CSV
  async parserCSVFile(file: Express.Multer.File) {
    try {
      const csvContent = file.buffer.toString("utf-8");
      // Coleta as informações do CSV (parser)
      const results = parse(csvContent, {
        delimiter: ";",
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      // Formata as informações, buscando no banco de `lots` pelo nome do lote contido no boleto
      const formattedData = await Promise.all(
        results.map(async (line: any) => {
          const lot = await this.prisma.lots.findFirst({
            select: { id: true },
            where: {
              name: {
                contains: line.unidade,
              },
              enable: true,
            },
          });

          if (!lot) {
            throw new Error(`Lote não encontrado para unidade ${line.unidade}`);
          }

          // Retorna o objeto formatado para inserção no banco
          return {
            withdrawName: line.nome,
            lotId: lot.id,
            value: parseFloat(line.valor),
            writeLine: line.linha_digitavel,
            enable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        })
      );

      // Inserção em batch no banco
      const created = await this.prisma.billets.createMany({
        data: formattedData,
        skipDuplicates: true,
      });

      // Retorna a quantidade de objetos inseridos
      return { inserted: created.count };
    } catch (err) {
      throw err;
    }
  }

  // Função para processar o PDF
  async parserPDFFile(file: Express.Multer.File) {
    const pdfFile = await PDFDocument.load(file.buffer);
    const totalPages = pdfFile.getPageCount();

    // fetch dos boletos (nome e id)
    const billets = await this.prisma.billets.findMany({
      orderBy: { id: "asc" }, // garante que a ordem esteja conforme desejado
      select: { id: true, withdrawName: true },
    });

    // path para criar a pasta local
    const desktopPath =
      os.platform() === "win32"
        ? join(os.homedir(), "Desktop", "billets")
        : join(os.homedir(), "Desktop", "billets");

    // garante que a pasta existe (cria se nao existir)
    if (!existsSync(desktopPath)) {
      mkdirSync(desktopPath, { recursive: true });
    }

    // le o pdf e cria os arquivos com o respectivo id na tabela `Billets`
    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfFile, [i]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      const filePath = join(desktopPath, `${billets[i].id}.pdf`);
      await writeFile(filePath, pdfBytes);
    }

    return { message: "All files were generated successfully" };
  }
}
