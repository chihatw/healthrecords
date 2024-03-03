"use server";

import { Todo } from "@/features/todos";

import { dbAdmin } from "@/firebase/admin";
import { COLLECTIONS } from "@/firebase/constants";
import { revalidatePath } from "next/cache";

export const addTodo = async (todo: Todo): Promise<string> => {
  try {
    await dbAdmin.collection(COLLECTIONS.todos).doc(todo.id).set(todo);
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return "something wrong";
  }
  return "";
};

export const removeTodo = async (id: string) => {
  await dbAdmin.collection(COLLECTIONS.todos).doc(id).delete();
  revalidatePath("/");
};
