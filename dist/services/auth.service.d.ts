export declare const register: (data: {
    username: string;
    email: string;
    password: string;
    role?: string;
}) => Promise<{
    email: string;
    username: string;
    role: string;
}>;
export declare const login: (data: {
    email: string;
    password: string;
}) => Promise<{
    userReturn: {
        email: string;
        username: string;
        role: string;
    };
    token: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map