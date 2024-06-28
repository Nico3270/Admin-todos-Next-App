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


export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      {/* Formulario para agregar todos*/}
      <div className="w-full px-3 mx-4 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
