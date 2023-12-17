export class ClientModel {
    id?: string;
    address?: {latitude:string,longitude:string};
    email?: string;
    name?:string;
    phone?:number;
    surnames?:string;
    profile_image?:string;
    resume?:string;
    notifications?:string[];
  }