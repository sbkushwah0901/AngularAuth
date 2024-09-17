import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.scss']
})
export class BlockUserComponent implements OnInit {
  @Input()formReset :number=0;
  @Output() hideBlockUserModal = new EventEmitter<string>();
  @Output() resData = new EventEmitter<string>();
  public blockUserForm: FormGroup;
  public isSubmitted = false;

  constructor(private service:SharedService) {
    this.blockUserForm = new FormGroup({
      blockType : new FormControl(),
      email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
      remarks: new FormControl(''),
    })
   }


  ngOnInit(): void {
    if(this.formReset == 0){
      this.blockUserForm.reset();
      this.blockUserForm.get('blockType')?.setValue(false)
      this.isSubmitted = false;
    }
  }

  changeInputType(){
    // console.log(this.blockUserForm.get('blockType')?.value)
  }

  blockUser(){
   this.isSubmitted=true;
   if(this.blockUserForm.valid){
    const model = {
      userEmail: this.blockUserForm.get('email')?.value,
      remarks:this.blockUserForm.get('remarks')?.value,
      isPermanentlyBlock: this.blockUserForm.get('blockType')?.value
     }
     this.service.postBlockUser(model).subscribe(res=>{
      if(res.isSuccess){
        this.resData.emit(res);
        this.hideBlockUserModal.emit("1");
      }else{
        this.resData.emit(res);
      }
     })
   }
  }




}
