import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import lotsSeed from "src/utils/lotsSeed";

@Injectable()
export class LotsService {
  constructor(private prisma: PrismaService) {}
  async seed() {
    const lots = lotsSeed();
    await this.prisma.lots.createMany({ data: lots });
    return;
  }

  create(createLot) {
    return "This action adds a new lot";
  }

  findAll() {
    return `This action returns all lots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lot`;
  }

  remove(id: number) {
    return `This action removes a #${id} lot`;
  }
}
