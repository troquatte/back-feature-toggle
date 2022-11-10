import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common/decorators';
import { Request } from 'express';

// Services
import { FeatureToggleService } from './feature-toggle.service';

// Interfaces
import {
  IFeatureToggle,
  IFeatureToggleChange,
} from './interface/feature-toggle.interface';
import { IFeatureToggleConsumer } from './interface/feature-toggle-consumer.interface';

@Controller('feature-toggle')
export class FeatureToggleController {
  constructor(private readonly featureToggleService: FeatureToggleService) {}

  @Get()
  public async findAll(): Promise<Array<IFeatureToggle>> {
    return this.featureToggleService.findAll();
  }

  @Get('/consumer/:apiKey/:env')
  public async consumer(
    @Param('env') env: string,
    @Param('apiKey') apiKey: string,
  ): Promise<any> {
    return this.featureToggleService.consumer(apiKey, env);
  }

  @Post('/consumer/change/')
  public async consumerChange(
    @Body() featureToggleChange: IFeatureToggleChange,
  ): Promise<any> {
    return this.featureToggleService.consumerChange(featureToggleChange);
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
