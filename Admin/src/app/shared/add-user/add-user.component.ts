import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input()formReset:number=0;
  @Output() hideCreateUserModal = new EventEmitter<string>();
  @Output() resData = new EventEmitter<string>();
  // @Output() apiisSuccess = new EventEmitter<string>();
  public createUserForm: FormGroup;
  public isSubmitted = false;

  constructor(private service:SharedService) {
    this.createUserForm = new FormGroup({
      userType : new FormControl(false),
      email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl(''),
      country: new FormControl(''),
      remarks: new FormControl(''),
    })
   }

  ngOnInit(): void {
    if(this.formReset == 0){
      this.createUserForm.reset();
      this.createUserForm.get('userType')?.setValue(false)
      this.isSubmitted = false;
      // console.log(this.createUserForm.value)
    }
  }

  createUser(){
    this.isSubmitted = true;
    if(this.createUserForm.valid){
      const createUserModel = {
        userType: this.createUserForm.get('userType')?.value === true ? 'Paid User':'Free User',
        firstName: this.createUserForm.get('firstName')?.value,
        lastName: this.createUserForm.get('lastName')?.value,
        userEmail: this.createUserForm.get('email')?.value,
        tempName: "Guest User",
        phoneNumber: this.createUserForm.get('phoneNumber')?.value,
        isPaidUser: this.createUserForm.get('userType')?.value,
      }
      // console.log(createUserModel)
      this.service.postCreateUser(createUserModel).subscribe(res=>{
        if(res.isSuccess){
          this.resData.emit(res);
          // this.apiMSG.emit(res.message);
          this.hideCreateUserModal.emit("1");
        }else{
          this.resData.emit(res);
          // this.apiMSG.emit(res.message);
        }
      })}
  }
}
