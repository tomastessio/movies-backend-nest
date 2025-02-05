import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SwapiSyncService {
  constructor(private readonly httpService: HttpService) {}

  async syncMoviesSwapi() {
    const url = 'https://swapi.dev/api/films';

    try {
      const response = await firstValueFrom(this.httpService.get(url));

      if (response && response.data && response.data.results) {
        const movies = response.data.results.map((movie) => ({
          title: movie.title,
          director: movie.director,
          releaseDate: movie.release_date,
        }));

        return movies;
      } else {
        throw new Error('Datos inesperados recibidos de SWAPI');
      }
    } catch (error) {
      console.error('Error en la consulta a SWAPI:', error);
      throw new Error('Error fetching data from SWAPI');
    }
  }
}
