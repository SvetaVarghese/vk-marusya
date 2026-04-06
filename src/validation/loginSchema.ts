import { z } from "zod"

export const loginSchema = z
   .object({
      email: z.string().min(1, "Введите адрес электронной почты"),
      password: z.string().min(6, "Пароль должен содержать минимум 6 символов")
   })

export type LoginFormData = z.infer<typeof loginSchema>