<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
const authStore = useAuthStore();
import { useMessageStore } from "@/stores/message";
const messageStore = useMessageStore();

const validationSchema = yup.object({
  username: yup.string().required("The username is required"),
  firstname: yup.string().required("The firstname is required"),
  lastname: yup.string().required("The lastname is required"),
  email: yup.string().required("The email is required"),
  password: yup.string().required("The password is required"),
});

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  },
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");
const { value: username } = useField<string>("username");
const { value: firstname } = useField<string>("firstname");
const { value: lastname } = useField<string>("lastname");

const onSubmit = handleSubmit((values) => {
  authStore
    .register(values.email, values.password, values.username, values.firstname, values.lastname)
    .then(() => {
      router.push({ name: "event-list" });
    })
    .catch(() => {
      messageStore.updateMessage("could not register");
      setTimeout(() => {
        messageStore.resetMessage();
      }, 3000);
    });
});
</script>
<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Register
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label
            for="username"
            class="block text-left text-sm font-medium leading-6 text-gray-900"
            >User name</label
          >
          <inputText
            type="text"
            v-model="username"
            :error="errors['username']"
          ></inputText>
        </div>
        <div>
          <label
            for="firstname"
            class="block text-left text-sm font-medium leading-6 text-gray-900"
            >First name</label
          >
          <inputText
            type="text"
            v-model="firstname"
            :error="errors['firstname']"
          ></inputText>
        </div>
        <div>
          <label
            for="lastname"
            class="block text-left text-sm font-medium leading-6 text-gray-900"
            >Lastname</label
          >
          <inputText
            type="text"
            v-model="lastname"
            :error="errors['lastname']"
          ></inputText>
        </div>
        <div>
          <label
            for="email"
            class="block text-left text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <inputText
            type="text"
            v-model="email"
            :error="errors['email']"
          ></inputText>
        </div>
        <div>
          <div class="flex items-cenindigoter justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <inputText
            type="password"
            v-model="password"
            :error="errors['password']"
          ></inputText>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member? {{ ""
        }}<a
          href="#"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Try to register here</a
        >
      </p>
    </div>
  </div>
</template>
