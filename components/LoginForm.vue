<template>
  <b-container fluid class="bv-example-row">
    <b-row>
      <p v-t="'login.disclaimer'"></p>
    </b-row>
    <b-row>
      <b-col md="6" offset-md="3">
        <b-form novalidate @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-1"
            :label="$t('login.email-label')"
            label-for="email"
            :description="$t('login.email-description')"
          >
            <b-form-input
              id="form-email"
              v-model.trim="email"
              type="email"
              :placeholder="$t('login.email-placeholder')"
              :state="validateState('email')"
              @keyup="validationTouch('email')"
            ></b-form-input>
            <b-form-invalid-feedback :state="$v.email.$error">
              <span v-if="!$v.email.email">
                {{ $t('login.validation.email.email') }}
              </span>
              <span v-if="!$v.email.required && testRequiredEmail">{{
                $t('login.validation.email.required')
              }}</span>
              <i18n
                v-if="!$v.email.maxLength"
                path="login.validation.email.maxLength"
                tag="span"
              >
                <template #maxlength>
                  {{ $v.email.$params.maxLength.max }}
                </template>
              </i18n>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            :label="$t('login.password-label')"
            label-for="form-password"
          >
            <b-form-input
              id="form-password"
              v-model.trim="password"
              type="password"
              :placeholder="$t('login.password-placeholder')"
              :state="validateState('password')"
              @keyup="validationTouch('password')"
            ></b-form-input>
            <b-form-invalid-feedback :state="$v.password.$error">
              <span v-if="!$v.password.required && testRequiredPassword">{{
                $t('login.validation.password.required')
              }}</span>
              <span
                v-if="!$v.password.minLength"
                v-t="{
                  path: 'login.validation.password.minLength',
                  args: {
                    minlength: $v.password.$params.minLength.min
                  }
                }"
              ></span>

              <i18n
                v-if="!$v.password.maxLength"
                path="login.validation.password.maxLength"
                tag="span"
              >
                <template #maxlength>
                  {{ $v.password.$params.maxLength.max }}
                </template>
              </i18n>
            </b-form-invalid-feedback>
          </b-form-group>
          <div class="buttons mt-4">
            <b-button
              :disabled="$v.$invalid"
              type="submit"
              variant="outline-primary"
              >Submit</b-button
            >
            <b-button type="reset" variant="danger">Reset</b-button>
          </div>
        </b-form>
        <b-card v-if="false" class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  data() {
    return {
      testRequiredEmail: false,
      testRequiredPassword: false
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.state.users.email
      },
      set(value) {
        this.$store.commit('users/setEmail', value)
      }
    },
    password: {
      get() {
        return this.$store.state.users.password
      },
      set(value) {
        this.$store.commit('users/setPassword', value)
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.$store
        .dispatch('users/signInWithEmailAndPassword', {
          email: this.email,
          password: this.password
        })
        .then((user) => {
          this.$store.commit('users/setUser', user, { module: 'users' })
          this.$router.push(this.$i18n.path('admin'))
        })
        .catch((e) => console.log(e))
    },
    onReset(evt) {
      evt.preventDefault()
      this.email = ''
      this.password = ''
      this.testRequiredEmail = false
      this.testRequiredPassword = false
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    validateState(name) {
      const { $dirty, $error } = this.$v[name]
      return $dirty ? !$error : null
    },
    validationTouch(name) {
      const { $touch } = this.$v[name]
      if (name === 'email') {
        this.testRequiredEmail = true
      } else if (name === 'password') {
        this.testRequiredPassword = true
      }
      $touch()
    }
  },
  validations: {
    email: {
      email,
      required,
      maxLength: maxLength(50)
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(16)
    }
  }
}
</script>
