import { supabase } from "./supabase";

export type CategoryData = {
  slug: string;
  name_en: string;
  name_vi: string;
};

export async function getCategories(): Promise<CategoryData[]> {
  const { data, error } = await supabase.from("categories").select("*").order("slug");
  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return data;
}

export async function saveCategory(category: CategoryData): Promise<void> {
  const { error } = await supabase
    .from("categories")
    .upsert({
      slug: category.slug,
      name_en: category.name_en,
      name_vi: category.name_vi,
    });
  if (error) throw error;
}

export async function deleteCategory(slug: string): Promise<void> {
  const { error } = await supabase.from("categories").delete().eq("slug", slug);
  if (error) throw error;
}
