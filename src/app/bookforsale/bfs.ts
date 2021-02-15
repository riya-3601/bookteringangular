export class Bfs{
  constructor(public book_id:number,public book_isbn:number,public book_title : string,public book_author:string,public book_price:number,public book_publisher:string,public book_ratings:number,public book_image:string,public fk_customer_id?:number,
    public customer_id?:number,public customer_emailid?:string,public customer_password?:string,public customer_name?:string,public customer_gender?: string,public customer_mobileno?:number,
  public fk_category_id?:number,public category_name?:string,public category_isactive?: string){}
}
