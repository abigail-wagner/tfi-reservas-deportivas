import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class AgregarImagenDto {
  @ApiProperty({
    example:
      'https://reservas.tail92fdf5.ts.net/archivos/imagenes/2026/11/abc123.jpg',
    description:
      'La URL que devolvió `POST /archivos` para una imagen. No se aceptan URLs de otros sitios.',
  })
  @Matches(/^https?:\/\/\S+$/i, {
    message: 'La foto tiene que ser la URL que devolvió POST /archivos.',
  })
  @MaxLength(1000, { message: 'La URL de la foto es demasiado larga.' })
  @IsNotEmpty({ message: 'Falta la URL de la foto.' })
  @IsString({ message: 'Falta la URL de la foto.' })
  url: string;
}
