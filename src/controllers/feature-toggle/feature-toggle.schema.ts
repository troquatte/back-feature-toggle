import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeatureToggleDocument = FeatureToggle & Document;

@Schema()
export class FeatureToggle {
  @Prop({ required: true })
  projectName: string;

  @Prop()
  apiKey: string;

  @Prop({ required: true })
  itensEnvironment: [string, [[string, boolean]]];
}

export const FeatureToggleSchema = SchemaFactory.createForClass(FeatureToggle);
