import { Adrress } from "./addres.model";
import { Gender } from "./gender.model";

export interface UpdateStudent{


 // id : string,
  firstName :string,
  lastName :string,
  dateOfBirth :string,
  email :string,
  mobile :number,
 // profileImageUrl:string,
  genderId :string,
 // gender:Gender,
 // address:Adrress
 physicalAddress:string,
 postalAddress:string
}
