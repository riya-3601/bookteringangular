export class Contact{
  constructor(public contactus_id:number,public contactus_name :string,public contactus_emailid:string,public contactus_message : string,public fk_customer_id:number,
    public customer_id?:number,public customer_emailid?:string,public customer_password?:string,public customer_name ?:string,public customer_gender ?: string,public customer_mobileno?:number,public customer_type?:number){}
}
