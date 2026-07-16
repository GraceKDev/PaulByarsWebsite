export interface PhotographyPhotoInterface {
    PhotoId: string;
    PhotoSetId:string;
    PhotoUrl:string;
    PhotoTitle:string;
    PhotoDescription:string;
    PhotoDate:string;
    PhotoLocation:string;
    PhotoAlt:string;
    PhotoTags:string[];
}

export interface UserInterface {
    UserEmail:string;
    UserPassword?:string;
}

export interface PhotoSetInterface {
    PhotoSetId:string;
    PhotoSetTitle:string;
    
}
    