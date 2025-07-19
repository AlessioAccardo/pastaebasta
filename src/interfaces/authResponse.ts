export interface AuthResponse {
    token: string;
    data: {
        id: number,
        first_name: string;
        last_name: string;
        email: string,
    }
};