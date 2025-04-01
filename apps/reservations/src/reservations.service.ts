import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async create(createReservationDto: CreateReservationDto) {
    return await this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
    });
  }

  async findAll() {
    return await this.reservationRepository.find({});
  }

  async findOne(id: number) {
    return await this.reservationRepository.findOne({ _id: id });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepository.findOneAndUpdate(
      { _id: id },
      updateReservationDto,
    );
  }

  async remove(id: number) {
    return await this.reservationRepository.findOneAndDelete({ _id: id });
  }
}
