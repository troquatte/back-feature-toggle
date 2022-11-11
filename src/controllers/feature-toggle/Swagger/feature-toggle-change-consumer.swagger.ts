import { ApiProperty } from '@nestjs/swagger';

export class SwaggerFeatureToggleConsumer {
  @ApiProperty({
    example: '2192dd59-4c0e-49c0-bbbe-7727ec8e070c',
  })
  apiKey: string;

  @ApiProperty({
    example: 'hml',
  })
  env: string;

  @ApiProperty({
    example: 'Feature',
  })
  toggleName: string;

  @ApiProperty({
    example: false,
  })
  toggleValue: boolean;
}
