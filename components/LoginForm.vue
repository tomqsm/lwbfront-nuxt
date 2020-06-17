<template>
  <div>
    <b-form v-if="show" novalidate @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        :label="this.$t('login.email-label')"
        label-for="email"
        :description="this.$t('login.email-description')"
      >
        <b-form-input
          id="form.email"
          v-model="form.email"
          type="email"
          :placeholder="this.$t('login.email-placeholder')"
          :state="validateState('email')"
          @blur="validationTouch('email')"
        ></b-form-input>
        <b-form-invalid-feedback :state="$v.form.email.$error">
          <span v-if="!$v.form.email.email">
            {{ $t('login.validation.email') }}
          </span>
          <span v-if="!$v.form.email.required && testRequiredEmail">{{
            $t('login.validation.required')
          }}</span>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group id="checkboxes-4" v-model="form.checked">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  data() {
    return {
      testRequiredEmail: false,
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots',
        'Beans',
        'Tomatoes',
        'Corn'
      ],
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.testRequiredEmail = false
      this.$nextTick(() => {
        this.show = true
        this.$v.$reset()
      })
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    validationTouch(name) {
      const { $touch } = this.$v.form[name]
      this.testRequiredEmail = true
      $touch()
    }
  },
  validations: {
    form: {
      email: {
        email,
        required
      }
    }
  }
}
</script>
