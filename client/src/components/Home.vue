<template>
  <div>
    <h1 class="heading">User List</h1>
    <select class="select" v-model="sortBy" name="" @change="sortUsers" id="">
      <option value="">Sort by</option>
      <option value="name">Name</option>
      <option value="eventCount">Events count </option>
      <option value="email">email</option>
    </select>
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
              class="btn btn--small btn--grey"
              @click="deleteUser(user._id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-wrapper">
      <button
        class="btn btn--pagination btn--grey"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        prev
      </button>
        <div class="pagination-label">{{currentPage}}</div>
      <button
        class="btn btn--pagination btn--grey"
        @click="nextPage"
        :disabled="userList.data.length < 1"
      >
        next
      </button>
    </div>
    <div>
      <a href="#/create-user" class="btn">Create user</a>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { reactive, ref } from 'vue';

export default {
  setup() {
    const userList = reactive({
      data: [],
      error: null
    });

    const sortBy = ref('');
  
    const sortUsers = () => {
      switch (sortBy.value) {
        case 'name':
          userList.data.sort((a, b) => a.firstName.localeCompare(b.firstName));
          break;
        case 'eventCount':
          userList.data.sort((a, b) => b.events.length - a.events.length);
          break;
        case 'email':
          userList.data.sort((a, b) => a.email.localeCompare(b.email));
          break;
        default:
          break;
      }
    }

    const currentPage = ref(1)
    

    const nextPage = () => {
      currentPage.value++;
      getUsers(currentPage.value, 5);
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        getUsers(currentPage.value, 5);
      }
    };

    const getUsers = async (page = 1, limit = 5) => {
      try {
        const response = await axios.get('http://localhost:3000/users', {
          params: {
            page: page,
            limit: limit
          }
        });
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
      findNearestEvent,
      sortBy,
      sortUsers,
      currentPage,
      nextPage,
      prevPage
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
    margin-bottom: 15px;

    &__link {
      color: rgb(195, 128, 247);
    }
  };

</style>
