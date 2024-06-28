
import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            {description: "Piedra del alma", complete: true},
            {description: "Piedra del poder"},
            {description: "Piedra del mal"},
            {description: "Piedra del eter"},
            {description: "Piedra del bien"},
            {description: "Piedra del saber"},
        ]
    })
  return NextResponse.json({msg: "Seed Executed"})  
}  




