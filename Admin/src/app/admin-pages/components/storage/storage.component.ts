import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as echarts from 'echarts';
import { AdminPagesService } from '../../services/admin-pages.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {
  public spaceData : any = [];
  public loader = true;
  public isSubmitted = false;
  public displayfreeUserConfigurationModal = false;
  public displaypaidUserConfigurationModal= false;
  public userConfigForm: FormGroup = new FormGroup({});
  

  constructor(private service:AdminPagesService) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.loaduserConfigForm();
    // this.loadGaugeData();
  }

  loadInitialData(){
    this.service.getGetSpaceConfiguration().subscribe(res=>{
    this.spaceData = res.responseData;
    this.loader = false
    })
  }

  freeUserModal(limit:string,userStorage:string,user:any,spaceId:number){
    this.displayfreeUserConfigurationModal = true;
    this.userConfigForm.get('perFileUploadLimit')?.setValue(limit);
    this.userConfigForm.get('totalUserStorage')?.setValue(userStorage);
    this.userConfigForm.get('userType')?.setValue(user);
    this.userConfigForm.get('spaceId')?.setValue(spaceId);
  }

  paidUserModal(limit:string,userStorage:string,user:any,spaceId:number){
  this.displaypaidUserConfigurationModal = true;
  this.userConfigForm.get('perFileUploadLimit')?.setValue(limit);
  this.userConfigForm.get('totalUserStorage')?.setValue(userStorage);
  this.userConfigForm.get('userType')?.setValue(user);
  this.userConfigForm.get('spaceId')?.setValue(spaceId);
  }

  loaduserConfigForm(){
    this.userConfigForm = new FormGroup({
      perFileUploadLimit : new FormControl('',[Validators.required]),
      totalUserStorage : new FormControl('',[Validators.required]),
      userType : new FormControl(''),
      spaceId : new FormControl(''),
    })
  }

  updateUserConfig(){
    this.isSubmitted = true;
    console.log(this.userConfigForm)
    if(this.userConfigForm.valid){
      this.displaypaidUserConfigurationModal = false;
      this.displayfreeUserConfigurationModal = false;
      const model = {
      iSpaceConfigId: this.userConfigForm.get('spaceId')?.value,
      perFileUploadLimit: this.userConfigForm.get('perFileUploadLimit')?.value,
      totalSpaceAllowed: this.userConfigForm.get('totalUserStorage')?.value,
      }
      this.service.postUpdateSpaceConfig(model).subscribe(res=>{
        if(res){
          this.loadInitialData()
        }
      })
    }

  }

  loadGaugeData(){
//     var myChart = echarts.init(document.getElementById('gauge') as HTMLElement);
//     var option;

//     const gaugeData = [
//       {
//         value: 60,
//         detail: {
//           valueAnimation: true,
//           offsetCenter: ['0%', '40%']
//         }
//       }
//     ];
//     option = {
//        color:['#2c76ff'],
//       series: [
//         {
//           type: 'gauge',
//           startAngle: 90,
//           endAngle: -270,
//           pointer: {
//             show: false
//           },
//           progress: {
//             show: true,
//             overlap: false,
//             roundCap: true,
//             clip: false,
//           },
//           axisLine: {
//             lineStyle: {
//               width: 10,
//             }
//           },
//           splitLine: {
//             show: false,
//             distance: 0,
//             length: 10
//           },
//           axisTick: {
//             show: false
//           },
//           axisLabel: {
//             show: false,
//             distance: 50
//           },
//           data: gaugeData,
//           detail: {
//             width: 10,
//             color: 'white',
//             formatter: '{value}%'
//           }
//         }
//       ]
//     };
// option && myChart.setOption(option);
  }

}
