import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_KEY
)


export default async function handler(req,res){

res.setHeader(
"Access-Control-Allow-Origin",
"*"
)

res.setHeader(
"Access-Control-Allow-Methods",
"GET,POST,PUT,DELETE"
)


if(req.method==="GET"){

const {data,error}=await supabase
.from("rambu")
.select("*")
.order("id",{ascending:false})


return res.json(data)

}



if(req.method==="POST"){

const {data,error}=await supabase
.from("rambu")
.insert([req.body])


return res.json(data)

}



if(req.method==="DELETE"){

await supabase
.from("rambu")
.delete()
.eq("id",req.query.id)


return res.json({
status:"hapus"
})

}



if(req.method==="PUT"){


await supabase
.from("rambu")
.update(req.body)
.eq("id",req.query.id)


return res.json({
status:"update"
})


}


}