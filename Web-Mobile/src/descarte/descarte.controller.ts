import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { DescarteService } from './descarte.service';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { QueryRegistroDto } from './dto/query-registro.dto';

@Controller('descarte')
export class DescarteController {
  constructor(private readonly descarteService: DescarteService) {}

  @Post('pontos')
  createPonto(@Body(new ValidationPipe()) dto: CreatePontoDto) {
    return this.descarteService.createPonto(dto);
  }

  @Post('registros')
  createRegistro(@Body(new ValidationPipe()) dto: CreateRegistroDto) {
    return this.descarteService.createRegistro(dto);
  }

  @Get('registros')
  findRegistros(@Query(new ValidationPipe()) query: QueryRegistroDto) {
    return this.descarteService.findRegistros(query);
  }

  @Get('relatorio')
  getRelatorio() {
    return this.descarteService.getRelatorio();
  }
}
