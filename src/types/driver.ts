
type TCreateDriver = {
    name: string;
    email: string;
    phoneNumber: string;
    driverLicense: string;
    latitude: number;
    longitude: number;
    locationName: string
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


type TDriver = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    driverLicense: string;
    availability: 'BUSY' | 'AVAILABLE';
    latitude: number;
    longitude: number;
    locationName: string;
    createdAt: string; 
    updatedAt: string | null; 
}

export type {
    TCreateDriver,
    TDriverNearBy,
    TCreateDriverRes,
    TDriver
}
