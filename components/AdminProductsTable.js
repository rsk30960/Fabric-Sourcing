"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function AdminProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      // See app/products/[division]/page.js getProducts() comment — avoiding embedded-resource
      // select syntax and .order() due to an unreliable zero-rows bug in this supabase-js version.
      const [{ data: products, error }, { data: categories }] = await Promise.all([
        supabase.from("products").select("id,name,sku,production_type,is_published,category_id"),
        supabase.from("categories").select("id,division,subcategory"),
      ]);
      if (cancelled) return;
      if (error) {
        setLoadError("Could not load products from Supabase.");
      } else {
        const categoryById = new Map((categories || []).map((c) => [c.id, c]));
        setProducts(
          (products || [])
            .map((p) => ({ ...p, category: categoryById.get(p.category_id) || null }))
            .sort((a, b) => a.name.localeCompare(b.name))
        );
      }
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  async function togglePublished(id, current) {
    const previous = products;
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, is_published: !current } : p)));
    const { error } = await supabase.from("products").update({ is_published: !current }).eq("id", id);
    if (error) setProducts(previous);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    const previous = products;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) setProducts(previous);
  }

  return (
    <div className="max-w-content mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Package size={18} className="text-graphite" />
          <h1 className="text-lg font-medium text-graphite">Products</h1>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-1.5 bg-graphite text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-graphite-dark">
          <Plus size={16} /> New Product
        </Link>
      </div>

      {loadError && <p className="mb-3 text-sm text-status-danger">{loadError}</p>}

      {!loading && products.length === 0 && (
        <div className="rounded-md border border-dashed border-border-strong bg-white p-8 text-center text-sm text-ink-secondary">
          No products yet. Catalogue is under 100 products at launch — add them here one at a time.
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="overflow-x-auto rounded-md border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-page text-xs text-ink-secondary">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Production</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-ink font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-ink-secondary">
                    {p.category ? `${p.category.division} — ${p.category.subcategory}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-ink-secondary">{p.production_type}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublished(p.id, p.is_published)}
                      className={`text-xs px-2.5 py-1 rounded-sm font-medium ${
                        p.is_published ? "bg-status-successBg text-status-success" : "bg-surface-page text-ink-secondary"
                      }`}
                    >
                      {p.is_published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link href={`/admin/products/${p.id}`} className="text-clay hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(p.id)} className="text-status-danger hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
