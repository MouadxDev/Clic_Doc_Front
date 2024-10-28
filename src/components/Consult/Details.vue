<script setup lang="ts">
import { Ref, onBeforeMount, reactive, ref } from 'vue';
import { Consultation } from '../../../core/Clients/Consult';
import { useConsultStore } from '../../../core/Data/stores/consultation';

const client = new Consultation();
const consult = useConsultStore();
const consultation : Ref<any> = ref({
    motif : [],
    isPrivate:false,
    isFinished:false,
})

const liste_motifs = reactive([ 
        {label:"Acné persistante ou sévère",value:"Acné persistante ou sévère"},
        {label:"Démangeaisons cutanées inexpliquées.",value:"Démangeaisons cutanées inexpliquées."},
        {label:"Éruptions cutanées soudaines ou fréquentes.",value:"Éruptions cutanées soudaines ou fréquentes."},
        {label:"Changements dans la couleur, la taille ou la forme des grains de beauté.",value:"Changements dans la couleur, la taille ou la forme des grains de beauté."},
        {label:"Taches sombres ou taches de vieillesse.",value:"Taches sombres ou taches de vieillesse."},
        {label:"Rougeurs, chaleur ou sensibilité cutanée anormales.",value:"Rougeurs, chaleur ou sensibilité cutanée anormales."},
        {label:"Perte de cheveux excessive ou amincissement des cheveux.",value:"Perte de cheveux excessive ou amincissement des cheveux."},
        {label:"Ongles anormaux, cassants ou décolorés.",value:"Ongles anormaux, cassants ou décolorés."},
        {label:"Infection cutanée, abcès ou furoncle.",value:"Infection cutanée, abcès ou furoncle."},
        {label:"Verrues persistantes ou verrues génitales.",value:"Verrues persistantes ou verrues génitales."},
        {label:"Présence de boutons, de nodules ou de kystes sous la peau.",value:"Présence de boutons, de nodules ou de kystes sous la peau."},
        {label:"Peau sèche, rugueuse ou squameuse.",value:"Peau sèche, rugueuse ou squameuse."},
        {label:"Cicatrices",value:"Cicatrices"},
        {label:"Rougeurs et irritations",value:"Rougeurs et irritations"},
        {label:"Problèmes de pigmentation",value:"Problèmes de pigmentation"},
        {label:"Allergies cutanées ou réactions cutanées aux produits cosmétiques.",value:"Allergies cutanées ou réactions cutanées aux produits cosmétiques."},
        {label:"Mauvaises réactions aux médicaments topiques.",value:"Mauvaises réactions aux médicaments topiques."},
        {label:"Taches blanches sur la peau.",value:"Taches blanches sur la peau."},
        {label:"Problèmes pédiatrique.",value:"Problèmes pédiatrique."},
        {label:"Autres ",value:"Autres"}
])

const more : Ref<any> = ref("");

async function addMore(){
    consultation.value.motif.push(more.value)
    liste_motifs.push({label:more.value,value:more.value})
    var index = consultation.value.motif.indexOf("Autres");
    if (index !== -1) {
        consultation.value.motif.splice(index, 1);
    }
    await setConsult()
}

async function getConsultation(){
    const data =  await client.getOne(consult.consult);
    return data.data.deets;
}

async function setConsult(){
    await client.update({id:consult.consult,motif:JSON.stringify(consultation.value.motif),isFinished:consultation.value.isFinished,isPrivate:consultation.value.isPrivate})
    consultation.value=await getConsultation()
    consultation.value.motif = JSON.parse(consultation.value.motif)
}

onBeforeMount(async()=>{
    consultation.value=await getConsultation()
    consultation.value.motif = JSON.parse(consultation.value.motif)
    var result : any =[]
    for(var i = 0 ; i<consultation.value.motif.length ; i++)
    {
        result = liste_motifs.filter((word) => word.value == consultation.value.motif[i] );
        if(result.length == 0)
        {
            liste_motifs.push({label:consultation.value.motif[i],value:consultation.value.motif[i]})
        }
        console.log(result)
    }
    
})

</script>
<template>
    <div class="container">
        <el-form label-position="top">
            <el-form-item label="Motifs">
                <el-select-v2
                    v-model="consultation.motif"
                    :options="liste_motifs"
                    placeholder="Selectionner"
                    multiple
                    class="w-full"
                    clearable
                    @change="async ()=>{await setConsult()}"
                    :disabled="!consult.edit"
                />
            </el-form-item>
            <el-form-item v-if="consultation.motif.includes('Autres')" >
                <el-input v-model="more" placeholder="Ajoutez le motif" >
                    <template #append>
                        <el-button size="small"  @click="addMore()"> Ajouter</el-button>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>