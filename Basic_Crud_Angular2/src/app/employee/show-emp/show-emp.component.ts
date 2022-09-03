import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }
  EmployeeList:any=[];
  ModalTitle:string='';
  ActivateAddEditEmpComp:boolean=false;
  emp:any;
  EmployeeNameFilter:string='';
  EmployeeListWithoutFilter:any=[];
  ngOnInit(): void {
    this.refreshEmpList();
  }
  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
      this.EmployeeListWithoutFilter=data;
    })
  }
  addClick(){
    this.emp={EmployeeId:0,EmployeeName:"",Department:"",DateOfJoining:"",PhotoFileName:"annonymous.jpg"}
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;
  }
  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }
  editClick(item:any){
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }
  deleteClick(item:any){
    if(confirm("Are you sure?")){
      this.service.deleteEmp(item).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }
  FilterFn(){
    var EmployeeNameFilter=this.EmployeeNameFilter;

    this.EmployeeList=this.EmployeeListWithoutFilter.filter(function (el:any){
      return el.EmployeeName.toString().toLowerCase().includes(EmployeeNameFilter.toString().trim().toLowerCase())
    })
  }
  sortResult(prop:any,asc:any){
    this.EmployeeList=this.EmployeeListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
        return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
      }
      else{
        return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
      }
    })
  }

}
