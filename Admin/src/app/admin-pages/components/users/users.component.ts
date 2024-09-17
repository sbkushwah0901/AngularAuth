import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminPagesService } from '../../services/admin-pages.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public userData:any = [];
  public tempUserData:any = [];
  public selectedValue = 'all'
  public loader = true;
  public displaycreateUserModal = false;
  public displayblockUserModal = false;
  public createFormReset:any;
  public blockFormReset:any;
  public searchedBarString:any='';
  public searchedDropdown:any='all';

  constructor(private service:AdminPagesService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadInitialData();
  }


  loadInitialData(){
    this.service.GetAllUsers().subscribe(res=>{
      this.userData = res.responseData;
      this.tempUserData = res.responseData;
      this.loader = false;
    })
  }

  searchBar(event:any){
    if(this.tempUserData && this.tempUserData.length > 0){
      this.searchedBarString = event.target.value;
      if(this.searchedDropdown !== 'all'){
        this.userData = this.tempUserData.filter((i:any)=>i.userEmail.toLocaleLowerCase().includes(this.searchedBarString.toLocaleLowerCase()) && i.isPaidUser.toString() == this.searchedDropdown);
      }else{
        this.userData = this.tempUserData.filter((i:any)=>i.userEmail.toLocaleLowerCase().includes(this.searchedBarString.toLocaleLowerCase()))
      }
      if(!this.searchedBarString){
        this.selectedValue = 'all'
      }
    }
  }

  filterByuserType(event:any){
    let tempuser = this.tempUserData
    // this.userData = this.tempUserData
    this.searchedDropdown = event.target.value;
    if(this.searchedDropdown === 'true' || this.searchedDropdown === 'false'){
      this.userData = tempuser.filter((i:any)=>i.isPaidUser.toString() == this.searchedDropdown && i.userEmail.toLocaleLowerCase().includes(this.searchedBarString.toLocaleLowerCase()));
    }else{
      this.userData = tempuser.filter((i:any)=>i.userEmail.toLocaleLowerCase().includes(this.searchedBarString.toLocaleLowerCase()));
    }
  }

  createUserModal(){
    this.createFormReset = 0
    this.displaycreateUserModal = true;
   }
  
   blockUserModal(){
    this.blockFormReset = 0
    this.displayblockUserModal = true;
   }

   cancelCreateUserModal(data: string){
    if(data === '1'){
      this.displaycreateUserModal = false;
     }
  }
  
   cancelBlockUserModal(data: string){
    if(data === '1'){
      this.displayblockUserModal = false;
     }
  }

createUserAPIRES(data:any){
  if(data.isSuccess){
    this.showCreateORBlockUserSuccessFully(data.message) 
  }else{
    this.showCreateORBlockUserFailed(data.message)
  }
}

blockUserAPIRES(data:any){
  if(data.isSuccess){
    this.showCreateORBlockUserSuccessFully(data.message) 
  }else{
    this.showCreateORBlockUserFailed(data.message)
  }
}
    
    
    showCreateORBlockUserSuccessFully(data:string) {
      this.messageService.add({severity:'success', summary: 'Success', detail: data});
    }
    
    showCreateORBlockUserFailed(data:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: data});
    }

   bytesToSize(bytes:any) {
    bytes = Number(bytes);
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(0) + " GB"; }
    else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(0) + " MB"; }
    else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(0) + " KB"; }
    else if (bytes > 1) { bytes = bytes + " bytes"; }
    else if (bytes == 1) { bytes = bytes + " byte"; }
    else { bytes = "0 bytes"; }
    return bytes;
  }

}
