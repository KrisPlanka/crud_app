<template>
  <div>
    <h1 class="heading">Create User</h1>
    <form class="form" @submit.prevent="createUser">
        <div class="form__item">
          <label for="firstName" class="form__label">First Name</label>
          <input placeholder="First Name" type="text" class="form__control" id="firstName" v-model="firstName">
        </div>
        <div class="form__item">
          <label for="lastName" class="form__label">Last Name</label>
          <input placeholder="Last Name" type="text" class="form__control" id="lastName" v-model="lastName">
        </div>
        <div class="form__item">
          <label for="email" class="form__label">Email</label>
          <input placeholder="Email" type="email" class="form__control" id="email" v-model="email">
        </div>
        <div class="form__item">
          <label for="phoneNumber" class="form__label">Phone Number</label>
          <input placeholder="099-999-99-99" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" class="form__control" id="phoneNumber" v-model="phoneNumber">
        </div>
        <button type="submit" class="btn">Create User</button>
      </form>
      <a href="#/" class="btn">Back to users</a>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    }
  },
  methods: {
    isValidDate(tel,) {
      const currentDate = new Date();
      const inputDate = new Date(startDate);
      const inputEndDate = new Date (endDate)
      return (inputDate > currentDate) && (inputEndDate > inputDate);
    },
    createUser() {
      const user = {
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        email: this.email.trim(),
        phoneNumber: this.phoneNumber.trim()
      };

      axios.post('http://localhost:3000/users', user)
          .then(response => {
            console.log(response);
            alert(`Added a new user - ${user.firstName}!`)
          })
          .catch(error => {
            console.error(error);
            alert('You must fild all fields!')
          });

          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.phoneNumber = "";
    }
  }
}
</script>
<style lang="scss">
  .form {
    border: 1px solid;
    padding: 24px;
    border-radius: 5px;
    max-width: 420px;
    margin-bottom: 48px;

    @media screen and (max-width: 428px) {
      padding: 24px 12px;
    }

    &__item {
      margin-bottom: 12px;
    }

    &__label {
      color: var(--color-text);
      display: block;
    }

    &__control {
      height: 32px;
      padding-left: 12px;
      max-width: 380px;
      width: 100%;
    }
  }
</style>
