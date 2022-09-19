import { Controller, Get, Response, Post, HttpStatus, Request } from '@nestjs/common';
import { AppsDBService } from './Apps/AppsDB.service';
import { PupeteerService } from './Puppeteer/puppeeter.service';

@Controller()
export class AppController {

    constructor(
        private readonly pupeteerService: PupeteerService,
        private readonly AppsDBService: AppsDBService,
    ) { }

    @Get('deldocdb')
    async DeleteDocumentFromDB(@Request() request, @Response() response) {
        console.log('Маршрут удаления документа');
        await this.AppsDBService.deleteDoc('6322d397df6a75efce5aa1f3');
    }

    @Get('createdocdb')
    async CreateDocumentInDB(@Request() request, @Response() response) {
        await this.AppsDBService.create({
            app_id: '680230049751992', account_ids: [
               "2821066808039569",
               "270746282",
               "324220941",
               "146020782415389"
            ]
        })
    }

    @Get('testingdb')
    async GetDBInfo(@Request() request, @Response() response) {
        const doc = await this.AppsDBService.getAll()
        return await response.status(HttpStatus.CREATED).json(doc);
    }


    @Post('updatedb')
    async updateDB(@Request() request, @Response() response) {
        await this.pupeteerService.insertNew(request.body);
        const dataForSend = this.pupeteerService.convertStringToArr(request.body.dataForSend)
        return await this.AppsDBService.update({
            app_id: request.body.appID,
            account_ids: dataForSend
        })
    }

    @Post('deletedb')
    async DeleteDB(@Request() request, @Response() response) {
        const dataForDelete = this.pupeteerService.convertStringToArr(request.body.dataForDelete)
        console.log(dataForDelete);
        this.pupeteerService.deleteInfo(request.body)
        return await this.AppsDBService.delete({
            app_id: request.body.appID,
            account_ids: dataForDelete
        })
    }

    @Post('testroute')
    async deltest(@Request() request, @Response() response){
        await this.pupeteerService.deleteInfo(request.body);
    }

}
