import { z } from "zod";

export const maintenanceSchema = z.object({
    equipmentId: z.string().nonempty('Equipment ID is required'),
    date: z.preprocess(
        (arg) => (typeof (arg) === "string" ? new Date(arg) : arg),
        z.date().refine((date) => date <= new Date(), 'Date cannot be in the future'),
    ),
    type: z.enum(['Preventive','Repair','Emergency']),
    technician: z.string().min(2, 'Minimum 2 characters'),
    hoursSpent: z.number().min(0).max(24, 'Hours must be from 0 to 24'),
    description: z.string().min(10, 'Minimum 10 characters'),
    partsReplaced: z.array(z.string()).optional(),
    priority: z.enum(['Low','Medium','High']),
    completionStatus: z.enum(['Complete','Incomplete','Pending Parts'])
})