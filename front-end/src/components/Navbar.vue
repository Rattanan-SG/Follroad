 <!--<template>
    <v-toolbar app>
      <v-toolbar-title class="headline text">
        <span class="group pa-2">
        <v-icon margin- = "200px">menu</v-icon>
        
        <span>FollRoad </span>

      </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        
      </v-btn>
    </v-toolbar>
</template> -->
<template>
      <!-- <v-toolbar dark color="primary">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title class="white--text">FollRoad</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
      </v-toolbar> -->

    <!-- <div id="app">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="material-icons">today</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>News</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="material-icons">notifications</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Notification</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="material-icons">save</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>SaveRoute</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="material-icons">history</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>History</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="material-icons">lock</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Follroad</v-toolbar-title>
    </v-toolbar>
</div> -->

  <div id="app">
    <v-navigation-drawer app v-model="drawer">
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/news">
          <v-list-tile-action>
            <i class="material-icons">today</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>News</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile @click="">
          <v-list-tile-action>
            <i class="material-icons">notifications</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Notification</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="material-icons">save</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>SaveRoute</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="material-icons">history</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>History</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="material-icons">lock</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Follroad</v-toolbar-title>
      
      <v-spacer></v-spacer>
      <router-link to="/search">
      
        <v-text-field 
          flat
          solo-inverted
          prepend-icon="search"
          label="Search"
          class="hidden-sm-and-down"
        > 
      
      </v-text-field>
      </router-link>

        <v-list-tile to="/news">
          
          <v-toolbar-items class="hidden-sm-and-down">
            <i class="material-icons">notifications</i>
            
          </v-toolbar-items>
        </v-list-tile>
    </v-toolbar>
    </div>
    
</template>


<script>
// export default {
//     data: () => ({
//       name: 'Navbar',
//       drawer: null
//     }),
//     props: {
//       source: String
//     }
//   }


export default {
  data(){
    return{
      drawer : false
    }
  }
}


</script>
<style>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
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
