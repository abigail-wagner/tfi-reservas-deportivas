import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { RespuestaLista, RespuestaUno } from '../../../contract/api.js';
import type { Deporte, Espacio } from '../../../contract/types.js';
import { Publico, Roles } from '../../common/auth/decorators.js';
import { respuestaUno } from '../../common/response/response.js';
import { PaginacionDto } from '../../common/response/pagination.js';
import { FiltrosEspaciosDto } from './dto/venue-filters.dto.js';
import { AgregarImagenDto } from './dto/venue-images.dto.js';
import { EspaciosServicio } from './venues.service.js';

const EJEMPLO_ESPACIO = {
  id: 'esp-02',
  nombre: 'Cancha 2 — Fútbol 5',
  deporteId: 'dep-futbol5',
  complejo: 'Polideportivo Municipal',
  superficie: 'Césped sintético',
  techado: false,
  iluminacion: true,
  capacidad: 10,
  precioPorHora: 8000,
  coordenadas: { latitud: -31.8644, longitud: -59.0272 },
  imagenes: ['http://192.168.0.10:3000/archivos/imagenes/2026/09/abc.jpg'],
  videoUrl: null,
  reglas: 'Usar calzado deportivo. Sin tacos de metal.',
  activo: true,
};

@ApiTags('Espacios')
@Controller()
export class EspaciosControlador {
  constructor(private readonly servicio: EspaciosServicio) {}

  @Get('deportes')
  @Publico()
  @ApiOperation({
    summary: 'Deportes',
    description:
      'Público. Todos los deportes.\n\nErrores: VALIDACION_FALLIDA (400).',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        datos: [
          {
            id: 'dep-futbol5',
            nombre: 'Fútbol 5',
            icono: 'football-outline',
            color: '#2E7D32',
          },
        ],
        meta: { total: 1, pagina: 1, porPagina: 20 },
      },
    },
  })
  deportes(@Query() p: PaginacionDto): Promise<RespuestaLista<Deporte>> {
    return this.servicio.listarDeportes(p);
  }

  @Get('espacios')
  @Publico()
  @ApiOperation({
    summary: 'Espacios deportivos',
    description:
      'Público. Sólo los espacios con `activo: true`, por id. Filtros: `deporteId`, ' +
      '`complejo` (sin distinguir mayúsculas ni tildes), `iluminacion` y `techado` ' +
      '(`true` o `false`).\n\nErrores: VALIDACION_FALLIDA (400).',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        datos: [EJEMPLO_ESPACIO],
        meta: { total: 1, pagina: 1, porPagina: 20 },
      },
    },
  })
  espacios(@Query() f: FiltrosEspaciosDto): Promise<RespuestaLista<Espacio>> {
    return this.servicio.listarEspacios(f);
  }

  @Get('espacios/:id')
  @Publico()
  @ApiOperation({
    summary: 'Detalle de un espacio',
    description:
      'Público. También devuelve los espacios inactivos (con `activo: false`).\n\n' +
      'Errores: ESPACIO_NO_ENCONTRADO (404).',
  })
  @ApiResponse({
    status: 200,
    schema: { example: { datos: EJEMPLO_ESPACIO, meta: null } },
  })
  detalle(@Param('id') id: string): Promise<RespuestaUno<Espacio>> {
    return this.servicio.detalle(id);
  }

  @Post('espacios/:id/imagenes')
  @HttpCode(201)
  @Roles('encargado', 'administrador')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Agregar una foto a un espacio',
    description:
      'Encargado o administrador. Primero subí la foto con `POST /archivos` y después mandá ' +
      'acá la `url` que devolvió. La foto nueva queda primera y `GET /espacios/:id` la ' +
      'devuelve junto con las demás. Repetir la misma URL no la duplica.\n\n' +
      'Errores: VALIDACION_FALLIDA (400), NO_AUTENTICADO (401), SIN_PERMISO (403), ' +
      'ESPACIO_NO_ENCONTRADO (404), ARCHIVO_NO_SUBIDO (422), ALMACEN_NO_DISPONIBLE (503).',
  })
  @ApiResponse({
    status: 201,
    schema: { example: { datos: EJEMPLO_ESPACIO, meta: null } },
  })
  async agregarImagen(
    @Param('id') id: string,
    @Body() dto: AgregarImagenDto,
  ): Promise<RespuestaUno<Espacio>> {
    return respuestaUno(await this.servicio.agregarImagen(id, dto.url));
  }
}
