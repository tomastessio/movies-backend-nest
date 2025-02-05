import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SwapiSyncService } from './sapi-sync.service';
import { SwapiSyncController } from './swapi-sync.controller';

@Module({
  imports: [HttpModule],
  providers: [SwapiSyncService],
  exports: [SwapiSyncService],
  controllers: [SwapiSyncController],
})
export class SwapiSyncModule {}
