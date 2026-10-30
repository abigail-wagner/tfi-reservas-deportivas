// PARTE 1 DE 2 PARA PROGRAMAR — dónde viven los tokens de Expo de cada usuario.
// Leé docs/NOTIFICATIONS.md. Cuando funcione, `pnpm test:notificaciones` tiene que pasar.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DispositivoEntidad } from './device.entity.js';
import {
  AlmacenTokensPush,
  type Plataforma,
} from '../common/notifications/ports.js';

@Injectable()
export class AlmacenTokensPorHacer extends AlmacenTokensPush {
  constructor(
    @InjectRepository(DispositivoEntidad)
    private readonly repo: Repository<DispositivoEntidad>,
  ) {
    super();
  }

  // Anotar el token de este usuario en la base. Si ese token ya estaba
  // anotado (a nombre de este usuario o de otro), tiene que quedar una sola fila, a nombre
  // de `usuarioId` y con la `plataforma` nueva. Idempotente con upsert ante pedidos simultáneos.
  async guardar(
    usuarioId: string,
    tokenExpo: string,
    plataforma: Plataforma,
  ): Promise<void> {
    await this.repo.upsert(
      {
        tokenExpo,
        usuarioId,
        plataforma,
      },
      ['tokenExpo'],
    );
  }

  // Sacar ese token de la base. Si no estaba, no es un error.
  async borrar(tokenExpo: string): Promise<void> {
    await this.repo.delete({ tokenExpo });
  }

  // Devolver todos los tokens de esos usuarios (cada usuario puede tener
  // varios teléfonos). Si la lista de usuarios viene vacía, devolvé una lista vacía.
  async tokensDe(usuarioIds: string[]): Promise<string[]> {
    if (!usuarioIds || usuarioIds.length === 0) {
      return [];
    }
    const dispositivos = await this.repo.find({
      where: { usuarioId: In(usuarioIds) },
    });
    return dispositivos.map((d) => d.tokenExpo);
  }

  // Borrar de la base los tokens que Expo dijo que ya no sirven.
  async descartar(tokens: string[]): Promise<void> {
    if (!tokens || tokens.length === 0) {
      return;
    }
    await this.repo.delete({ tokenExpo: In(tokens) });
  }
}
