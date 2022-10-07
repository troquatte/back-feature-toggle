import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Plugins
import { v4 as uuid } from 'uuid';

// Schemas
import { FeatureToggle, FeatureToggleDocument } from './feature-toggle.schema';
import { IFeatureToggleConsumer } from './interface/feature-toggle-consumer.interface';

// Interfaces
import { IFeatureToggle } from './interface/feature-toggle.interface';

@Injectable()
export class FeatureToggleService {
  constructor(
    @InjectModel(FeatureToggle.name)
    private featureToggleModel: Model<FeatureToggleDocument>,
  ) {}

  public async findAll(): Promise<Array<FeatureToggle>> {
    const find = await this.featureToggleModel.find();
    return find;
  }

  public async create(
    featureToggleDto: IFeatureToggle,
  ): Promise<FeatureToggle> {
    featureToggleDto.apiKey = await uuid();

    const create = await this.featureToggleModel.create(featureToggleDto);
    return create;
  }

  public async read(id: string): Promise<IFeatureToggle> {
    const find = await this.featureToggleModel.findById(id);

    if (!find) {
      throw new NotFoundException('Not found Feature Toggle');
    }

    return find;
  }

  public async update(
    featureToggleDto: IFeatureToggle,
  ): Promise<IFeatureToggle> {
    const find = await this.featureToggleModel.findById(featureToggleDto._id);

    if (!find) {
      throw new NotFoundException('Not found Feature Toggle');
    }

    await find.update(featureToggleDto);

    return await this.featureToggleModel.findById(featureToggleDto._id);
  }

  public async delete(id: number): Promise<IFeatureToggle> {
    const find = await this.featureToggleModel.findById(id);

    if (!find) {
      throw new NotFoundException('Not found Feature Toggle');
    }

    return await find.delete();
  }

  public async consumer(
    featureToggleConsumer: IFeatureToggleConsumer,
    _id: string,
  ): Promise<any> {
    if (!featureToggleConsumer.apiKey || !_id) {
      throw new NotFoundException('Not found Feature Toggle');
    }

    const find: IFeatureToggle = await this.featureToggleModel.findOne({
      _id,
      apiKey: featureToggleConsumer.apiKey,
    });

    const consumer: any = find.itensEnvironment.find((res) => {
      return res[0] === featureToggleConsumer.env;
    });

    if (!consumer) {
      throw new NotFoundException('Not found Feature Toggle');
    }

    const toggles = consumer[1].reduce(function (prev, curr) {
      prev[curr[0]] = curr[1];
      return prev;
    }, {});

    return {
      env: consumer[0],
      toggles,
    };
  }
}
