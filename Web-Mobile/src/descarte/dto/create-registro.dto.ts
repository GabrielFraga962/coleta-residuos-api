import { IsString, IsMongoId } from 'class-validator';

export class CreateRegistroDto {
  @IsString()
  nomeUsuario: string;

  @IsMongoId()
  pontoDescarteId: string;

  @IsString()
  tipoResiduo: string;
}