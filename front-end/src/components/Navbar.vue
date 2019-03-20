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
        <v-list-tile>
          <v-list-tile-action>
            <i class="material-icons">save</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>SaveRoute</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <i class="material-icons">history</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>History</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
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
       <v-btn icon @click="installer()" :style="{'display' : installBtn}">
        <v-icon>mobile_friendly</v-icon>
       </v-btn>
        <v-list-tile to="/news">
          <v-toolbar-items class="hidden-sm-and-down">
            <i class="material-icons">notifications</i>
          </v-toolbar-items>
        </v-list-tile>
    </v-toolbar>
    </div>
    
</template>


<script>
export default {
  data(){
    return{
      drawer : false,
      installBtn: "none",
      installer: null
    }
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
      installPrompt.userChoice.then(result => {
        installPrompt = null;
        this.installBtn = "none";
      });
    };
  }
}
</script>
