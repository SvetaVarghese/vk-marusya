import type { User } from "../types/user"

const BASE_URL = "https://cinemaguide.skillbox.cc/";

// Регистрация
export const registerUser = async (user: {
   email: string,
   password: string,
   name: string,
   surname: string
}): Promise<User> => {
   const response = await fetch(`${BASE_URL}user`, {
      method: "POST", 
      credentials: "include",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(user)
   })

   if (response.status === 409) {
      throw new Error("Пользователь с такой почтой уже существует");
   }

   if (!response.ok) {
      throw new Error("Не удалось зарегистрировать пользователя")
   }

   const data: User = await response.json()
   return data
}

// Авторизация 
export const loginUser = async (email: string, password: string): Promise<boolean> => {
   const body = new URLSearchParams();
   body.append("email", email);
   body.append("password", password);

   const response = await fetch(`${BASE_URL}auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded"},
      body: body.toString()
   })

   if (!response.ok) {
      throw new Error("Не удалось авторизоваться")
   }

   const data: {result: boolean} = await response.json()
   return data.result
}

// Получение данных о текущем пользователе
export const fetchUserProfile = async (): Promise<User> => {
   const response = await fetch(`${BASE_URL}profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Не удалось получить данные пользователя");
  }

  const data: User = await response.json();
  return data;
}

// Выход из аккаунта
export const logoutUser = async ():Promise<boolean> => {
   const response = await fetch(`${BASE_URL}auth/logout`, {
      method: "GET", 
      credentials: "include"
   })

   if (!response.ok) {
      throw new Error("Не удалось выйти из аккаунта")
   }

   const data: {result: boolean} = await response.json()
   return data.result
}

// Добавление фильма в избранное
export const addToFavorites = async (movieId: string): Promise<User> => {
    const body = new URLSearchParams()
    body.append("id", movieId)

    const response = await fetch(`${BASE_URL}favorites`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString()
    })

    if(!response.ok) {
        throw new Error("Не удалось добавить фильм в избранное")
    }

    const data:User = await response.json()
    console.log(data);
    return data
}

// Удаление фильма из избранного
export const deleteFromFavorites = async (movieId: string | number): Promise<User> => {
   const response = await fetch(`${BASE_URL}favorites/${movieId}`, {
      method: "DELETE",
      credentials: "include"
   })

   if (!response.ok) {
      throw new Error("Ошибка при удалении фильма из избранного")
   }

   const data = await response.json()
   console.log("Ответ deleteFromFavorites:", data)
   return data
   
}