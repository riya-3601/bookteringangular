export class Bfs{
  constructor(public book_id:number,public book_isbn:number,public book_title : string,public book_author:string,public book_price:number,public book_publisher:string,public book_ratings:number,public book_image:string,public fk_category_id?:number,public category_name?:string,public category_isactive?: string){}
}
