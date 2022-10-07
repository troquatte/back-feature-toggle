import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';

// Services
import { FeatureToggleService } from './feature-toggle.service';
import { IFeatureToggleConsumer } from './interface/feature-toggle-consumer.interface';

// Interfaces
import { IFeatureToggle } from './interface/feature-toggle.interface';

@Controller('feature-toggle')
export class FeatureToggleController {
  constructor(private readonly featureToggleService: FeatureToggleService) {}

  @Get()
  public async findAll(): Promise<Array<IFeatureToggle>> {
    return this.featureToggleService.findAll();
  }

  @Post('/consumer/:_id')
  public async consumer(
    @Param('_id') _id: string,
    @Body() featureToggleConsumer: IFeatureToggleConsumer,
  ): Promise<any> {
    return this.featureToggleService.consumer(featureToggleConsumer, _id);
  }

  @Post()
  public async create(
    @Body() featureToggle: IFeatureToggle,
  ): Promise<IFeatureToggle> {
    return this.featureToggleService.create(featureToggle);
  }

  @Get('/:id')
  public async read(@Param('id') id: string): Promise<IFeatureToggle> {
    return this.featureToggleService.read(id);
  }

  @Put()
  public async update(
    @Body() featureToggle: IFeatureToggle,
  ): Promise<IFeatureToggle> {
    return this.featureToggleService.update(featureToggle);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: number): Promise<IFeatureToggle> {
    return this.featureToggleService.delete(id);
  }
}
