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
type OperatorUpdateRes = {
    id: number;
    name?: string;
    email?: string;
    phoneNumber?: string;

}

export type { OperatorCreate, OperatorCreateRes, OperatorUpdateRes }