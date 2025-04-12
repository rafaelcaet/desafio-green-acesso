import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LotsService } from "./lots.service";

@Controller("lots")
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Post()
  create(@Body() createLotDto) {
    return this.lotsService.create(createLotDto);
  }

  @Get()
  findAll() {
    return this.lotsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.lotsService.findOne(+id);
  }

  @Post("seed")
  async seed() {
    return this.lotsService.seed();
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.lotsService.remove(+id);
  }
}
