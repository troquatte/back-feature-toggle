import { Module } from '@nestjs/common';
import { join } from 'path';

// Config Env
import { ConfigModule } from '@nestjs/config';

// Config DB
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { FeatureToggleModule } from './controllers/feature-toggle/feature-toggle.module';

@Module({
  imports: [
    FeatureToggleModule,
    ConfigModule.forRoot({
      envFilePath: join(
        __dirname,
        '..',
        'environments',
        `${process.env.NODE_ENV.trim()}.env`,
      ),
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_SERVER}:${process.env.DATABASE_PORT}/${process.env.DATABASE_ADRESS}`,
    ),
  ],
  controllers: [],
  providers: [FeatureToggleModule],
})
export class AppModule {}
