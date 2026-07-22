import { ref } from "vue";
import router from "../../router";
import type { UserInterface } from "../types/PhotographyPhotoInterface";

const isAuthenticated = ref(false);

export function useAuth() {
    const checkAuth = async (): Promise<boolean> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Auth/CheckAuth`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include" 
            });

            isAuthenticated.value = response.ok;
            return response.ok;
        }
        catch (error) {
            console.error('Error checking authentication:', error);
            isAuthenticated.value = false;
            return false;
        }
    };

    return {
        isAuthenticated,
        checkAuth
    };
}

export async function handleLogin(signInForm: UserInterface, errorMessage: { message: string }) {
    try {
        const body: UserInterface = {
            userEmail: signInForm.userEmail,
            userPassword: signInForm.userPassword
        }
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/Auth/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: "include"
        });
        if (!response.ok) {
            errorMessage.message = `${response.statusText}`;
            return;
        }

        isAuthenticated.value = true;
        await router.push('/admin');
    }
    catch (error) {
        console.error('Error signing in:', error);
        errorMessage.message = 'Unable to sign in. Please try again.';
    }
}

export async function checkAuth(): Promise<boolean> {
    const { checkAuth: checkUserAuth } = useAuth();
    return checkUserAuth();
}