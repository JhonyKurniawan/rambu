export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  return res.json({
    supabaseUrlDefined: !!process.env.VITE_SUPABASE_URL,
    supabaseUrlValueStart: process.env.VITE_SUPABASE_URL ? process.env.VITE_SUPABASE_URL.substring(0, 15) : "none",
    supabaseKeyDefined: !!(process.env.VITE_SUPABASE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY),
    supabaseKeyType: process.env.VITE_SUPABASE_KEY ? "VITE_SUPABASE_KEY" : (process.env.VITE_SUPABASE_PUBLISHABLE_KEY ? "VITE_SUPABASE_PUBLISHABLE_KEY" : "none"),
    viteApiUrl: process.env.VITE_API_URL,
    nodeVersion: process.version
  })
}
