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
                    || ($v.password.$dirty && !$v.password.minLength)
            }"
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
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">Name</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
         Enter your name
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>I agree with rules</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Registration
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Do you have account?
        <router-link to="/login">Sign In!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
    name: { required },
    agree: { checked: (v) => v },
  },

  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        // eslint-disable-next-line no-useless-return
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      console.log(formData);

      this.$router.push('/');
    },
  },
};
</script>
