/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { equipmentSchema } from "../utils/EquipmentValidate"
import { Equipment } from "../interface/equipment"
import { Button } from "@/components/ui/button"

const EquipmentForm = () => {
    const [submitted] = useState(false);

    type EquipmentFormData = z.infer<typeof equipmentSchema>

    const { register, handleSubmit, formState: {errors}, } = useForm<EquipmentFormData>({ resolver : zodResolver(equipmentSchema)});

    const onSubmit: SubmitHandler<EquipmentFormData> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(data);
        } catch (error) {
            console.error(error);
        }
        
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4">
            <input
            {...register('name')}
            placeholder="Equipment Name"
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
            <input
            {...register('location')}
            placeholder="Location"
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        </div>

        <div className="mb-4">
            <select
            {...register('department')}
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option value="Machining">Machining</option>
            <option value="Assembly">Assembly</option>
            <option value="Packaging">Packaging</option>
            <option value="Shipping">Shipping</option>
            </select>
        </div>

        <div className="mb-4">
            <input
            {...register('model')}
            placeholder="Model"
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.model && <p className="text-red-500">{errors.model.message}</p>}
        </div>

        <div className="mb-4">
            <input
            {...register('serialNumber')}
            placeholder="Serial Number"
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.serialNumber && <p className="text-red-500">{errors.serialNumber.message}</p>}
        </div>

        <div className="mb-4">
            <input
            type="date"
            {...register('installDate')}
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.installDate && <p className="text-red-500">{errors.installDate.message}</p>}
        </div>

        <div className="mb-4">
            <select
            {...register('status')}
            className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option value="Operational">Operational</option>
            <option value="Down">Down</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Retired">Retired</option>
            </select>
        </div>

        <Button
            type="submit"
            className="btn-primary w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Submit
        </Button>
        {submitted && <p className="text-green-500 text-sm mt-4">Equipment added successfully!</p>}
        </form>

    );
}

export default EquipmentForm;