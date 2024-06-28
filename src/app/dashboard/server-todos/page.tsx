// "use client"
export const dynamic = "force-dynamic";
export const revalidate = 0;


import prisma from "@/app/lib/prisma";
import { NewTodo } from "@/components/NewTodo";
import { TodosGrid } from "@/todos/components/TodosGrid";
export const metadata = {
 title: 'Listado de Todos',
 description: 'Listado de Todos',
};

import { useEffect } from "react";
import { json } from "stream/consumers";

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <>
        <span className="text-3xl mb-10">Server actions</span>
      {/* Formulario para agregar todos*/}
      <div className="w-full px-3 mx-4 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
