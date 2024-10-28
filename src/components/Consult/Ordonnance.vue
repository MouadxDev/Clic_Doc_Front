<script setup lang="ts">

import { Ref , onBeforeMount, ref } from "vue";
import {useConsultStore} from "../../../core/Data/stores/consultation"
import { Ordonnance } from '../../../core/Clients/Ordonnance';
import { Medicament } from '../../../core/Clients/Medicament';
import ENV from '../../../core/env'

const consult = useConsultStore();
const ordonnanceClient = new Ordonnance()
const medicamentClient = new Medicament()
const medicaments : Ref<any> = ref([])

const prescription : Ref<any> = ref({
    consultation_id:consult.consult,
    commentaire:"",
    medicament_id:"",
    dose_id:"",
})

async function getOrdonnance(){
    return  await ordonnanceClient.getByID(consult.consult)
}


const ordonnance : Ref<any> = ref([])
const doses : Ref<any> = ref([])

async function setOrdonnance() {
    await ordonnanceClient.add(prescription.value)
    ordonnance.value = await getOrdonnance()
    prescription.value.medicament_id=""
    prescription.value.dose_id=""
    prescription.value.commentaire=""
    doses.value=[]
}

async function removeOrdonnance(x:number) {
    if(confirm('êtes vous sur de vouloir supprimer cet element')==true )
    {
        await ordonnanceClient.delete(x) 
    }
    ordonnance.value = await getOrdonnance()
}

onBeforeMount(async()=>{
    medicaments.value = await medicamentClient.getAll();
    ordonnance.value = await getOrdonnance()
})
</script>
<template>
    <div class="container">
        <el-form label-position="top" >
            <el-row :gutter="10" >
                <el-col :span="14">
                    <el-form-item label="Medicament">
                        <el-select class="w-full" v-model="prescription.medicament_id" @change="async () => { doses = await medicamentClient.getByID(prescription.medicament_id)  }" >
                            <el-option 
                                v-for="m in medicaments"
                                :key="m.id"
                                :value="m.id"
                                :label="m.nom"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="Posologie (fois/jour)">
                        <el-input v-model="prescription.posologie" />
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label=" &nbsp ">
                        <el-button @click="async ()=>{await setOrdonnance()}" class="btn btn-sm btn-block background-clickdoc" type="button"> <el-icon><Select /></el-icon> </el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <hr class="my-3">
        <el-table :data="ordonnance" :border="true">
            <el-table-column label="Médicament">
                <template #default="scope">
                    {{ scope.row.medicament }} 
                </template>
            </el-table-column>
            <el-table-column label="Posologie" prop="posologie"  />
            <el-table-column width="50px">
                <template #default="scope">
                    <el-button class="btn btn-sm btn-danger background-clickdoc" type="button" @click="async ()=>{ await removeOrdonnance(scope.row.id) }"><el-icon><Delete/></el-icon></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="text-right">
            <a class="btn btn-sm btn-link" target="_blank" :href="ENV.VITE_BACKEND+'/ordonnance/'+consult.consult"> <el-icon> <Printer/></el-icon> Imprimer </a>
        </div>
    </div>
    
</template>