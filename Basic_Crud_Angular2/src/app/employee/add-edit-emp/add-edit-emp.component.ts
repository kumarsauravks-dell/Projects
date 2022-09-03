import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService) { }
  @Input() emp:any;
  EmployeeId:string="";
  EmployeeName:string="";
  Department:string="";
  DateOfJoining:string="";
  PhotofileName:string="";
  PhotoFilePath:string="";
  DepartmentsList:any=[];

  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe(data=>{
      this.DepartmentsList=data;
      this.EmployeeId=this.emp.EmployeeId;
      this.EmployeeName=this.emp.EmployeeName;
      this.Department=this.emp.Department;
      this.DateOfJoining=this.emp.DateOfJoining.split('T')[0];
      this.PhotofileName=this.emp.PhotoFileName;
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotofileName;
    })
  }
  ngOnInit(): void {
    this.loadDepartmentList();
  }

  addEmployee(){
    var val={EmployeeId:this.EmployeeId,EmployeeName:this.EmployeeName,Department:this.Department,DateOfJoining:this.DateOfJoining,PhotofileName:this.PhotofileName}
    this.service.addEmp(val).subscribe(res=>{
      alert(res.toString());
    })
  }
  updateEmployee(){
    var val={EmployeeId:this.EmployeeId,EmployeeName:this.EmployeeName,Department:this.Department,DateOfJoining:this.DateOfJoining,PhotofileName:this.PhotofileName}
    this.service.updateEmp(val).subscribe(res=>{
      alert(res.toString());
    })
  }

  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.uploadPhoto(formData).subscribe((data:any)=>{
      this.PhotofileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotofileName;
    })
  }
}
