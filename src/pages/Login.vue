<script setup lang="ts">
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router'
    import { Auth } from '../../core/Clients/Auth';

    const router = useRouter();
    const authService = new Auth();
    const credentials = reactive({
        email:"",
        password:""
    })

    async function login()
    {
        const response = await authService.login(credentials)
       
        if(response.status==200)
        {
            router.push("/")
        }
    }

</script>

<template>
    <div class="background w-screen h-screen">
        <div class="hero h-screen ">
            <div class="hero-content w-96 ">
                <el-card class="box-card">
                    <div class="w-72 mb-3 text-center">
                        <img src="/logo.png"  alt="mSpace" class=" w-12 h-12 mx-auto"> 
                    </div>
                    <hr class="my-4">
                        <div class="font-semibold text-xl text-center"> Connexion  </div>
                    <hr class="my-4">
                    <el-form class="w-full"  :label-position="'top'"  label-width="200px" :model="credentials" >
                        <el-form-item >
                            <el-input placeholder="Nom d'utilisateur / email" size="large" v-model="credentials.email"  />
                        </el-form-item>
                        <el-form-item >
                            <el-input placeholder="Mot de passe" size="large" type="password" v-model="credentials.password"/>
                        </el-form-item>
                        <el-form-item >
							<button class="background-clickdoc btn btn-block" type="button"  @click="login()">
								<el-icon >
									<Right />
								</el-icon> &nbsp; Se connecter
							</button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>
</template>