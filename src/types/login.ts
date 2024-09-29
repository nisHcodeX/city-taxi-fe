type TLoginData = {
    username: string;
    password: string;
}

type TLoggeedData = {
        accountId: number;
        accountStatus: "ACTIVE" | "INACTIVE";
        accountType: "CUSTOMER" | "ADMIN" | "DRIVER";  
        email: string;
        name: string;
        password: string;
        phoneNumber: string;
        username: string;
};

export type {
    TLoginData,
    TLoggeedData
}