import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReaderModule } from "./reader/reader.module";
import { LotsModule } from "./lots/lots.module";

@Module({
  imports: [DatabaseModule, ReaderModule, LotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
