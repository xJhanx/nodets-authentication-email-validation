import mongoose from "mongoose"

export interface Options {
    dataBaseUrl: string,
    dataBaseName: string
}



export class DataBase {

    static async init(option: Options) {


        try {
            return await mongoose.connect(
                option.dataBaseUrl,
                {
                    dbName: option.dataBaseName
                }
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static disconnect() {
        mongoose.disconnect();
    }
}