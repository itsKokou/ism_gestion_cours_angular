import { Observable } from "rxjs";
import { ModuleCreate, ModuleList } from "../models/module";
import { RestResponse } from "../models/rest.response";
import { BaseService } from "./base.service";

export interface ModuleService extends BaseService<ModuleList,ModuleCreate>{ 
    findAllList(): Observable<RestResponse<ModuleList[]>>;
}
