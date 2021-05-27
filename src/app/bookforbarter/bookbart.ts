export class Bookbart{
  constructor(public bookbarter_id:number,public bookbarter_title:string,public bookbarter_author:string,public bookbarter_description:string,public bookbarter_status:string,public bookbarter_price:number,public bookbarter_image:string,public fk_customer_id?:number,
    public customer_id?:number,public customer_emailid?:string,public customer_password?:string,public customer_name ?:string,public customer_gender ?: string,public customer_mobileno?:number){}
}
