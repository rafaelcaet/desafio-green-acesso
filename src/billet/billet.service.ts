import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PDFDocument } from "pdf-lib";
import { Buffer } from "buffer";

@Injectable()
export class BilletService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ report }: { report: number }) {
    let billets;
    if (report === 1) {
      billets = await this.prisma.billets.findMany({
        where: {
          enable: true,
        },
      });
    } else {
      return;
    }

    // cria o pdf
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    let yOffset = 750; // inicio do arquivo

    // adicionar título
    page.drawText("Relatório de Boletos", { x: 50, y: yOffset, size: 18 });
    yOffset -= 30; // Espaco depois do titulo

    // cabecalho
    page.drawText("Nome", { x: 50, y: yOffset, size: 12 });
    page.drawText("Unidade", { x: 150, y: yOffset, size: 12 });
    page.drawText("Valor", { x: 250, y: yOffset, size: 12 });
    page.drawText("Linha Digitável", { x: 350, y: yOffset, size: 12 });
    yOffset -= 20;

    for (const billet of billets) {
      page.drawText(`${billet.withdrawName}`, { x: 50, y: yOffset, size: 12 });
      page.drawText(`${billet.lotId}`, { x: 150, y: yOffset, size: 12 });
      page.drawText(`R$ ${billet.value.toFixed(2)}`, {
        x: 250,
        y: yOffset,
        size: 12,
      });
      page.drawText(`${billet.writeLine}`, { x: 350, y: yOffset, size: 12 });
      yOffset -= 20;
    }

    const pdfBytes = await pdfDoc.save();

    // transforma em base64
    const base64 = Buffer.from(pdfBytes).toString("base64");

    return {
      message: "PDF gerado com sucesso",
      base64: base64,
    };
  }
}
