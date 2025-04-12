import { Module } from "@nestjs/common";
import { ReaderService } from "./reader.service";
import { ReaderController } from "./reader.controller";
import { PrismaService } from "src/database/prisma/prisma.service";

@Module({
  controllers: [ReaderController],
  providers: [ReaderService, PrismaService],
})
export class ReaderModule {}
