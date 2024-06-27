import Task from '@/models/Task';
import { connectDB } from '@/utils/mongoose'
import { NextResponse } from 'next/server'

export async function GET() {
    connectDB();
    const tasks = await Task.find();
    return NextResponse.json(tasks)
}

export async function POST(request) {
    try {
        const data = await request.json()
        const newTask = new Task(data)
        const saveTask = await newTask.save()
        console.log(saveTask)

        return NextResponse.json(saveTask)
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

