import { Module } from '@nestjs/common';

// Mongoose Modules
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { FeatureToggleController } from './feature-toggle.controller';

// Services
import { FeatureToggleService } from './feature-toggle.service';

// Schemas
import { FeatureToggle, FeatureToggleSchema } from './feature-toggle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeatureToggle.name, schema: FeatureToggleSchema },
    ]),
  ],
  providers: [FeatureToggleService],
  controllers: [FeatureToggleController],
})
export class FeatureToggleModule {}
