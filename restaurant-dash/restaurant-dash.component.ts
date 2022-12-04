import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.moldel';
 
@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  [x: string]: any;

  formValue!:FormGroup
  restaurantModelObj :RestaurantData = new RestaurantData;
  allRestaurantData: any;
  showAdd!: boolean;
  showbtn!: boolean;

  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })
    this.getAllData()
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  //now subscribe our data which is mapped via Services
  addRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;
    
    this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
      console.log(res);
      alert("restaurant record added successfully");

      //clear fill form data
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData(); //when you post any data
    }, 
    err=>{
      alert("error occur to added restaurant")
    }
    )
  }

  //get all data
  getAllData(){
    this.api.getRestaurant(this.restaurantModelObj).subscribe(res=>{
      this.allRestaurantData = res;
    })
  }
  
  //delete records
    deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
     alert("restaurent records deleted")
     this.getAllData();
    })
   }
  
  //Edit records
  onEditResto(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.restaurantModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  UpdateResto(){
    
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe(res=>{
      alert("Restaurant Records Updated Successfully")
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData(); //when you post any data
    })

  }
                                 
}
