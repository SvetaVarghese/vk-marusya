import { z } from "zod"

export const registerSchema = z
   .object({
      email: z.string("Некорректный email"). min(1, "Введите электронную почту"),
      name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
      surname: z.string().min(2, "Фамилия должна содержать минимум 2 символа"),
      password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"]
   })

export type RegisterFormData = z.infer<typeof registerSchema>