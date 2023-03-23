<template>
  <div class="container">
    <h1 class="heading">
      User Page
    </h1>
    <div class="user-block" v-if="user">
      <div class="user-block__info">
        <p class="user-block__text"><span class="user-block__text-accent">First Name: </span>{{ user.firstName }}</p>
        <p class="user-block__text"><span class="user-block__text-accent">Last Name: </span>{{ user.lastName }}</p>
        <p class="user-block__text"><span class="user-block__text-accent">Email: </span>{{ user.email }} </p>
        <p class="user-block__text"><span class="user-block__text-accent">Phone Number: </span>{{ user.phoneNumber }}</p>
        <p class="user-block__text"><span class="user-block__text-accent">Events: </span> {{ user.events.length }}</p>
      </div>
      <ul class="user-block__events">
        <li class="user-block__events-item" v-for="(event, index) in user.events" :key="index">
          <p class="user-block__text"><span class="user-block__text-accent">Event: </span></p>
          <p class="user-block__text"><span class="user-block__text-accent">Title: </span>{{ event.title }}</p>
          <p class="user-block__text"><span class="user-block__text-accent">Description: </span>{{ event.description }}</p>
          <p class="user-block__text"><span class="user-block__text-accent">Start Date </span>{{ event.startDate.slice(0,10) }}</p>
          <p class="user-block__text"><span class="user-block__text-accent">End Date </span>{{ event.endDate.slice(0,10) }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
    <div class="buttons">
      <router-link to="/" class="btn">Back to users</router-link>
      <button @click="toggleEventForm" v-if="eventFormHidden" class="btn">Create event</button>
    </div>
    <form v-if="!eventFormHidden" class="form" @submit.prevent="createEvent">
        <div class="form__item">
          <label for="title" class="form__label">Title</label>
          <input placeholder="title" type="text" class="form__control" id="title" v-model="title">
        </div>
        <div class="form__item">
          <label for="description" class="form__label">Description</label>
          <input placeholder="description" type="text" class="form__control" id="description" v-model="description">
        </div>
        <div class="form__item">
          <label for="startDate" class="form__label">Start date</label>
          <input type="datetime-local" class="form__control" id="startDate" v-model="startDate">
        </div>
        <div class="form__item">
          <label for="endDate" class="form__label">End Date</label>
          <input type="datetime-local" class="form__control" id="endDate" v-model="endDate">
        </div>
        <button type="submit" class="btn">Create event</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const user = ref(null);
    const userId = route.params.id;
    const eventFormHidden = ref(true);

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        user.value = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    onMounted(fetchUser);

    const toggleEventForm = () => {
      eventFormHidden.value = !eventFormHidden.value;
    }

    return {
      user,
      userId,
      toggleEventForm,
      eventFormHidden,
    };
  },
  data() {
    return {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    }
  },
  methods: {
    isValidDate(startDate,endDate) {
      const currentDate = new Date();
      const inputDate = new Date(startDate);
      const inputEndDate = new Date (endDate)
      return (inputDate > currentDate) && (inputEndDate > inputDate);
    },
    isUniqueDate(startDate) {
      return !this.user.events.some(event => 
      event.startDate.slice(0, 10) === startDate.slice(0, 10));
    },
    async createEvent() {
      if (!this.isValidDate(this.startDate, this.endDate) || !this.isUniqueDate(this.startDate)) {
        alert('You can’t create event for this time');
      return;
    }
      const event = {
        title: this.title.trim(),
        description: this.description.trim(),
        startDate: this.startDate,
        endDate: this.endDate,
        userId: this.userId,
      };

      try {
        const response = await axios.post('http://localhost:3000/events', event);
        console.log(response);
        alert(`Added a new event - ${event.title}!`);
        this.toggleEventForm()
        await this.fetchUser()
      } catch (error) {
        console.error(error)
      };

        this.title = "";
        this.description = "";
        this.startDate = "";
        this.endDate = "";
    },
    async fetchUser() {
      try {
      const response = await axios.get(`http://localhost:3000/users/${this.userId}`);
      this.user = response.data;
      } catch (error) {
      console.error('Error fetching user data:', error);
      }
      },
      toggleEventForm() {
        this.eventFormHidden = !this.eventFormHidden;
      },
  },
  mounted() {
  this.fetchUser();
  },
};
</script>
<style lang="scss" scoped>
  .user-block {
    display: flex;
    justify-content: space-between;

    &__info {
      max-width: 500px;
      width: 100%;
    }

    &__events {
      max-width: 500px;
      width: 100%;
      list-style: decimal;
      max-height: 400px;
      overflow-y: auto;
      padding: 0 24px 24px;
    }

    &__events-item {
      margin-bottom: 15px;
    }

    &__text {
      font-size: 16px;
    }

    &__text-accent {
      font-weight: bold;
      color: var(--color-heading);
    }
  }
</style>