import type { PhotoSetDTO, PhotoSetInterface } from "../types/PhotographyPhotoInterface";

export async function createGallery(photoSetDTO: PhotoSetDTO, errorMessage: { message: string }): Promise<boolean> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/PhotoSet/Create`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(photoSetDTO),
    }).then((response) => {

        if (!response.ok) {
            errorMessage.message = `${"Error: " + response.status}`;
            return response.ok;
        }
        else {
            return response.ok;
        }
    })
    return response
}

export async function getAllGallery(errorMessage: { message: string }): Promise<PhotoSetInterface[]> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/PhotoSet/GetAll`, {
        method: "GET",
        headers: { "content-type": "application/json" },
    });

    if (!response.ok) {
        errorMessage.message = `Error: ${response.status}`;
        return [];
    }

    try {
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Failed to parse gallery response:', error);
        return [];
    }
}

export async function putGallery(photoSetDTO: PhotoSetDTO, photoSetId: string, errorMessage: { message: string }): Promise<boolean> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/PhotoSet/Update/${photoSetId}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(photoSetDTO),
    }).then((response) => {
        if (!response.ok) {
            errorMessage.message = `${"Error: " + response.status}`;
            return response.ok;
        }
        else {
            return response.ok;
        }
    })
    return response
}