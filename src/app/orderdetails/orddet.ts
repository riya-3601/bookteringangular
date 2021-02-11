export class Orddet{
  constructor(public orderdetails_id:number,public orderdetails_quantity:number,public fk_order_id?:number,public fk_book_id?:number){}
}
