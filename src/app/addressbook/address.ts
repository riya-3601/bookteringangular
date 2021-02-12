export class Address{
  constructor(public address_id:number,public address_1:string,public address_2:string,public city:string,public state:string,public pincode:number,public address_type:string,public fk_customer_id?:number,public customer_id?:number,public customer_emailid?:string,public customer_password?:string,public customer_name?:string,public customer_gender?: string,public customer_mobileno?:number){}
}
