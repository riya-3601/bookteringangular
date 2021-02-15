export class Bookrev{
  constructor(public bookreview_id:number,public bookreview_description:string,public bookreview_date:string,public fk_bookbarter_id?:number,public fk_customer_id?:number,public fk_category_id?:number,
    public bookbarter_id?:number,public bookbarter_title?:string,public bookbarter_author?:string,public bookbarter_status?:string,public bookbarter_price?:number,
    public customer_id?:number,public customer_emailid?:string,public customer_password?:string,public customer_name ?:string,public customer_gender ?: string,public customer_mobileno?:number,
    public category_id?:number,public category_name ?:string,public category_isactive ?: string){}
}
