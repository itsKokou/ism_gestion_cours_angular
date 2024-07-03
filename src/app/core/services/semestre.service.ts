import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { SemestreCreate, SemestreList } from "../models/semestre";
import { BaseService } from "./base.service";

export interface SemestreService extends BaseService<SemestreList,SemestreCreate>{
  findAllList(): Observable<RestResponse<SemestreList[]>>;
}
