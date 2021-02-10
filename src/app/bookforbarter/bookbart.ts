export class Bookbart{
  constructor(public bookbarter_id:number,public bookbarter_title:string,public bookbarter_author:string,public bookbarter_status:string,public bookbarter_price:number,public fk_customer_id?:number){}
}
