import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { IAddApplication, IInfo } from './types';
import { encode } from 'punycode';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

@Injectable()
export class PupeteerService {

    async insertNew(data: IInfo): Promise<void> {

        console.log("Начало работы");

        console.log(data);

        let info = data.dataForSend.replace(/ /g, '');
        let informationArr: Array<string> = info.split(',');

        let information: IAddApplication = {
            email: 'ratitmatarit@gmail.com',
            password: 'Bi$0=$et-',
            adAccountId: informationArr,
            appId: data.appID,
        }

        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--window-size=1920,1080"],
            headless: false,
            userDataDir: '/newprofile'

        });
        const page = await browser.newPage();
        await page.goto(`https://developers.facebook.com/apps/${information.appId}/settings/advanced`);
        await delay(5000);

        await page.screenshot({path: 'routing.png'});
        await page.focus('#email');
        await page.keyboard.type(information.email, {delay: 200});
        await delay(2000);
        await page.keyboard.press('Tab');
        await delay(2000);
        await page.keyboard.type(information.password, {delay: 200});
        await page.keyboard.press('Tab');
        await delay(2000);
        
        await page.keyboard.press('Tab', {delay: 500});
        await page.keyboard.press('Enter', {delay: 1000});
        
        await page.screenshot({path: 'screenshot.png'});

        try {
            await page.waitForSelector('.mmwt03ec')
            let elements = await page.$$('.mmwt03ec');
            let setted = [];
            for (let index = 0; index < elements.length; index++) {
                let value = await page.evaluate(el => el.textContent, elements[index]);
                setted.push(value);
            }
            let forInsert = [];

            if (setted.length) {
                let newArr = [];
                setted.forEach(el => {
                    const elem = encode(el).split('-');
                    newArr.push(elem[0]);
                })

                forInsert = information.adAccountId.filter(el => {
                    return !newArr.includes(el);
                })

            }
            else {
                forInsert = information.adAccountId;
            }

            if(forInsert.length === 0){
                return;
            }
            else{
                await page.screenshot({path: 'screen.png'});
                
                const element = await page.$$('input');
                await element[27].click();
    
    
                for (let index = 0; index < forInsert.length; index++) {
                    await page.keyboard.sendCharacter(forInsert[index]);
                    await page.keyboard.press('Tab');
                    await element[27].click();
                }
    
                await page.keyboard.press('Enter');

            }

            await console.log("Добавление закончено");

        }
        catch (err) {

            let forInsert = information.adAccountId;
            const element = await page.$$('input');
            await element[27].click();


            for (let index = 0; index < forInsert.length; index++) {
                await page.keyboard.sendCharacter(forInsert[index]);
                await page.keyboard.press('Tab');
                await element[27].click();
            }
            await page.keyboard.press('Enter');
            await console.log("Добавление закончено");
        }
        delay(10000);
        browser.close();
    }






    async deleteInfo(data: IInfo){
        let info = data.dataForDelete.replace(/ /g, '');
        let informationArr: Array<string> = info.split(','); 
        
        console.log("Начало удаления");
        
        let information: IAddApplication = {
            email: "wallacce1351@yandex.ru",
            password: "Olof0re1351",
            adAccountId: informationArr,
            appId: data.appID,
        }
        
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--window-size=1920,1080"],
            headless: true,
            userDataDir: '/newprofile'
            
        });
        const page = await browser.newPage();
        await page.goto(`https://developers.facebook.com/apps/${information.appId}/settings/advanced`);
        await delay(10000);
        
        let setted: Array<string> = [];
        let crosses = await page.$$('.tgm57n0e .jez8cy9q .s5oniofx');
        let elements = await page.$$('.j1p9ls3c.hmv1tv54.kr054jk4.jxuftiz4.qm54mken.cgu29s5g');
        
        for (let index = 0; index < elements.length; index++) {
            let value = await page.evaluate(el => el.textContent, elements[index]);
            setted.push(value);
        }

        console.log(setted);
        console.log(crosses);


        await console.log('Удаление закончено');
    }


    convertStringToArr(forConvert: string): string[] {
        let stringSpace = forConvert.replace(/ /g, '');
        let stringArr: Array<string> = stringSpace.split(',');
        return stringArr;
    }

}

