import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";
import * as yup from "yup";
import { Todo } from "@prisma/client";

interface Segments {
  params: {
    id: string;
  };
}


const getTodo = async(id:string):Promise<Todo | null> => {
    const todo = await prisma.todo.findFirst({ where: { id: id } });
    return todo
}



export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id)

  if (!todo) {
    return NextResponse.json(
      {
        mesagge: `El todo con id ${params.id} no existe`,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id)
  if (!todo) {
    return NextResponse.json(
      {
        mesagge: `El todo con id ${params.id} no existe`,
      },
      { status: 400 }
    );
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );
    const todoChange = await prisma.todo.update({
      where: { id:params.id },
      data: { description, complete },
    });
    return NextResponse.json(todoChange);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
