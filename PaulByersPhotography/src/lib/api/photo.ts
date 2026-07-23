import type { PhotographyPhotoInterface, PhotoDTO } from "../types/PhotographyPhotoInterface";

export async function getAllPhotos(errorMessage: { message: string }): Promise<PhotographyPhotoInterface[]> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Photos/GetAll`, {
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
        console.error('Failed to parse photos response:', error);
        return [];
    }
}

export async function getPhotosBySet(photoSetId: number, errorMessage: { message: string }): Promise<PhotographyPhotoInterface[]> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Photos/GetBySet/${photoSetId}`, {
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
        console.error('Failed to parse photos by set response:', error);
        return [];
    }
}

export async function createPhoto(formData: FormData, errorMessage: { message: string }): Promise<boolean> {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Photos/Create`, {
        method: "POST",
        credentials: "include",
        body: formData,
    }).then((response) => {
        if (!response.ok) {
            errorMessage.message = `Error: ${response.status}`;
            return response.ok;
        }
        return response.ok;
    })
}

export async function updatePhoto(photoId: string, formData: FormData): Promise<boolean> {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Photos/Update/${photoId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
    }).then((response) => {
        if (!response.ok) {
            return response.ok;
        }
        return response.ok;
    })
}

export async function deletePhoto(photoId: string, errorMessage: { message: string }): Promise<boolean> {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Photos/Delete/${photoId}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        credentials: "include",
    }).then((response) => {
        if (!response.ok) {
            errorMessage.message = `Error: ${response.status}`;
            return response.ok;
        }
        return response.ok;
    })
}
