/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { maintenanceSchema } from "../utils/MaintenanceValidate"

const MaintenanceForm = () => {
    const [subbmited] = useState(false);

    type MaintenanceFormData = z.infer<typeof maintenanceSchema>

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<MaintenanceFormData>({ resolver: zodResolver(maintenanceSchema)});

    const onSubmit: SubmitHandler<MaintenanceFormData> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4">
            <input
            {...register('equipmentId')}
            placeholder="Equipment ID"
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.equipmentId && <p className="text-red-500">{errors.equipmentId.message}</p>}
        </div>

        <div className="mb-4">
            <input
            {...register('date')}
            placeholder="Date"
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        <div className="mb-4">
            <select
                {...register('type')}
                className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="Preventive">Preventive</option>
                <option value="Repair">Repair</option>
                <option value="Emergency">Emergency</option>
            </select>
            {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        <div className="mb-4">
            <input
            {...register('technician')}
            placeholder="Technician"
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.technician && <p className="text-red-500">{errors.technician.message}</p>}
        </div>

        <div className="mb-4">
            <input
            {...register('hoursSpent')}
            placeholder="Hours Spent"
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.hoursSpent && <p className="text-red-500">{errors.hoursSpent.message}</p>}
        </div>

        <div className="mb-4">
            <input
            {...register('description')}
            placeholder="Description"
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
            <input
            {...register('partsReplaced')}
            placeholder="Parts Replaced"
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.partsReplaced && <p className="text-red-500">{errors.partsReplaced?.message}</p>}
        </div>

        <div className="mb-4">
            <select
                {...register('priority')}
                className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
        </div>

        <div className="mb-4">
            <select
                {...register('completionStatus')}
                className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="Complete">Complete</option>
                <option value="Imcomplete">Imcomplete</option>
                <option value="Pending Parts">Pending Parts</option>
            </select>
            {errors.completionStatus && <p className="text-red-500">{errors.completionStatus.message}</p>}
        </div>    
        </form>
    )
};

export default MaintenanceForm;