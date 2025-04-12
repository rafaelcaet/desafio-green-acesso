import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { parse } from "csv-parse/sync";

@Injectable()
export class ReaderService {
  constructor(private prisma: PrismaService) {}

  // tipagem e upload do arquivo usando o express.multer
  async parserCSVFile(file: Express.Multer.File) {
    try {
      const csvContent = file.buffer.toString("utf-8");
      // coleta as informacoes do csv (parser)
      const results = parse(csvContent, {
        delimiter: ";",
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });
      // formata as informacoes, garantindo que busque no banco de `lots` pelo nome do lote contido no boleto
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
            throw new Error(`Lot not found ${line.unidade}`);
          }
          // retorna o obj formatado para insercao on banco
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
      // insercao em `batch` no banco
      const created = await this.prisma.billets.createMany({
        data: formattedData,
        skipDuplicates: true,
      });
      // retorna a qnt de objetos inseridos
      return { inserted: created.count };
    } catch (err) {
      throw err;
    }
  }
}
