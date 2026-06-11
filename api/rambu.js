import { createClient } from "@supabase/supabase-js"


const supabase = createClient(
process.env.VITE_SUPABASE_URL,
process.env.VITE_SUPABASE_KEY
)



export default async function handler(req,res){


console.log("URL:", process.env.SUPABASE_URL)
console.log("BODY:", req.body)



if(req.method === "POST"){


const {data,error} = await supabase
.from("rambu")
.insert([
{
nama_rambu:req.body.nama_rambu,
lokasi_daerah:req.body.lokasi_daerah,
latitude:req.body.latitude,
longitude:req.body.longitude,
foto:req.body.foto
}
])
.select()



if(error){

console.log(error)

return res.status(500).json({
error:error.message
})

}


return res.json(data)


}



if(req.method === "GET"){


const {data,error}=await supabase
.from("rambu")
.select("*")


if(error){

return res.status(500).json({
error:error.message
})

}


return res.json(data)


}


}