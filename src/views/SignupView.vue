<template>
    <div class="signInComponent">

        <v-sheet width="500" class="mx-auto">
            <v-btn variant="text" color="primary" type="button" @click="goBack">
                &lt; Back
            </v-btn>
            <Title content="SIGN UP Form"></Title>
            <v-form @submit.prevent="submitForm">
                <div class="form-control">
                    <v-text-field type="email" label="Login" v-model.trim="login.val" id="login-input"
                        @blur="clearValidity('login')"></v-text-field>
                    <v-alert v-if="!login.isValid && !formIsValid" text="E-mail must have a valid value!"
                        color="error"></v-alert>
                    <v-alert v-if="login.alreadyExists && !formIsValid"
                        text="This e-mail already have been chosen, please pick another one!" color="error"></v-alert>

                </div>
                <div class="form-control">
                    <v-text-field type="password" label="Password" v-model.trim="password.val" id="password-input"
                        @blur="clearValidity('password')"></v-text-field>
                    <v-alert v-if="!password.isValid && !formIsValid" text="Password must have 6 or more characters!"
                        color="error"></v-alert>
                </div>
                <div class="form-control">

                    <v-text-field type="password" label="Password Confirmation" v-model.trim="passwordConfirmation.val"
                        id="passwordConfirmation-input" @blur="clearValidity('password')"></v-text-field>
                    <v-alert v-if="!passwordConfirmation.isValid && !formIsValid" text="Passwords doesn't match each other!"
                        color="error"></v-alert>
                </div>

                <div class="form-control">
                    <v-btn :disabled="isLoading" variant="flat" color="primary" type="submit" style="width: 100%;">
                        Sign up
                    </v-btn>
                </div>

            </v-form>

            <Overlay v-model="isLoading" :loading="isLoading"></Overlay>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import Overlay from "@/components/overlay/Overlay.vue";
import { defineComponent, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Title from "../components/Title.vue";
import { validateEmail } from './EmailValidation';

export default defineComponent({
    components: {
        Title,
        Overlay
    },
    props: {
        content: { type: String, required: true, default: '' },
        shouldShowFilters: { type: Boolean, required: false, default: false },
    },

    setup() {
        const router = useRouter();
        const store = useStore();

        const password: Ref<{ val: string, isValid: boolean }> = ref({ val: '', isValid: true });
        const login: Ref<{ val: string, isValid: boolean, alreadyExists: boolean }> = ref({ val: '', isValid: true, alreadyExists: false });
        const passwordConfirmation: Ref<{ val: string, isValid: boolean }> = ref({ val: '', isValid: true });
        const formIsValid: Ref<boolean> = ref(true);
        const isLoading: Ref<boolean> = ref(false);

        async function validateForm() {
            formIsValid.value = true;

            if (login.value.val.length === 0 || !validateEmail(login.value.val)) {
                login.value.isValid = false;
                formIsValid.value = false;
                isLoading.value = false;
            }

            if (password.value.val.length < 6) {
                password.value.isValid = false;
                formIsValid.value = false;
                isLoading.value = false;
            }

            if (password.value.val !== passwordConfirmation.value.val) {
                passwordConfirmation.value.isValid = false;
                formIsValid.value = false;
                isLoading.value = false;
            }
        }

        const clearValidity = (input: string): void => {
            eval(input).value.isValid = true;
            eval(input).value.alreadyExists = false;
        }

        const submitForm = async (): Promise<void> => {
            isLoading.value = true;
            await validateForm();

            try {
                if (formIsValid.value === true) {

                    const data = {
                        email: login.value.val,
                        password: password.value.val,
                        mode: 'signup'
                    }

                    await store.dispatch(data.mode, data);

                    isLoading.value = false;
                    router.replace('/discovery');
                }
            } catch (error) {
                isLoading.value = false;
                console.error("It not possible logged you in.", error);
                alert("It not possible logged you in.");
            }

        }

        function goBack(): void {
            router.back();
        }

        return {
            password,
            passwordConfirmation,
            login,
            formIsValid,
            isLoading,
            submitForm,
            clearValidity,
            goBack,
        }
    },

});
</script>

<style scoped>
.form-control {
    margin: 15px 0px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

.invalid p,
.invalid label {
    color: red;
}

.invalid input {
    border: 1px solid red;
}
</style>
