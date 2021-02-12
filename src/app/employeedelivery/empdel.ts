export class Empdel{
  constructor(public delivery_id:number,public delivery_status:string,public fk_employee_id?:number,public fk_order_id?:number,
    public employee_id?:number,public employee_name?:string,public employee_mobileno?:number,public employee_password?:string,
    public order_id?:number,public order_date ?:string,public order_status ?: string,public order_paymenttype?:string,public order_totalamount?:number,public fk_customer_id?:number,
    public customer_id?:number,public customer_emailid?:string,public customer_password?:string,public customer_name?:string,public customer_gender?: string,public customer_mobileno?:number){}
}
