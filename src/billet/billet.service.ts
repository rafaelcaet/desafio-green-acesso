import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { PDFDocument } from "pdf-lib";
import { writeFile } from "fs/promises";
import * as path from "path";
import * as os from "os";

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

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    let yOffset = 750; // inicio do arquivo

    page.drawText("Relatório de boletos", { x: 50, y: yOffset, size: 18 });
    yOffset -= 30; // espaco depois do titulo

    for (const boleto of billets) {
      page.drawText(`Nome: ${boleto.withdrawName}`, {
        x: 50,
        y: yOffset,
        size: 12,
      });
      yOffset -= 20;
      page.drawText(`Unidade: ${boleto.lotId}`, {
        x: 50,
        y: yOffset,
        size: 12,
      });
      yOffset -= 20;
      page.drawText(`Valor: R$ ${boleto.value.toFixed(2)}`, {
        x: 50,
        y: yOffset,
        size: 12,
      });
      yOffset -= 20;
      page.drawText(`Linha Digitável: ${boleto.writeLine}`, {
        x: 50,
        y: yOffset,
        size: 12,
      });
      yOffset -= 40;
    }

    const desktopPath = path.join(os.homedir(), "Desktop");
    const filePath = path.join(desktopPath, "report_billets.pdf");

    // salvar o PDF no desktop
    const pdfBytes = await pdfDoc.save();
    await writeFile(filePath, pdfBytes);

    return { message: "All files were generated successfully", filePath };
  }
}
