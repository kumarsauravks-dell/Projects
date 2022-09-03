import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly ApiUrl="http://localhost:50032/api";
readonly PhotoUrl="http://localhost:50032/Photos/"
  constructor(private http:HttpClient) { }

  getDepList():Observable<any[]>{
    return this.http.get<any>(this.ApiUrl+'/department')
  }
  addDept(val:any){
    return this.http.post(this.ApiUrl+'/department',val)
  }
  updateDept(val:any){
    return this.http.put(this.ApiUrl+'/department',val)
  }
  deleteDept(val:any){
    //return this.http.delete(this.ApiUrl+'/department',val)
    return this.http.post(this.ApiUrl+'/Department/DeleteDepartment',val)
  }

  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.ApiUrl+'/employee')
  }
  addEmp(val:any){
    return this.http.post(this.ApiUrl+'/employee',val)
  }
  updateEmp(val:any){
    return this.http.put(this.ApiUrl+'/employee',val)
  }
  deleteEmp(val:any){
    //return this.http.delete(this.ApiUrl+'/employee',val)
    return this.http.post(this.ApiUrl+'/Employee/DeleteEmployee',val)
  }

  uploadPhoto(val:any){
    return this.http.post(this.ApiUrl+'/employee/SaveFile',val)
  }
  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any>(this.ApiUrl+'/employee/GetAllDepartments')
  }
}
