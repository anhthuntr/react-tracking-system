import { z } from "zod";

export const equipmentSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    location: z.string().nonempty('Location is required'),
    department: z.enum(['Machining','Assembly','Packaging','Shipping']),
    model: z.string().nonempty('Model is required'),
    serialNumber: z.string().regex(/^[a-zA-Z0-9]+$/, 'Alphanumeric only'),
    installDate: z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z.date().refine((date) => date <= new Date(), 'Install date cannot be in the future')
    ),
    status: z.enum(['Operational', 'Down', 'Maintenance', 'Retired'])
});