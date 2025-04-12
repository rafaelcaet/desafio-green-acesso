import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { parse } from "csv-parse/sync";

@Injectable()
export class ReaderService {
  constructor(private prisma: PrismaService) {}

  async parserCSVFile(file: Express.Multer.File) {
    try {
      const csvContent = file.buffer.toString("utf-8");

      const results = parse(csvContent, {
        delimiter: ";",
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

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

      const created = await this.prisma.billets.createMany({
        data: formattedData,
        skipDuplicates: true,
      });

      return { inserted: created.count };
    } catch (err) {
      throw err;
    }
  }
}
