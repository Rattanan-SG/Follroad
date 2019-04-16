<template>
  <nav>
    <v-toolbar color="indigo" dark flat>
      <v-toolbar-side-icon @click.close="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-sm-and-down">Follroad</v-toolbar-title>
      <gmap-autocomplete
        @place_changed="setPlace"
        style="width:100%"
        class="pa-2 ml-2 subheading"
        ref="autocomplete"
        placeholder="ค้นหาสถานที่"
        :select-first-on-enter="true"
      ></gmap-autocomplete>
      <v-btn v-if="!searchPlace" icon @click="search">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn v-else icon @click="clear">
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>directions</v-icon>
      </v-btn>
      <v-btn icon @click="installer()" :style="{'display' : installBtn}">
        <v-icon>mobile_friendly</v-icon>
      </v-btn>
      <v-btn icon to="/news" class="hidden-sm-and-down">
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-tile v-for="list in lists" :key="list.text" router :to="list.route">
          <v-list-tile-action>
            <v-icon>{{list.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{list.text}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      lists: [
        { text: "Home", icon: "home", route: "/" },
        { text: "Feed", icon: "today", route: "/news" }
      ],
      installBtn: "none",
      installer: null
    };
  },
  computed: {
    ...mapGetters({
      searchPlace: "getSearchPlace"
    })
  },
  created() {
    let installPrompt;

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      installPrompt = e;
      this.installBtn = "block";
    });

    this.installer = () => {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => {
        installPrompt = null;
        this.installBtn = "none";
      });
    };
  },
  methods: {
    ...mapActions({
      setCenter: "setCenter",
      setSearchPlace: "setSearchPlace"
    }),
    setPlace: function(place) {
      if (place) {
        if (place.geometry) {
          this.setSearchPlace(place);
          console.log(this.searchPlace);
          this.search();
        }
      }
    },
    search: function() {
      if (this.searchPlace) {
        this.setCenter(this.searchPlace.geometry.location);
        this.$router.push("/");
      }
    },
    clear: function() {
      this.$refs.autocomplete.$el.value = null;
      this.setSearchPlace(null);
    }
  }
};
</script>
<style scoped>
::placeholder {
  color: white;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
