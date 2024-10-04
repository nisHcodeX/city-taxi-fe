type TCreateCustomer = {
    name: string;
    email: string;
    phoneNumber: string;
}

type TCreateCustomerRes = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
};

type TUpdateCustomer = {
    id: number;       
    name: string;     
    email: string;  
    phoneNumber: string; 
  }
  

export type {
    TCreateCustomer,
    TCreateCustomerRes,
    TUpdateCustomer
}