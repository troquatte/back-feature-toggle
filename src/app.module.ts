import { Module } from '@nestjs/common';

// Config DB
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { FeatureToggleModule } from './controllers/feature-toggle/feature-toggle.module';

@Module({
  imports: [
    FeatureToggleModule,
    MongooseModule.forRoot('mongodb://root:root@localhost:27017/admin'),
  ],
  controllers: [],
  providers: [FeatureToggleModule],
})
export class AppModule {}
