import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppsDB, AppsDocument } from './AppsDB.schema'

@Injectable()
export class AppsDBService {
    constructor(
        @InjectModel(AppsDB.name) private Model: Model<AppsDocument>
    ) { }

    async getAll(): Promise<AppsDB[]> {
        // return;
        return this.Model.find();
    }

    async getOne(appId: string): Promise<void>{
        return this.Model.findOne({app_id: appId})
    }

    async create(content: AppsDB): Promise<AppsDB> {
        const newApp = new this.Model({ ...content });
        return newApp.save();
        // return;
    }

    async update(content: AppsDB){
        let arr: Array<string> = content.account_ids;
        const saving = await this.Model.findOneAndUpdate({app_id: content.app_id}, {$push: { account_ids: {$each: arr }}})
        return saving.save();
    }
    
    async delete(content: AppsDB){
        let arr: Array<string> = content.account_ids;
        for (let index = 0; index < arr.length; index++) {
            await (await this.Model.findOneAndUpdate({app_id: content.app_id}, {$pull: { account_ids: arr[index] }})).save();
        }
    }
    
    async clear(content: AppsDB){
        const saving = await this.Model.findOneAndUpdate({app_id: content.app_id}, {$set: { account_ids: [] }})
        return saving.save();
    }

    async deleteDoc(docId: string): Promise<void>{
        return await this.Model.findOneAndDelete({app_id: docId})
    }

}
