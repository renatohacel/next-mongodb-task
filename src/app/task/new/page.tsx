'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'


const FormPage = () => {

    const [newTask, setNewTask] = useState({
        title: '',
        description: ''
    });

    const router = useRouter();
    const params = useParams();

    const getTasks = async () => {
        const res = await fetch(`/api/tasks/${params.id}`);
        const data = await res.json()
        setNewTask({
            title: data.title,
            description: data.description,
        })
    }

    const updateTask = async () => {
        try {
            const res = await fetch(`/api/tasks/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(newTask),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();

            res.status === 200 && router.push('/');
            router.refresh();
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async () => {
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(newTask),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();

            res.status === 200 && router.push('/');
            router.refresh();

        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!params.id) {
            await createTask();
        } else {
            await updateTask();
        }

    };


    const handleDelete = async () => {

        if (window.confirm('Are you sure you want to delete this task')) {
            const res = await fetch(`/api/tasks/${params.id}`, {
                method: 'DELETE',
            })
            router.push('/');
            router.refresh();
        }

    }

    useEffect(() => {
        if (params.id) {
            getTasks()
        }
    }, [])

    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={handleSubmit}>
                <header className="flex justify-between">
                    <h1 className="font-bold text-3xl">{!params.id ? 'CREATE TASKS' : 'Edit Task'}</h1>
                    <button type="button" onClick={handleDelete} className="bg-red-500 px-3 py-1 rounded-lg">Delete</button>
                </header>
                <input type="text" name="title" placeholder="Title..." className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4" onChange={handleChange} value={newTask.title} />
                <textarea name="description" placeholder="Description..." className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4" onChange={handleChange} value={newTask.description}></textarea>
                <button type="submit" className={!params.id ? "bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg" : "bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-4 py-2 rounded-lg"}>{!params.id ? 'Save' : 'Edit'}</button>
            </form>
        </div >
    )
}

export default FormPage