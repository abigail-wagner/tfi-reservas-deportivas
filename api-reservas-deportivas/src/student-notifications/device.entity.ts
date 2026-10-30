import { Entity, Index, PrimaryColumn } from 'typeorm';
import { ColumnaEnum, ColumnaRef } from '../common/db/columns.js';
import type { Plataforma } from '../common/notifications/ports.js';

@Entity('dispositivos')
export class DispositivoEntidad {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  tokenExpo: string;

  @Index()
  @ColumnaRef()
  usuarioId: string;

  @ColumnaEnum()
  plataforma: Plataforma;
}
