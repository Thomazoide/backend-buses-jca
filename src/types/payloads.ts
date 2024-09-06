import { Bus } from "src/models/bus.entity";
import { Chofer } from "src/models/chofer.entity";

export interface ResponsePayload{
    data?: Partial<Bus | Chofer> | Partial<Bus | Chofer>[]
    error: boolean
    message: string
}