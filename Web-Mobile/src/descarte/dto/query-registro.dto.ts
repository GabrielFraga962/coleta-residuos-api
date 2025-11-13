import { IsString, IsDateString, IsMongoId, IsOptional } from 'class-validator';

export class QueryRegistroDto {
  @IsOptional()
  @IsMongoId()
  pontoDescarteId?: string;

  @IsOptional()
  @IsString()
  tipoResiduo?: string;

  @IsOptional()
  @IsDateString()
  data?: string;

  @IsOptional()
  @IsString()
  nomeUsuario?: string;
}
