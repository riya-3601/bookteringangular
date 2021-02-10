export class Ord{
  constructor(public order_id:number,public order_date :string,public order_status : string,public order_paymenttype:string,public order_totalamount:number,public fk_customer_id:number){}
}
