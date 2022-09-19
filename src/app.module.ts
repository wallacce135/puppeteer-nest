import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { PupeteerService } from './Puppeteer/puppeeter.service'
import { AppsDBModule } from './Apps/AppsDB.module';
import { AppsDBService } from './Apps/AppsDB.service';


@Module({
  // controllers: [],
  providers: [
    ConfigService,
    PupeteerService,
    AppsDBService,
  ],
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    
    ConfigModule.forRoot({ isGlobal: true }),
    AppsDBModule
  ],
  controllers: [AppController]
})

export class AppModule { }
