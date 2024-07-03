import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { ProfHome, RPHome } from "../models/home";

export interface DashboardService {
  findProfData(id: number): Observable<RestResponse<ProfHome>>;
  findRPData(id: number): Observable<RestResponse<RPHome>>;
}
