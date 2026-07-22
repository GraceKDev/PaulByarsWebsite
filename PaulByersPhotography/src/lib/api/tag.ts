import type { TagDTO, TagInterface } from "../types/PhotographyPhotoInterface";

export async function createTag(tagDTO: TagDTO, errorMessage: { message: string }): Promise<boolean> {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Tag/Create`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(tagDTO),
    }).then((response) => {
        if (!response.ok) {
            errorMessage.message = `${"Error: " + response.status}`;
            return response.ok;
        }
        else {
            return response.ok;
        }
    })
}

export async function getTags(errorMessage: { message: string }): Promise<TagInterface[]> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Tag/GetAll`, {
        method: "GET",
        headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
        errorMessage.message = `Error: ${response.status}`;
    }
    try {
        const data = await response.json();
        return Array.isArray(data) ? data : []
    }
    catch (error) {
        console.error('Failed to parse tags response:', error);
        errorMessage.message = 'Failed to parse tags response';
        return [];
    }
}

export async function putTag(tagDTO: TagDTO, tagId: string, errorMessage: { message: string }): Promise<boolean> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Tag/Update/${tagId}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(tagDTO),
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
export async function deleteTag(tagId: string, errorMessage: { message: string }): Promise<boolean> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Tag/Delete/${tagId}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        credentials: "include",
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