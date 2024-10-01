type OperatorCreate = {
    name: string;
    email: string;
    phoneNumber: string;
}

type OperatorCreateRes = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string | null;
}

export type { OperatorCreate, OperatorCreateRes }