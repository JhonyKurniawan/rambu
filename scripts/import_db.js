import fs from "fs"
import path from "path"
import { MongoClient } from "mongodb"

// Load .env values
try {
  const envPath = path.resolve(process.cwd(), ".env")
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8")
    envConfig.split("\n").forEach(line => {
      const parts = line.split("=")
      if (parts.length >= 2) {
        const key = parts[0].trim()
        const value = parts.slice(1).join("=").trim()
        process.env[key] = value
      }
    })
  }
} catch (e) {
  console.log("No .env found or failed to parse:", e.message)
}

const mongoUri = process.env.MONGODB_URI

if (!mongoUri) {
  console.error("Error: MONGODB_URI is not set in your environment or .env file.")
  console.log("Please define MONGODB_URI in your .env like this:")
  console.log("MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/db_rambu\n")
  process.exit(1)
}

const sqlPath = path.resolve(process.cwd(), "db_rambu.sql")
if (!fs.existsSync(sqlPath)) {
  console.error("Error: db_rambu.sql not found in the root directory.")
  process.exit(1)
}

console.log("Reading db_rambu.sql...")
const sql = fs.readFileSync(sqlPath, "utf-8")
const insertRegex = /INSERT INTO `rambu` \([^)]+\) VALUES\s*([\s\S]+?);/
const match = sql.match(insertRegex)

if (!match) {
  console.error("Could not find any INSERT INTO `rambu` values inside db_rambu.sql")
  process.exit(1)
}

const valuesBlock = match[1]
// Split values block by commas that follow a closing parenthesis
const rows = valuesBlock.split(/\),\s*\(/)
const records = []

for (let row of rows) {
  let cleaned = row.trim()
  if (cleaned.startsWith("(")) cleaned = cleaned.substring(1)
  if (cleaned.endsWith(")")) cleaned = cleaned.substring(0, cleaned.length - 1)

  // Split comma-separated values respecting string quotes
  const values = []
  let current = ""
  let inString = false
  let stringChar = ""
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i]
    if ((char === "'" || char === '"') && (i === 0 || cleaned[i - 1] !== "\\")) {
      if (inString && char === stringChar) {
        inString = false
      } else if (!inString) {
        inString = true
        stringChar = char
      }
    } else if (char === "," && !inString) {
      values.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  if (current) {
    values.push(current.trim())
  }

  const getVal = (val) => {
    if (!val) return null
    if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
      return val.substring(1, val.length - 1)
    }
    if (val.toUpperCase() === "NULL") return null
    return val
  }

  const idValue = Number(getVal(values[0]))
  records.push({
    _id: idValue,
    nama_rambu: getVal(values[1]),
    lokasi_daerah: getVal(values[2]),
    latitude: getVal(values[3]),
    longitude: getVal(values[4]),
    foto: getVal(values[5]),
    tanggal_input: new Date(getVal(values[6]) || Date.now())
  })
}

console.log(`Parsed ${records.length} records. Connecting to MongoDB...`)

async function run() {
  const client = new MongoClient(mongoUri)
  try {
    await client.connect()
    console.log("Connected to MongoDB successfully.")

    const db = client.db("db_rambu")
    const collection = db.collection("rambu")

    console.log("Clearing existing collection 'rambu'...")
    await collection.deleteMany({})

    console.log("Inserting parsed records...")
    const result = await collection.insertMany(records)
    console.log(`Successfully migrated ${result.insertedCount} records to 'rambu' collection!`)
  } catch (error) {
    console.error("Migration failed:", error)
  } finally {
    await client.close()
  }
}

run()
