import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY
)

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  )

  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  try {
    // GET
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("rambu")
        .select("*")
        .order("id", { ascending: true })

      if (error) throw error
      return res.status(200).json(data)
    }

    // POST
    if (req.method === "POST") {
      const { data, error } = await supabase
        .from("rambu")
        .insert([
          {
            nama_rambu: req.body.nama_rambu,
            lokasi_daerah: req.body.lokasi_daerah,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            foto: req.body.foto
          }
        ])
        .select()

      if (error) throw error
      return res.status(201).json(data[0])
    }

    // PUT
    if (req.method === "PUT") {
      const { id } = req.query
      if (!id) {
        return res.status(400).json({ error: "Missing id parameter" })
      }
      const { id: _, ...updateFields } = req.body
      const { data, error } = await supabase
        .from("rambu")
        .update(updateFields)
        .eq("id", id)
        .select()

      if (error) throw error
      return res.status(200).json(data[0])
    }

    // DELETE
    if (req.method === "DELETE") {
      const { id } = req.query
      if (!id) {
        return res.status(400).json({ error: "Missing id parameter" })
      }
      const { data, error } = await supabase
        .from("rambu")
        .delete()
        .eq("id", id)
        .select()

      if (error) throw error
      return res.status(200).json({ success: true, deleted: data })
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  } catch (error) {
    console.error("Supabase API error:", error)
    return res.status(500).json({ error: error.message || "Internal server error" })
  }
}