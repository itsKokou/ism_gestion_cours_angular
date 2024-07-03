import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";

export interface BaseService<LIST, CREATE> { 
    findAll(page: number): Observable<RestResponse<LIST[]>>;
    findById(id: number): Observable<RestResponse<LIST>>;
    create(dataCreate: CREATE): Observable<RestResponse<CREATE>>;
    update(dataCreate: CREATE, id:number): Observable<RestResponse<CREATE>>;
}
