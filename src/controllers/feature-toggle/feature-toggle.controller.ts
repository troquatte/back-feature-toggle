import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';

// Services
import { FeatureToggleService } from './feature-toggle.service';

// Interfaces
import {
  IFeatureToggle,
  IFeatureToggleChange,
} from './interface/feature-toggle.interface';

// Swagger
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { SwaggerFeatureToggleConsumer } from './Swagger/feature-toggle-change-consumer.swagger';

@ApiBearerAuth()
@ApiTags('feature-toggle')
@Controller('feature-toggle')
export class FeatureToggleController {
  constructor(private readonly featureToggleService: FeatureToggleService) {}

  @Get()
  @ApiOperation({ summary: 'Find all Feature Toggle' })
  @ApiExcludeEndpoint()
  public async findAll(): Promise<Array<IFeatureToggle>> {
    return this.featureToggleService.findAll();
  }

  @Get('/consumer/:apiKey/:env')
  @ApiOperation({ summary: 'Consumer Feature Toggle' })
  public async consumer(
    @Param('apiKey') apiKey: string,
    @Param('env') env: string,
  ): Promise<any> {
    return this.featureToggleService.consumer(apiKey, env);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Feature Toggle' })
  @ApiExcludeEndpoint()
  public async read(@Param('id') id: string): Promise<IFeatureToggle> {
    return this.featureToggleService.read(id);
  }

  @Put()
  @ApiOperation({ summary: 'Put ( update ) Feature Toggle' })
  @ApiExcludeEndpoint()
  public async update(
    @Body() featureToggle: IFeatureToggle,
  ): Promise<IFeatureToggle> {
    return this.featureToggleService.update(featureToggle);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Feature Toggle' })
  @ApiExcludeEndpoint()
  public async delete(@Param('id') id: number): Promise<IFeatureToggle> {
    return this.featureToggleService.delete(id);
  }

  @Post('/consumer/change/')
  @ApiOperation({ summary: 'Consumer Change Feature Toggle' })
  @ApiBody({
    description: 'Consumer Change Feature Toggle',
    type: SwaggerFeatureToggleConsumer,
  })
  public async consumerChange(
    @Body() featureToggleChange: IFeatureToggleChange,
  ): Promise<any> {
    return this.featureToggleService.consumerChange(featureToggleChange);
  }

  @Post()
  @ApiOperation({ summary: 'Create Feature Toggle' })
  @ApiExcludeEndpoint()
  public async create(
    @Body() featureToggle: IFeatureToggle,
  ): Promise<IFeatureToggle> {
    return this.featureToggleService.create(featureToggle);
  }
}
