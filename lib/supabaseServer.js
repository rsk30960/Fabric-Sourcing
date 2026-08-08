// Server-side (Next.js Server Component / Node.js) data fetching, using plain fetch() against
// Supabase's PostgREST REST endpoint directly — NOT the @supabase/supabase-js client.
//
// Why: the installed supabase-js version is unreliable specifically in the server-side/Node.js
// context — confirmed by repeated direct A/B testing (identical query, same request cycle):
// an embedded-resource select combined with a wide column list, a query with .order() chained
// on, and even a plain simple .select() called inside Promise.all() have all independently
// returned an empty array with NO error from the client library server-side, while a raw
// fetch() to the exact same REST endpoint with the same anon key always returns correct data.
// Client-side (browser, "use client" components) queries via supabase-js have been reliable
// throughout — this workaround is server-side only.
export async function supabaseServerSelect(table, query) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${table}?${query}`;
  try {
    const res = await fetch(url, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function supabaseServerSelectOne(table, query) {
  const rows = await supabaseServerSelect(table, query);
  return rows[0] || null;
}
