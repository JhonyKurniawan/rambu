import { MongoClient, ObjectId } from "mongodb"

const uri = process.env.MONGODB_URI
let client
let clientPromise

if (!uri) {
  throw new Error("Please add your MONGODB_URI environment variable")
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

function getFilterById(id) {
  if (!id) return null
  try {
    if (ObjectId.isValid(id)) {
      return { _id: new ObjectId(id) }
    }
  } catch (e) {}

  // Fallback for custom or legacy string/number ids
  const numVal = Number(id)
  if (!isNaN(numVal)) {
    return {
      $or: [
        { _id: id },
        { _id: numVal },
        { id: id },
        { id: numVal }
      ]
    }
  }
  return {
    $or: [
      { _id: id },
      { id: id }
    ]
  }
}

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
    const client = await clientPromise
    const db = client.db("db_rambu")
    const collection = db.collection("rambu")

    // GET METHOD
    if (req.method === "GET") {
      const data = await collection.find({}).toArray()
      const formattedData = data.map(item => ({
        ...item,
        id: item._id.toString()
      }))
      return res.status(200).json(formattedData)
    }

    // POST METHOD
    if (req.method === "POST") {
      const doc = {
        nama_rambu: req.body.nama_rambu,
        lokasi_daerah: req.body.lokasi_daerah,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        foto: req.body.foto,
        tanggal_input: new Date()
      }
      const result = await collection.insertOne(doc)
      return res.status(201).json({
        ...doc,
        id: result.insertedId.toString()
      })
    }

    // PUT METHOD
    if (req.method === "PUT") {
      const { id } = req.query
      if (!id) {
        return res.status(400).json({ error: "Missing id parameter" })
      }
      const filter = getFilterById(id)
      const { _id, id: _, ...updateFields } = req.body

      const result = await collection.updateOne(
        filter,
        { $set: updateFields }
      )
      return res.status(200).json({
        success: true,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      })
    }

    // DELETE METHOD
    if (req.method === "DELETE") {
      const { id } = req.query
      if (!id) {
        return res.status(400).json({ error: "Missing id parameter" })
      }
      const filter = getFilterById(id)
      const result = await collection.deleteOne(filter)
      return res.status(200).json({
        success: true,
        deletedCount: result.deletedCount
      })
    }

    // METHOD NOT ALLOWED
    return res.status(405).json({ error: `Method ${req.method} not allowed` })

  } catch (error) {
    console.error("API error:", error)
    return res.status(500).json({ error: error.message || "Internal server error" })
  }
}