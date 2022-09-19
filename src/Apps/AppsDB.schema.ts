import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AppsDocument = AppsDB & Document


@Schema()
export class AppsDB{

    @Prop({required: true, default: null, unique: true})
    app_id: string;

    @Prop({required: true, default: null, unique: false})
    account_ids: string[];

}


export const AppsSchema = SchemaFactory.createForClass(AppsDB);