import { Controller, Get, UseGuards } from '@nestjs/common';

// my imports
import { SwapiSyncService } from './sapi-sync.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role-decorator';
import { Role } from 'src/auth/enums/role-enums';

@Controller('swapi-sync')
export class SwapiSyncController {
  constructor(
    private readonly swapiSyncService: SwapiSyncService
    ) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async syncMovies() {
    try {
      const result = await this.swapiSyncService.syncMoviesSwapi();
      return result; // Devuelve el resultado de la sincronización
    } catch (error) {
      throw new Error('Error sincronizando películas desde SWAPI');
    }
  }
}
