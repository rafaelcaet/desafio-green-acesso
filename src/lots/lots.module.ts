import { Module } from "@nestjs/common";
import { LotsService } from "./lots.service";
import { LotsController } from "./lots.controller";
import { PrismaService } from "src/database/prisma/prisma.service";

@Module({
  controllers: [LotsController],
  providers: [LotsService, PrismaService],
})
export class LotsModule {}
