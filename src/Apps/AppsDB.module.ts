import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppsDB, AppsSchema } from './AppsDB.schema';
import { AppsDBService } from './AppsDB.service';

@Module({
    controllers: [],
    providers: [AppsDBService],
    imports: [
        MongooseModule.forFeature([{ name: AppsDB.name, schema: AppsSchema }])
    ],
    exports: [
        MongooseModule.forFeature([{ name: AppsDB.name, schema: AppsSchema }]),
        AppsDBService
    ]
})

export class AppsDBModule { }