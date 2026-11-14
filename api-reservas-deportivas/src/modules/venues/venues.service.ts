import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { FindOptionsWhere, Repository } from 'typeorm';
import type { RespuestaLista, RespuestaUno } from '../../../contract/api.js';
import type { Deporte, Espacio } from '../../../contract/types.js';
import { ErrorApi } from '../../common/errors/error-api.js';
import { esIdDe } from '../../common/ids/ids.js';
import {
  desplazamiento,
  meta,
  type PaginacionDto,
} from '../../common/response/pagination.js';
import {
  respuestaLista,
  respuestaUno,
} from '../../common/response/response.js';
import { normalizarTexto } from '../../common/text/text.js';
import { ArchivosServicio } from '../../common/files/files.service.js';
import { claveDeImagenDeUrl } from '../../common/files/keys.js';
import { DeporteEntidad } from './sport.entity.js';
import { EspacioEntidad } from './venue.entity.js';
import type { FiltrosEspaciosDto } from './dto/venue-filters.dto.js';
import { aContrato, deporteAContrato } from './venues.mapper.js';

@Injectable()
export class EspaciosServicio {
  constructor(
    @InjectRepository(DeporteEntidad)
    private readonly deportes: Repository<DeporteEntidad>,
    @InjectRepository(EspacioEntidad)
    private readonly espacios: Repository<EspacioEntidad>,
    private readonly archivos: ArchivosServicio,
  ) {}

  async listarDeportes(p: PaginacionDto): Promise<RespuestaLista<Deporte>> {
    const [filas, total] = await this.deportes.findAndCount({
      order: { id: 'ASC' },
      ...desplazamiento(p),
    });
    return respuestaLista(filas.map(deporteAContrato), meta(total, p));
  }

  async listarEspacios(
    f: FiltrosEspaciosDto,
  ): Promise<RespuestaLista<Espacio>> {
    // TypeORM 1.x tira error con valores undefined: el where sólo lleva lo que vino.
    const where: FindOptionsWhere<EspacioEntidad> = { activo: true };
    if (f.deporteId !== undefined) where.deporteId = f.deporteId;
    if (f.complejo !== undefined)
      where.complejoBusqueda = normalizarTexto(f.complejo);
    if (f.iluminacion !== undefined) where.iluminacion = f.iluminacion;
    if (f.techado !== undefined) where.techado = f.techado;
    const [filas, total] = await this.espacios.findAndCount({
      where,
      order: { id: 'ASC' },
      ...desplazamiento(f),
    });
    return respuestaLista(filas.map(aContrato), meta(total, f));
  }

  async detalle(id: string): Promise<RespuestaUno<Espacio>> {
    const fila = esIdDe('esp', id)
      ? await this.espacios.findOneBy({ id })
      : null;
    if (!fila) throw new ErrorApi('ESPACIO_NO_ENCONTRADO');
    return respuestaUno(aContrato(fila));
  }

  /**
   * Asocia a un espacio una foto que ya se subió con `POST /archivos`.
   * La más nueva va primera, que es el orden en el que la muestra la app.
   */
  async agregarImagen(id: string, url: string): Promise<Espacio> {
    const fila = esIdDe('esp', id)
      ? await this.espacios.findOneBy({ id })
      : null;
    if (!fila) throw new ErrorApi('ESPACIO_NO_ENCONTRADO');

    const clave = claveDeImagenDeUrl(url);
    if (clave === null || !(await this.archivos.existe(clave)))
      throw new ErrorApi('ARCHIVO_NO_SUBIDO');

    const actuales = Array.isArray(fila.imagenes) ? fila.imagenes : [];
    const imagenes = [clave, ...actuales.filter((k) => k !== clave)];
    await this.espacios.update({ id }, { imagenes });
    fila.imagenes = imagenes;
    return aContrato(fila);
  }
}
