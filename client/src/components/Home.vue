<template>
  <div>
    <h1 class="heading">User List</h1>
    <table class="table">
      <thead >
        <tr class="table__header">
          <th>First Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Events Count</th>
          <th>Next Event Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in userList.data" :key="user._id || index">
          <td>
            <a
              class="table__link"
              :href="`#/user/${user._id}`"
            >
              {{user.firstName}}
            </a>
          </td>
          <td>{{user.email}}</td>
          <td>{{user.phoneNumber}}</td>
          <td>{{user.events.length}}</td>
          <td>
            <div v-if="user.events.length > 0">
              <div>
                Nearest Event: {{ findNearestEvent(user.events).title }}
              </div>
              <div>
                Date: {{ findNearestEvent(user.events).startDate.slice(0,10) }}
              </div>
              <div>
                Time: {{ findNearestEvent(user.events).startDate.slice(11,16) }}
              </div>
            </div>
            <div v-else>
              No events
            </div>
          </td>
          <td class="text-center">
            <button
              class="btn btn--small btn--yellow"
              @click="deleteUser(user._id)"
            >
              Delete
            </button>
          </td>
          
        </tr>
      </tbody>
    </table>
    <a href="#/create-user" class="btn">Create user</a>
  </div>
</template>
<script>
import axios from 'axios';
import { reactive } from 'vue';

export default {
  setup() {
    const userList = reactive({
      data: [],
      error: null
    });

    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        userList.data = response.data;
      } catch (error) {
        userList.error = error.message;
      }
    };

    const deleteUser = async (id) => {
      console.log('Deleting user with id:', id)
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        userList.data = userList.data.filter(user => user._id !== id);
        alert('User deleted!');
      } catch (error) {
        console.log(error);
        alert('Ups..! something went wrong. Try again');
      }
    };

    const findNearestEvent = (events) => {
        if (events.length === 0) return null;

        const now = new Date();
        const nearestEvent = events.find(event => new Date(event.startDate) > now);

        return nearestEvent || events[events.length - 1];
      }

    getUsers();

    return {
      userList,
      deleteUser,
      findNearestEvent
    };
  }
}
</script>
<style lang="scss">

  table, th, td {
    border: 1px solid var(--color-text);
    border-collapse: collapse;
  }
  td {
    padding: 5px;
  }
  th {
    font-weight: bold;
    padding: 10px;
  }
  .table {
    width: 80%;
    margin-bottom: 50px;

    &__link {
      color: rgb(195, 128, 247);
    }
  };

</style>
