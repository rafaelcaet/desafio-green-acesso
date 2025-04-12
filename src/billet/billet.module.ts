import { Module } from "@nestjs/common";
import { BilletService } from "./billet.service";
import { BilletController } from "./billet.controller";
import { PrismaService } from "src/database/prisma/prisma.service";

@Module({
  controllers: [BilletController],
  providers: [BilletService, PrismaService],
})
export class BilletModule {}
