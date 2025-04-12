import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ReaderService } from "./reader.service";

@Controller("reader")
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadCSV(@UploadedFile() file: Express.Multer.File) {
    return this.readerService.parserCSVFile(file);
  }
}
