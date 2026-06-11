<template>

<div>

<h3>Input Rambu</h3>


<input
class="form-control mb-2"
v-model="form.nama_rambu"
placeholder="Nama Rambu"
/>


<input
class="form-control mb-2"
v-model="form.lokasi_daerah"
placeholder="Lokasi Daerah"
/>


<input
class="form-control mb-2"
v-model="form.latitude"
placeholder="Latitude"
/>


<input
class="form-control mb-2"
v-model="form.longitude"
placeholder="Longitude"
/>


<input
type="file"
class="form-control mb-2"
@change="uploadFoto"
/>



<img
v-if="preview"
:src="preview"
width="120"
class="mb-2"
/>



<button
class="btn btn-primary"
@click="simpan"
>
Simpan
</button>


</div>

</template>



<script setup>

import {ref,watch} from "vue"
import axios from "axios"
import { supabase } from "../supabase"



const props=defineProps({
dataEdit:Object
})



const form=ref({

nama_rambu:"",
lokasi_daerah:"",
latitude:"",
longitude:"",
foto:""

})



const preview=ref("")



watch(
()=>props.dataEdit,
(val)=>{

if(val){

form.value={...val}

preview.value=val.foto

}

})




const API = import.meta.env.VITE_API_URL



// UPLOAD FOTO SUPABASE

async function uploadFoto(e){


const file=e.target.files[0]


if(!file) return



const namaFile =
Date.now()+"-"+file.name



const {data,error}=await supabase
.storage
.from("foto-rambu")
.upload(
namaFile,
file
)



if(error){

console.log("UPLOAD ERROR DETAIL:", error)

alert(JSON.stringify(error))

return

}




const url =
supabase
.storage
.from("foto-rambu")
.getPublicUrl(namaFile)
.data.publicUrl



form.value.foto=url


preview.value=url



console.log(
"URL FOTO:",
url
)



}




// SIMPAN DATA

async function simpan(){


try{


if(props.dataEdit){


await axios.put(
API+"/rambu?id="+props.dataEdit.id,
form.value
)



}else{


await axios.post(
API+"/rambu",
form.value
)


}



alert("Berhasil")

location.reload()



}catch(error){


console.log(
error.response?.data
)


alert("Gagal simpan")


}


}



</script>