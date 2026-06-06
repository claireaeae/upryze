import { supabase } from "./supabase";

export type FaqData = {
  id?: number;
  q_en: string;
  a_en: string;
  q_vi: string;
  a_vi: string;
  sort_order: number;
};

export async function getFaqs(): Promise<FaqData[]> {
  const { data, error } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
  if (error) {
    console.error("Error fetching faqs:", error);
    return [];
  }
  return data;
}

export async function saveFaq(faq: FaqData): Promise<void> {
  if (faq.id) {
    const { error } = await supabase.from("faqs").update(faq).eq("id", faq.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("faqs").insert([faq]);
    if (error) throw error;
  }
}

export async function deleteFaq(id: number): Promise<void> {
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw error;
}
