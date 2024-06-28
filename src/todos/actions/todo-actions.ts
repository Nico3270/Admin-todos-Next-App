"use server";

import prisma from "@/app/lib/prisma";
import { updateTodo } from '../helpers/todos';
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export const toggleTodo = async(id:string, complete:boolean): Promise<Todo>=> {
    const todo = await prisma.todo.findFirst({where: {id}});

    if (!todo){
        throw `Todo con id ${id} no encontrado`
    };
    const updatedTodo = await prisma.todo.update({
        where: {id},
        data: {complete: complete}
    });
    revalidatePath("/dashboard/server-todos")
    return updatedTodo
};


export const addTodo = async (description:string)=>{ 

    try {
     
        const todo = await prisma.todo.create({data:{ description}});
        revalidatePath("/dashboard/server-todos")
        return todo;

    } catch (error) {
        
       return {
        message: "Error creando Todo"
       }
    }
};

export const deleteCompleted = async():Promise<void> =>{
    try {
        await prisma.todo.deleteMany({where:{complete:true}})   
        revalidatePath("/dashboard/server-todos")     
        console.log("Todos completos eliminados");
    } catch (error) {  
        console.log(error);
    }
};