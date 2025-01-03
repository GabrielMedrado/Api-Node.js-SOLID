import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: registerUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithTheSameEmail = await prisma.user.findUnique({
    where: { email },
  })

  if (userWithTheSameEmail) {
    throw new Error('E-mail already exists')
  }

  await prisma.user.create({ data: { name, email, password_hash } })
}
