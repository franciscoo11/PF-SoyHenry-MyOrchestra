export interface PostsInt {
    id:string;
    title:string;
    content:string;
    url_video?:string;
    url_file?:string;
    visibility?:string;
    is_active:boolean;
    creation_date:string
    event_date:string;
    event_hour:string;
    views?:number;
    user_id:string;

}