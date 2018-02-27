import { Vehicle } from './vehicle'

export interface VehicleStorage {
    removeVehicle( vehicle: Vehicle ): Vehicle[]
    addVehicle( vehicle: Vehicle ): Promise<Vehicle[]>
    containsVehicle( vehicle: Vehicle ): boolean
    sync()
    vehicles: Vehicle[]
}
