import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// my imports
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>
    ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.moviesRepository.create(createMovieDto);
    return await this.moviesRepository.save(movie);
  }

  async findAll() {
    return await this.moviesRepository.find();
  }

  async findOne(id: number) {
    return await this.moviesRepository.findOneBy({id});
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return await this.moviesRepository.update(id, updateMovieDto);
  }

  async remove(id: number) {
    return await this.moviesRepository.delete(id);
  }
  
}
