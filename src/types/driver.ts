
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

type VehicleType = {
    id: number;
    name: string;
    pricePerMeter: number;
    seatCount: number;
    createdAt: string;
    updatedAt: string | null;
  };
  
  type Vehicle = {
    id: number;
    manufacturer: string;
    model: string;
    colour: string;
    licensePlate: string;
    vehicleType: VehicleType;
    createdAt: string;
    updatedAt: string | null;
  };
  
  type TDriverNearByRes = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    driverLicense: string;
    availability:  'BUSY' | 'AVAILABLE';
    latitude: number;
    longitude: number;
    locationName: string;
    vehicle: Vehicle;
    createdAt: string;
    updatedAt: string;
  };
  
export type {
    TCreateDriver,
    TDriverNearBy,
    TDriverNearByRes,
    TCreateDriverRes,
    TDriver
}
