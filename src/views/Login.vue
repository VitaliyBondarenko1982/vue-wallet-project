<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Home accounting</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{
              invalid: ($v.email.$dirty && !$v.email.required)
                    || ($v.email.$dirty && !$v.email.email)
            }"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="($v.email.$dirty && !$v.email.required)"
        >
          Field email don't have be empty
        </small>
        <small
          class="helper-text invalid"
          v-else-if="($v.email.$dirty && !$v.email.email)"
        >
          Email address incorrect
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{
              invalid: ($v.password.$dirty && !$v.password.required)
                    || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="($v.password.$dirty && !$v.password.required)"
        >
          Enter password
        </small>
        <small
          class="helper-text invalid"
          v-else-if="($v.password.$dirty && !$v.password.minLength)"
        >
          Password should be not less then
          {{$v.password.$params.minLength.min}} symbols.
           Now it {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Sign in
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        You don't have an account?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import messages from '../utils/messages';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
  }),

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
  },

  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },

  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      console.log(formData);

      this.$router.push('/');
    },
  },
};
</script>
