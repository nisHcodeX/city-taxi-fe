enum Roles {
    USER = 1,
    DRIVER = 2,
    OPERATOR = 3,
    ADMIN = 4
}
enum VehicleType {
    CAR = 1,
    BIKE = 2
}

enum DriverStatus {
    AVAILABLE = 1,
    BUSY = 2,
}
const driverAvailability = {
    available: 'AVAILABLE',
    busy: 'BUSY',
};

const bookingStatus = {
    active: 'ACTIVE',
    completed: 'COMPLETED',
    cancelled: 'CANCELLED',
    paid: 'PAID',
};

const accountStatus = {
    active: 'ACTIVE',
    suspended: 'SUSPENDED',
};

const accountType = {
    customer: 'CUSTOMER',
    driver: 'DRIVER',
    telephoneOperator: 'TELEPHONE_OPERATOR',
    admin: 'ADMIN',
};

const paymentType = {
    cash: 'CASH',
    onlineTransfer: 'ONLINE_TRANSFER',
};

export { driverAvailability, bookingStatus, accountStatus, accountType, paymentType, Roles, VehicleType, DriverStatus };
