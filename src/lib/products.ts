import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export type Category = string;
export type Lang = "en" | "vi";

export type Product = {
  id: number;
  category: Category;
  price: number;
  originalPrice?: number | null;
  image: string;
  en: { name: string; categoryLabel: string; description: string; features: string[] };
  vi: { name: string; categoryLabel: string; description: string; features: string[] };
};

export const formatPrice = (p: number, lang: string = "vi") => {
  if (lang === "en") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p / 25000);
  }
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);
};

function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    category: row.category as Category,
    price: row.price,
    originalPrice: row.original_price,
    image: row.image,
    en: {
      name: row.name_en,
      categoryLabel: row.category_label_en,
      description: row.description_en,
      features: row.features_en || [],
    },
    vi: {
      name: row.name_vi,
      categoryLabel: row.category_label_vi,
      description: row.description_vi,
      features: row.features_vi || [],
    },
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*").order("id", { ascending: true });
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data.map(mapRowToProduct);
}

export async function getProduct(id: number): Promise<Product | null> {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error) return null;
  return mapRowToProduct(data);
}

export async function addProduct(product: Omit<Product, "id">, imageFile?: File): Promise<void> {
  let imageUrl = product.image;

  if (imageFile) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    imageUrl = data.publicUrl;
  }

  const { error } = await supabase.from("products").insert({
    category: product.category,
    price: product.price,
    original_price: product.originalPrice,
    image: imageUrl,
    name_en: product.en.name,
    name_vi: product.vi.name,
    category_label_en: product.en.categoryLabel,
    category_label_vi: product.vi.categoryLabel,
    description_en: product.en.description,
    description_vi: product.vi.description,
    features_en: product.en.features,
    features_vi: product.vi.features,
  });

  if (error) throw error;
}

export async function updateProduct(id: number, product: Partial<Product>, imageFile?: File): Promise<void> {
  let imageUrl = product.image;

  if (imageFile) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    imageUrl = data.publicUrl;
  }

  const payload: any = {};
  if (product.category) payload.category = product.category;
  if (product.price !== undefined) payload.price = product.price;
  if (product.originalPrice !== undefined) payload.original_price = product.originalPrice;
  if (imageUrl) payload.image = imageUrl;
  if (product.en) {
    payload.name_en = product.en.name;
    payload.category_label_en = product.en.categoryLabel;
    payload.description_en = product.en.description;
    payload.features_en = product.en.features;
  }
  if (product.vi) {
    payload.name_vi = product.vi.name;
    payload.category_label_vi = product.vi.categoryLabel;
    payload.description_vi = product.vi.description;
    payload.features_vi = product.vi.features;
  }

  const { error } = await supabase.from("products").update(payload).eq("id", id);
  if (error) throw error;
}

export async function deleteProduct(id: number): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}