import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsEnum,
  ValidateNested,
  IsNumber,
} from 'class-validator';

class GeolocalizacaoDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;
}

export class CreatePontoDto {
  @IsString()
  nomeLocal: string;

  @IsString()
  bairro: string;

  @IsEnum(['publico', 'privado'])
  tipoLocal: string;

  @IsArray()
  @IsString({ each: true })
  categoriaResiduos: string[];

  @ValidateNested()
  @Type(() => GeolocalizacaoDto)
  geolocalizacao: GeolocalizacaoDto;
}
