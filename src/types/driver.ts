
type TCreateDriver = {
    name: string;
    email: string;
    phoneNumber: string;
    driverLicense: string;
    latitude: number;
    longitude: number;
};

type TCreateDriverRes = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    driverLicense: string;
    username: string;
    password: string;
    latitude: number | null;
    longitude: number | null;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string; 
  };


type TDriverNearBy = {
    radius: number;
    lat: number;
    lng: number;
};

export type {
    TCreateDriver,
    TDriverNearBy,
    TCreateDriverRes
}