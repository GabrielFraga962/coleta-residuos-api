import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class Geolocalizacao {
  @Prop()
  lat: number;

  @Prop()
  lon: number;
}
export const GeolocalizacaoSchema =
  SchemaFactory.createForClass(Geolocalizacao);

export type PontoDescarteDocument = PontoDescarte & Document;

@Schema()
export class PontoDescarte {
  @Prop({ required: true })
  nomeLocal: string;

  @Prop({ required: true })
  bairro: string;

  @Prop({ required: true, enum: ['publico', 'privado'] })
  tipoLocal: string;

  @Prop([String])
  categoriaResiduos: string[];

  @Prop({ type: GeolocalizacaoSchema })
  geolocalizacao: Geolocalizacao;
}
export const PontoDescarteSchema = SchemaFactory.createForClass(PontoDescarte);

export type RegistroDescarteDocument = RegistroDescarte & Document;

@Schema()
export class RegistroDescarte {
  @Prop({ required: true })
  nomeUsuario: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'PontoDescarte',
    required: true,
  })
  pontoDescarteId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  tipoResiduo: string;

  @Prop({ default: Date.now })
  data: Date;
}
export const RegistroDescarteSchema =
  SchemaFactory.createForClass(RegistroDescarte);
