export class Bookrev{
  constructor(public bookreview_id:number,public bookreview_description:string,public bookreview_date:string,public fk_bookbarter_id?:number,public fk_customer_id?:number,public fk_category_id?:number){}
}
