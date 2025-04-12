import { Controller, Get, Query } from "@nestjs/common";
import { BilletService } from "./billet.service";

@Controller("billet")
export class BilletController {
  constructor(private readonly billetService: BilletService) {}

  // Rota publica para retornar todos os boletos em PDF
  @Get()
  async findAll(@Query("relatorio") report: string) {
    return this.billetService.findAll({ report: parseInt(report, 10) }); // parse para number
  }
}
