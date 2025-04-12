import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { BilletsResolver } from './billets/billets.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [BilletsResolver],
})
export class AppModule {}
