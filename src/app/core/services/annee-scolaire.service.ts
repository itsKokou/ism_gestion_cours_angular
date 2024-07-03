import { Observable } from "rxjs";
import { AnneeScolaireCreate, AnneeScolaireList } from "../models/annee.scolaire";
import { BaseService } from "./base.service";
import { RestResponse } from "../models/rest.response";

export interface AnneeScolaireService extends BaseService<AnneeScolaireList,AnneeScolaireCreate>{
    findAllList(): Observable<RestResponse<AnneeScolaireList[]>>;
}
