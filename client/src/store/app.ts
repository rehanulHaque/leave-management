import axios from "axios";
import { create } from "zustand";

interface UserTypes {
    username: string;
    role: string;
    token: string;
}

interface AppStoreTypes {
    user: UserTypes,
    registerUser: (data: any) => Promise<any>,
    loginUser: (data: any) => Promise<any>,
    logoutUser: () => void,
}

export const useAppStore = create<AppStoreTypes>((set) => ({
    user: {} as UserTypes,
    registerUser: async (data: any) => {
        const response = await axios.post("http://localhost:3000/api/user/register", data)
        if(response.status === 200){
            set((state: any) => ({...state, user: response.data}))
            return response.data
        }else {
            return response.data
        }
    },
    loginUser: async (data: any) => {
        const response = await axios.post("http://localhost:3000/api/user/login", data)
        console.log(response.data)
        if(response.status === 200){
            set((state: any) => ({...state, user: response.data}))
            return response.data
        }else {
            return response.data
        }
    },
    logoutUser: () => {
        set((state: any) => ({...state, user: {}}))
        localStorage.removeItem("token")
    }
}))