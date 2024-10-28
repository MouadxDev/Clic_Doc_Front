import { ElMessage } from 'element-plus';

import ENV from '../env';
import { IResponse } from '../Types/IResponse';
import { httpClient } from './HttpClients';

export class Payment {

    public baseUrl = ENV.VITE_BACKEND_API+ENV.VITE_BACKEND_URL_V1+ENV.VITE_BACKEND_URL_PAYMENT
    public client  = new httpClient(this.baseUrl)

    public async getAll(request : any) : Promise<IResponse> {
        try {
            const response = await this.client.get("")
            return response.data
        }
        catch(error:any )
        {
            console.log(error)
            return {
                status:error.status,
                data:error.response.data
            }
        }
    }
    public async getReport(request : any) : Promise<any> {
        try {
            const response = await this.client.get("/create")
            return response.data
        }
        catch(error:any )
        {
            console.log(error)
            return {
                status:error.status,
                data:error.response.data
            }
        }
    }

    public async add(request:any) : Promise<IResponse> {
        try {
            const response = await this.client.post("",request)
            return response.data
        }
        catch(error:any) {
            ElMessage.error("Erreur lors de l'enregistrement des données")
            return {
                status:error.status,
                data:error.response.data
            }
        }
    }

}