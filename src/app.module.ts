import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://hero:vaWhhydbNT5vcVMQ@herocleancode.izyoigy.mongodb.net/?retryWrites=true&w=majority',
      database: 'heroes',
      username: 'hero',
      password: 'vaWhhydbNT5vcVMQ',
      synchronize: false,
      dropSchema: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    HeroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
