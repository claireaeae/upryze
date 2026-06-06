import { supabase } from "./supabase";

export interface Question {
  id: number;
  name: string;
  email: string;
  message: string;
  status: "unread" | "read";
  created_at: string;
}

export async function getQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
  return data || [];
}

export async function submitQuestion(name: string, email: string, message: string) {
  const { data, error } = await supabase
    .from("questions")
    .insert([{ name, email, message, status: "unread" }])
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function markQuestionAsRead(id: number) {
  const { error } = await supabase
    .from("questions")
    .update({ status: "read" })
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteQuestion(id: number) {
  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
