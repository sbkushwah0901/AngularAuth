import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminPagesService } from '../../services/admin-pages.service';
import * as echarts from 'echarts/core';
import {ToolboxComponent,TooltipComponent,GridComponent,LegendComponent,BrushComponent} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { AnimationOptions } from 'ngx-lottie';
import * as moment from 'moment';
import { dataTool } from 'echarts';
import { MessageService } from 'primeng/api';

echarts.use([ToolboxComponent,TooltipComponent,GridComponent,LegendComponent,BrushComponent,BarChart,CanvasRenderer]);

// createdDate: "2022-01-20T00:00:00"
// expiryDate: "0001-01-01T00:00:00"
// firstName: "test"
// iUserInfoId: 1
// isActive: false
// isPaidUser: false
// isProfileChanged: false
// isVerified: true
// lastName: "test l"
// otp: null
// phoneNumber: 1234567890
// profilePicURL: null
// tempName: "Anonymous User"
// userEmail: "test@gmail.com"
// userType: "Free user"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('calendar') private calendar: any;
  options: AnimationOptions = {
    path: "assets/animations/dot-loader.json"
  };
  public countData:any;
  public userData:any = [];
  public tempUserData:any = [];
  public displaycreateUserModal = false;
  public displayblockUserModal = false;
  public rangeDates: Date[] = [new Date(new Date().setFullYear(new Date().getFullYear() - 1)),new Date()];
  public selectedLimit = 'year'
  // public rangeDates: Date[] = [new Date(),new Date()];
  public loader = true;
  public xAxisData:any = [];
  // public totalUser = [9,11,10,2,15,7,8,9,7,6]
  public freeUser:any = [];
  public paidUser:any = [];
  public createFormReset:any = 0;
  public blockFormReset:any = 0;
  checked: boolean = true;

  constructor(private service:AdminPagesService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadInitialData();
    // this.loadGraphData();
  }

  loadInitialData(){
    this.service.getAllCount().subscribe(res=>{
      this.countData = res.responseData;
      this.loader = false;
    })
    this.service.GetAllUsers().subscribe(res=>{
      this.userData = res.responseData;
      this.tempUserData = res.responseData;
      this.filterDatabyDate(this.rangeDates[0],this.rangeDates[1]);
    })
  }

  getMonth(date:string){
  return new Date(date).getMonth()+1;
  }

  bytesToSize(bytes:any) {
    bytes = Number(bytes);
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(0) + " KB"; }
    else if (bytes > 1) { bytes = bytes + " bytes"; }
    else if (bytes == 1) { bytes = bytes + " byte"; }
    else { bytes = "0 bytes"; }
    return bytes;
  }

  monthDiff(dateFrom: any, dateTo: any) {
    return dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear())) //For Difference in Month
    // return Math.floor((Date.UTC(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate()) - 
    //Date.UTC(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate()) ) /(1000 * 60 * 60 * 24)) //For Difference in Dates
  }

  onSelect(){
  this.userData = this.tempUserData
  if (this.rangeDates[1]) {
    this.calendar.overlayVisible=false;
    this.filterDatabyDate(this.rangeDates[0],this.rangeDates[1]);
    this.selectedLimit = 'custom'
  } 
 }

 setTime(date:any){
   let tempDate = new Date(date);
   tempDate.setHours(0,0,0,0);
   return tempDate;
 }

 filterDatabyDate(startDate:any ,endDate:any){
  let tempStartDate = this.setTime(startDate);
  let tempEndDate = this.setTime(endDate);
  let filterData = this.userData.filter((date:any)=>this.setTime(date.createdDate)>=tempStartDate && this.setTime(date.createdDate)<=tempEndDate);
  this.loadFromDate(filterData,tempStartDate,tempEndDate);
 }

 loadFromDate(filteredData : any,startDate:any,endDate:any){
  let userGraphData = [];
  let model;
  let dateData = this.dateRange(startDate,endDate);
  if(filteredData.length!==0){
    for(let date =0;date<dateData.length;date++){
      let userCounter = 0;
      let freeUserCounter = 0;
      let paidUserCounter = 0;
        for(let user=0;user<filteredData.length;user++){
          model= {
            monthLabel : this.getMonthName(dateData[date].month),
            paidUser: new Date(filteredData[user].createdDate).getMonth()+1=== dateData[date].month && new Date(filteredData[user].createdDate).getFullYear()=== dateData[date].year &&  filteredData[user].isPaidUser === true ? ++paidUserCounter : paidUserCounter,
            freeUser: new Date(filteredData[user].createdDate).getMonth()+1 === dateData[date].month && new Date(filteredData[user].createdDate).getFullYear()=== dateData[date].year && filteredData[user].isPaidUser === false ? ++freeUserCounter : freeUserCounter,
            totalUser:new Date(filteredData[user].createdDate).getMonth()+1 === dateData[date].month && new Date(filteredData[user].createdDate).getFullYear()=== dateData[date].year ? ++userCounter : userCounter,
          }
        }
        userGraphData.push(model)
      }
      this.graphDataDistribution(userGraphData);
  }else{
    for(let date=0;date<dateData.length;date++){
      model= {
      monthLabel : this.getMonthName(dateData[date].month),
      paidUser: 0,
      freeUser: 0,
      totalUser : 0
    }
    userGraphData.push(model)
    }
    this.graphDataDistribution(userGraphData);
  }
 }

graphDataDistribution(data:any){
   this.xAxisData = [];
   this.freeUser= [];
   this.paidUser= [];
   data.map((i:any)=> {this.xAxisData.push(i.monthLabel),this.freeUser.push(i.freeUser),this.paidUser.push(i.paidUser)});
   this.loadGraphData();
}

filterByDropdown(event:any){
 const value = event.target.value;
 switch(value) {
  case 'today' : {
    this.filterDatabyDate(new Date(),new Date());
    this.rangeDates = [new Date(),new Date()]
    break;
  }
  case 'yesterday' : {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate()-1);
    this.filterDatabyDate(currentDate,currentDate);
    this.rangeDates = [currentDate,currentDate];
    break;
  }
  case 'thisWeek' : {
    let currentDate = new Date();
    let weekData = this.getWholeWeekByDate(currentDate);
    this.filterDatabyDate(weekData[0].date,weekData[6].date);
    this.rangeDates = [weekData[0].date,weekData[6].date];
    break;
  }
  case 'lastWeek' : {
    let currentDate = new Date();
    let previousMonday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);;
    let weekData = this.getWholeWeekByDate(previousMonday);
    this.filterDatabyDate(weekData[0].date,weekData[6].date);
    this.rangeDates = [weekData[0].date,weekData[6].date];
    break;
  }
  case 'thisMonth' : {
const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
this.filterDatabyDate(firstDay,lastDay);
this.rangeDates = [firstDay,lastDay];
    break; 
  }
  case 'lastMonth' : {
const date = new Date();
const firstDayPrevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
this.filterDatabyDate(firstDayPrevMonth,lastDayPrevMonth);
this.rangeDates = [firstDayPrevMonth,lastDayPrevMonth];
    break;
  }
  case 'year' : {
    this.filterDatabyDate(new Date(new Date().setFullYear(new Date().getFullYear() - 1)),new Date());
    this.rangeDates = [new Date(new Date().setFullYear(new Date().getFullYear() - 1)),new Date()];
    break;
  }
  default: { 
    break;
  } 
}
}

getWholeWeekByDate(startDate:any) {
var curr = (startDate);
let model = [];
    for(let i=0;i<7;i++){
      model.push({
        date : new Date(curr.setDate(curr.getDate() - curr.getDay()+i))
      })
    }
    return model
}


dateRange(startDate:any, endDate:any) {
  const fromYear = startDate.getFullYear();
    const fromMonth = startDate.getMonth();
    const toYear = endDate.getFullYear();
    const toMonth = endDate.getMonth();
    const months = [];

    for(let year = fromYear; year <= toYear; year++) {
        let monthNum = year === fromYear ? fromMonth : 0;
        const monthLimit = year === toYear ? toMonth : 11;

        for(; monthNum <= monthLimit; monthNum++) {
            let month = monthNum + 1;
            months.push({ year, month });
        }
    }
    return months;
}


  getMonthName(monthNumber:any) {
  return moment(monthNumber, 'M').format('MMM')
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


loadGraphData(){
  var myChart = echarts.init(document.getElementById('products') as HTMLElement);
  var option;
  
  var emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)'
    }
  };
  option = {
    legend: {
      // data: ['Free User', 'Paid User'],
      left: '10%',
      data: [{name: 'Free User',icon: 'circle',textStyle: {color: 'white'}},
            {name: 'Paid User',icon: 'circle',textStyle: {color: 'white'}},
  ]
    },
    color:['#724ee4','#ff0073'],
    tooltip: {},
    xAxis: {
      data: this.xAxisData,
      // name: 'X Axis',
      axisLine: { show: false },
      axisTick: { show : false},
      splitLine: { show: false },
      splitArea: { show: false }
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show : false},
      splitLine: { show: true, lineStyle:{type :'dashed',color: ['#333540'] }},
      splitArea: { show: false }
    },
      
    // yAxis.axisLine. show = true
    grid: {
      bottom: 30
    },
    series: [
      {
        name: 'Free User',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: this.freeUser
      },
      {
        name: 'Paid User',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: this.paidUser
      },
    ]
  };
  option && myChart.setOption(option);
  }
}
