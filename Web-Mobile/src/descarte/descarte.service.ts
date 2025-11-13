import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PontoDescarte, PontoDescarteDocument } from './descarte.model';
import { RegistroDescarte, RegistroDescarteDocument } from './descarte.model';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { QueryRegistroDto } from './dto/query-registro.dto';

@Injectable()
export class DescarteService {
  constructor(
    @InjectModel(PontoDescarte.name)
    private pontoModel: Model<PontoDescarteDocument>,
    @InjectModel(RegistroDescarte.name)
    private registroModel: Model<RegistroDescarteDocument>,
  ) {}

  async createPonto(dto: CreatePontoDto): Promise<PontoDescarte> {
    const ponto = new this.pontoModel(dto);
    return ponto.save();
  }

  async createRegistro(dto: CreateRegistroDto): Promise<RegistroDescarte> {
    const ponto = await this.pontoModel.findById(dto.pontoDescarteId);
    if (!ponto) {
      throw new NotFoundException('Ponto de descarte não encontrado');
    }

    const registro = new this.registroModel(dto);
    return registro.save();
  }

  async findRegistros(query: QueryRegistroDto): Promise<RegistroDescarte[]> {
    const filtros: any = {};

    if (query.pontoDescarteId) filtros.pontoDescarteId = query.pontoDescarteId;
    if (query.tipoResiduo) filtros.tipoResiduo = query.tipoResiduo;
    if (query.nomeUsuario) filtros.nomeUsuario = query.nomeUsuario;
    if (query.data) {
      const dataInicio = new Date(query.data);
      dataInicio.setHours(0, 0, 0, 0);
      const dataFim = new Date(query.data);
      dataFim.setHours(23, 59, 59, 999);
      filtros.data = { $gte: dataInicio, $lte: dataFim };
    }

    return this.registroModel.find(filtros).populate('pontoDescarteId').exec();
  }

  async getRelatorio(): Promise<any> {
    const topLocal = await this.registroModel.aggregate([
      { $group: { _id: '$pontoDescarteId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'pontodescartes',
          localField: '_id',
          foreignField: '_id',
          as: 'pontoInfo',
        },
      },
      { $unwind: '$pontoInfo' },
    ]);

    const topResiduo = await this.registroModel.aggregate([
      { $group: { _id: '$tipoResiduo', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const totalUsuarios = (await this.registroModel.distinct('nomeUsuario'))
      .length;

    const totalPontos = await this.pontoModel.countDocuments();

    return {
      topLocalDescarte: topLocal[0] ? topLocal[0].pontoInfo.nomeLocal : 'N/A',
      topResiduoDescartado: topResiduo[0] ? topResiduo[0]._id : 'N/A',
      mediaDescartesDiaria30d: 'Implementar lógica de média',
      totalUsuarios: totalUsuarios,
      totalPontosDescarte: totalPontos,
      crescimentoPercentual: 'Implementar lógica de comparação mensal',
    };
  }
}
