export interface PhotographyPhotoInterface {
    photoId: string;
    photoSetId:string;
    photoUrl:string;
    photoTitle:string;
    photoDescription:string;
    photoDate:string;
    photoLocation:string;
    photoAlt:string;
    photoTags:string[];
}

export interface UserInterface {
    userEmail:string;
    userPassword?:string;
}

export interface PhotoSetInterface {
    photoSetId:string;
    photoSetTitle:string;
    
}

export interface TagInterface  {
    TagId:string;
    TagTitle:string;
    
}

export interface TagDTO  {
    TagTitle:string;
}

export interface PhotoSetDTO {
    photoSetTitle:string;
}
    