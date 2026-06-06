import { supabase } from "./supabase";

export interface Review {
  id?: number;
  product_id: number;
  name: string;
  body: string;
  rating: number;
  helpful: number;
  created_at?: string;
}

export async function getReviews(productId: number): Promise<Review[]> {
  const { data, error } = await supabase
    .from("product_reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
  return data || [];
}

export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("product_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all reviews:", error);
    return [];
  }
  return data || [];
}

export async function deleteReview(id: number): Promise<void> {
  const { error } = await supabase.from("product_reviews").delete().eq("id", id);
  if (error) throw error;
}

export async function submitReview(productId: number, reviewData: Omit<Review, "id" | "product_id" | "created_at" | "helpful">) {
  const { data, error } = await supabase
    .from("product_reviews")
    .insert([
      {
        product_id: productId,
        name: reviewData.name,
        body: reviewData.body,
        rating: reviewData.rating,
        helpful: 0,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function updateHelpful(id: number, currentHelpful: number, increment: boolean) {
  const newHelpful = currentHelpful + (increment ? 1 : -1);
  const { error } = await supabase
    .from("product_reviews")
    .update({ helpful: newHelpful })
    .eq("id", id);

  if (error) {
    throw error;
  }
}
