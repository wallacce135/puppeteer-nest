export interface IAddApplication{
    email?: string;
    password?: string;
    appId: string;
    adAccountId: string[];
}

export interface IInfo{
    dataForSend?: string;
    dataForDelete?: string;
    appID: string;
}