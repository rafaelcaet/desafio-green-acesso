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
  // Rota publica para upload do csv
  @Post("upload-csv")
  @UseInterceptors(FileInterceptor("file")) // intercepta a request pegando o `file`
  // tipagem do file com o Multer
  async uploadCSV(@UploadedFile() file: Express.Multer.File) {
    return this.readerService.parserCSVFile(file);
  }

  // Rota publica para upload do pdf
  @Post("upload-pdf")
  @UseInterceptors(FileInterceptor("file")) // intercepta a request pegando o `file`
  // tipagem do file com o Multer
  async uploadPDF(@UploadedFile() file: Express.Multer.File) {
    return this.readerService.parserPDFFile(file);
  }
}
