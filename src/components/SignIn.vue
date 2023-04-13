<template>
	<div class="signInComponent">
		<v-row class="mb-2">
			<v-sheet width="500" class="mx-auto">
				<Title content="Sign in form"></Title>
				<v-form @submit.prevent="submitForm">
					<div class="form-control">
						<v-text-field label="Login" v-model.trim="login.val" id="login-input"
							@blur="clearValidity('login')"></v-text-field>
						<v-alert v-if="!login.isValid && !formIsValid" text="Login must have a valid value!"
							color="error"></v-alert>
					</div>
					<div class="form-control">
						<v-text-field type="password" label="Password" v-model.trim="password.val" id="password-input"
							@blur="clearValidity('password')"></v-text-field>
						<v-alert v-if="!password.isValid && !formIsValid" text="Password must have 6 or more characters!"
							color="error"></v-alert>
					</div>
					<div class="form-control">
						<v-btn :disabled="isLoading" variant="flat" color="primary" type="submit" style="width: 100%;">
							Sign in
						</v-btn>
					</div>
					<v-divider />
					<div class="form-control" style="display: flex; flex-direction: row;justify-content: center;">
						<p>
							Don't have an account? <RouterLink to="/signup">Click here to sign up</RouterLink>
						</p>
					</div>
				</v-form>

				<Overlay v-model="isLoading" :loading="isLoading"></Overlay>
			</v-sheet>
		</v-row>
	</div>
</template>

<script lang="ts">
import Overlay from "@/components/overlay/Overlay.vue";
import { defineComponent, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Title from "../components/Title.vue";
import { validateEmail } from "@/views/EmailValidation";

export default defineComponent({
	components: {
		Title,
		Overlay
	},
	setup() {
		const login: Ref<{ val: string, isValid: boolean }> = ref({ val: '', isValid: true });
		const password: Ref<{ val: string, isValid: boolean }> = ref({ val: '', isValid: true });
		const formIsValid: Ref<boolean> = ref(true);
		const isLoading: Ref<boolean> = ref(false);
		const router = useRouter();
		const store = useStore();

		function validateForm() {
			formIsValid.value = true;
			if (login.value.val.length === 0 || !validateEmail(login.value.val)) {
				login.value.isValid = false;
				formIsValid.value = false;
			}

			if (password.value.val.length < 6) {
				password.value.isValid = false;
				formIsValid.value = false;
			}

		}

		const clearValidity = (input: string): void => {
			eval(input).value.isValid = true;
		}


		const submitForm = async (): Promise<void> => {
			try {
				validateForm();

				if (formIsValid.value === true) {
					isLoading.value = true;

					const data = {
						email: login.value.val,
						password: password.value.val,
					}

					await store.dispatch('login', data);

					isLoading.value = false;
					router.replace('/discovery');
				}
			} catch (error) {
				isLoading.value = false;
				console.error("It not possible logged you in.", error);
				alert("It not possible logged you in.");
			}

		}

		return {
			login,
			password,
			formIsValid,
			isLoading,
			submitForm,
			clearValidity
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
