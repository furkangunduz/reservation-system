import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@app/common/config/config.module';
import { Module } from '@nestjs/common';
import { ReservationSchmea as ReservationSchema } from './model/reservation.schema';
import { ReservationRepository } from './reservation.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    DatabaseModule.forFeature([
      { name: ReservationRepository.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
