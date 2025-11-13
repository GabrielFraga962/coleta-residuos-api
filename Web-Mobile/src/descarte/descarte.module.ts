import { Module } from '@nestjs/common';
import { DescarteController } from './descarte.controller';
import { DescarteService } from './descarte.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PontoDescarte,
  PontoDescarteSchema,
  RegistroDescarte,
  RegistroDescarteSchema,
} from './descarte.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PontoDescarte.name, schema: PontoDescarteSchema },
      { name: RegistroDescarte.name, schema: RegistroDescarteSchema },
    ]),
  ],
  controllers: [DescarteController],
  providers: [DescarteService],
})
export class DescarteModule {}
