import { Module } from '@nestjs/common';
import { TrackerGateway } from './tracker/tracker.gateway';
import { TrackerController } from './tracker/tracker.controller';

@Module({
  imports: [],
  controllers: [TrackerController],
  providers: [TrackerGateway],
})
export class AppModule {}
