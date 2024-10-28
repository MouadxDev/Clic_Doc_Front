<script setup lang="ts">
    import { Ref , onBeforeMount, ref } from "vue";
    import {useConsultStore} from "../../../core/Data/stores/consultation"
    import { ExamenPhysique } from '../../../core/Clients/Examen';

    const consult = useConsultStore();
    const examenClient = new ExamenPhysique()

    const data_visage = [
        {label:"Acné",value:"Acné"},
        {label:"Rosacée",value:"Rosacée"},
        {label:"Eczéma",value:"Eczéma"},
        {label:"Dermatite de contact",value:"Dermatite de contact"},
        {label:"Psoriasis Urticaire Verrues",value:"Psoriasis Urticaire Verrues"},
        {label:"Herpès labial",value:"Herpès labial"},
        {label:"Taches de vieillesse",value:"Taches de vieillesse"},
        {label:"Taches de rousseur",value:"Taches de rousseur"},
        {label:"Milium Angiome stellaire",value:"Milium Angiome stellaire"},
        {label:"Kératose actinique",value:"Kératose actinique"},
        {label:"Comédons",value:"Comédons"},
        {label:"Pétéchies",value:"Pétéchies"},
        {label:"Hyperpigmentation",value:"Hyperpigmentation"},
        {label:"Hypopigmentation",value:"Hypopigmentation"}
    ]
    const data_corps  = [
        {label:"Eczéma",value:"Eczéma"},
        {label:"Dermatite de contact",value:"Dermatite de contact"},
        {label:"Psoriasis",value:"Psoriasis"},
        {label:"Urticaire",value:"Urticaire"},
        {label:"Verrues",value:"Verrues"},
        {label:"Molluscum contagiosum",value:"Molluscum contagiosum"},
        {label:"Pityriasis rosé de Gibert",value:"Pityriasis rosé de Gibert"},
        {label:"Impétigo",value:"Impétigo"},
        {label:"Mycose de la peau (dermatophytose)",value:"Mycose de la peau (dermatophytose)"},
        {label:"Infections bactériennes de la peau",value:"Infections bactériennes de la peau"},
        {label:"Cellulite",value:"Cellulite"},
        {label:"Furoncles et anthrax",value:"Furoncles et anthrax"},
        {label:"Folliculite",value:"Folliculite"},
        {label:"Lipome",value:"Lipome"},
        {label:"Kystes épidermiques",value:"Kystes épidermiques"},
        {label:"Hidradénite suppurée",value:"Hidradénite suppurée"},
        {label:"Pétéchies",value:"Pétéchies"},
        {label:"Érythème polymorphe",value:"Érythème polymorphe"},
        {label:"Syndrome de Stevens-Johnson",value:"Syndrome de Stevens-Johnson"}
    ]
    const data_ongles = [
        {label:"Onychomycose",value:"Onychomycose"},
        {label:"Paronychie",value:"Paronychie"},
        {label:"Onycholyse",value:"Onycholyse"},
        {label:"Onychogryphose",value:"Onychogryphose"},
        {label:"Onychomadèse",value:"Onychomadèse"},
        {label:"Leuconychie",value:"Leuconychie"},
        {label:"Pachyonychie",value:"Pachyonychie"},
        {label:"Onychorrhexie",value:"Onychorrhexie"},
        {label:"Onychoschizie",value:"Onychoschizie"},
        {label:"Onychomadesis",value:"Onychomadesis"},
        {label:"Koïlonychie",value:"Koïlonychie"},
        {label:"Onychauxis",value:"Onychauxis"},
        {label:"Onychite",value:"Onychite"},
        {label:"Hématome sous-unguéal",value:"Hématome sous-unguéal"},
        {label:"Onychocryptose (ongle incarné)",value:"Onychocryptose (ongle incarné)"},
        {label:"Onychophagie (rongement des ongles)",value:"Onychophagie (rongement des ongles)"},
        {label:"Onychotillomanie (arrachement compulsif des ongles)",value:"Onychotillomanie (arrachement compulsif des ongles)"},
        {label:"Trou d'épingle",value:"Trou d'épingle"},
        {label:"Lignes de Beau Pitting",value:"Lignes de Beau Pitting"},
        ]
    const data_cheveux= [
        {label:"Alopécie",value:"Alopécie"},
        {label:"Pellicules (dermatite séborrhéique)",value:"Pellicules (dermatite séborrhéique)"},
        {label:"Calvitie (alopécie androgénétique)",value:"Calvitie (alopécie androgénétique)"},
        {label:"Alopécie areata",value:"Alopécie areata"},
        {label:"Traction alopécie",value:"Traction alopécie"},
        {label:"Perte de cheveux due au stress (effluvium télogène)",value:"Perte de cheveux due au stress (effluvium télogène)"},
        {label:"Perte de cheveux due à la chimiothérapie",value:"Perte de cheveux due à la chimiothérapie"},
        {label:"Alopécie cicatricielle",value:"Alopécie cicatricielle"},
        {label:"Poux de tête (pédiculose capitis)",value:"Poux de tête (pédiculose capitis)"},
        {label:"Trichotillomanie (arrachement compulsif des cheveux)",value:"Trichotillomanie (arrachement compulsif des cheveux)"},
        {label:"Perte de cheveux due à une carence nutritionnelle",value:"Perte de cheveux due à une carence nutritionnelle"},
        {label:"Alopécie de la couronne (effluvium anagène)",value:"Alopécie de la couronne (effluvium anagène)"},
        {label:"Perte de cheveux due à une maladie du cuir chevelu",value:"Perte de cheveux due à une maladie du cuir chevelu"},
        {label:"Hypertrichose",value:"Hypertrichose"},
        {label:"Perte de cheveux due à une maladie systémique",value:"Perte de cheveux due à une maladie systémique"},
        {label:"Perte de cheveux due à des médicaments",value:"Perte de cheveux due à des médicaments"},
        {label:"Perte de cheveux liée à l'âge",value:"Perte de cheveux liée à l'âge"},
        {label:"Cheveux cassants et fragiles",value:"Cheveux cassants et fragiles"},
        {label:"Chute de cheveux saisonnière",value:"Chute de cheveux saisonnière"},
        {label:"Cheveux gras (séborrhée)",value:"Cheveux gras (séborrhée)"}
    ]
    const examen : Ref<any> = ref({})

    async function getExamenPhysique(){
        const data :any =  await examenClient.getByID(consult.examen_id)
        return {
            id:data.id,
            hair : JSON.parse(data.hair),
            nails : JSON.parse(data.nails),
            face : JSON.parse(data.face),
            body : JSON.parse(data.body)
        }
    }
    async function setExamenPhysique(){
        await examenClient.update(examen.value)
        examen.value = await getExamenPhysique()
    }

    onBeforeMount(async ()=>{
        examen.value = await getExamenPhysique()
    })
</script>

<template>
    <el-form label-position="top">
        <el-form-item label="Visage">
            <el-select-v2
                v-model="examen.face"
                :options="data_visage"
                placeholder="Selectionner"
                multiple
                class="w-full"
                clearable
                @change="async ()=>{await setExamenPhysique()}"
                :disabled="!consult.edit"
            />
        </el-form-item>
        <el-form-item label="Corps">
            <el-select-v2
                v-model="examen.body"
                :options="data_corps"
                placeholder="Selectionner"
                multiple
                class="w-full"
                clearable
                @change="async()=>{await setExamenPhysique()} "
                :disabled="!consult.edit"
            />
        </el-form-item>
        <el-form-item label="Ongles">
            <el-select-v2
                v-model="examen.nails"
                :options="data_ongles"
                placeholder="Selectionner"
                multiple
                class="w-full"
                clearable
                @change="async ()=>{await setExamenPhysique()}"
                :disabled="!consult.edit"
            />
        </el-form-item>
        <el-form-item label="Cheveux">
            <el-select-v2
                v-model="examen.hair"
                :options="data_cheveux"
                placeholder="Selectionner"
                multiple
                class="w-full"
                clearable
                @change="async ()=>{await setExamenPhysique()}"
                :disabled="!consult.edit"
            />
        </el-form-item>
    </el-form>
</template>