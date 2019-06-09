import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TerminusModule,
  MongooseHealthIndicator,
  TerminusModuleOptions,
} from '@nestjs/terminus';

const getTerminusOptions = (
  mongoose: MongooseHealthIndicator,
): TerminusModuleOptions => ({
  endpoints: [
    {
      url: '/health',
      healthIndicators: [async () => await mongoose.pingCheck('mongo')],
    },
  ],
});

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    TerminusModule.forRootAsync({
      inject: [MongooseHealthIndicator],
      useFactory: getTerminusOptions,
    }),
  ],
})
export class HealthModule {}
