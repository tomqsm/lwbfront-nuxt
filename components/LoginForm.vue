<template>
  <b-container fluid class="bv-example-row">
    <b-row><p v-t="'login.disclaimer'"></p></b-row>
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
              v-model.trim="form.email"
              type="email"
              :placeholder="$t('login.email-placeholder')"
              :state="validateState('email')"
              @blur="validationTouch('email')"
            ></b-form-input>
            <b-form-invalid-feedback :state="$v.form.email.$error">
              <span v-if="!$v.form.email.email">{{
                $t('login.validation.email.email')
              }}</span>
              <span v-if="!$v.form.email.required && testRequiredEmail">
                {{ $t('login.validation.email.required') }}
              </span>
              <i18n
                v-if="!$v.form.email.maxLength"
                path="login.validation.email.maxLength"
                tag="span"
              >
                <template #maxlength>{{
                  $v.form.email.$params.maxLength.max
                }}</template>
              </i18n>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            :label="$t('login.password-label')"
            label-for="form-password"
            :description="passwordDescription"
          >
            <b-form-input
              id="form-password"
              v-model.trim="form.password"
              type="password"
              :placeholder="$t('login.password-placeholder')"
              :state="validateState('password')"
              @blur="validationTouch('password')"
            ></b-form-input>
            <b-form-invalid-feedback :state="$v.form.password.$error">
              <span v-if="!$v.form.password.required && testRequiredPassword">
                {{ $t('login.validation.password.required') }}
              </span>
              <span
                v-if="!$v.form.password.minLength"
                v-t="{
                  path: 'login.validation.password.minLength',
                  args: {
                    minlength: $v.form.password.$params.minLength.min
                  }
                }"
              ></span>

              <i18n
                v-if="!$v.form.password.maxLength"
                path="login.validation.password.maxLength"
                tag="span"
              >
                <template #maxlength>{{
                  $v.form.password.$params.maxLength.max
                }}</template>
              </i18n>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-button
            :disabled="$v.$invalid"
            type="submit"
            variant="outline-primary"
            >Submit</b-button
          >
          <b-button type="reset" variant="danger">Reset</b-button>
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
      testRequiredPassword: false,
      form: {
        email: '',
        password: '',
        food: null,
        checked: []
      }
    }
  },
  computed: {
    passwordDescription() {
      return this.$t('login.password-description', {
        minlength: this.$v.form.password.$params.minLength.min,
        maxlength: this.$v.form.password.$params.maxLength.max
      })
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.password = ''
      this.testRequiredEmail = false
      this.testRequiredPassword = false
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    validationTouch(name) {
      const { $touch, $model } = this.$v.form[name]
      if (name === 'email') {
        this.testRequiredEmail = true
      } else if (
        name === 'password' &&
        $model &&
        $model.toString().length >
          0 /* helps to skip error mesges when you enter the field and then press reset */
      ) {
        this.testRequiredPassword = true
      }
      $touch()
    }
  },
  validations: {
    form: {
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
}
</script>