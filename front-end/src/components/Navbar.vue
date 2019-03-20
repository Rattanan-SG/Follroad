<template>
  <div id="app">
    <v-navigation-drawer app temporary v-model="drawer">
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
      <v-toolbar-side-icon @click.close="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Follroad</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="installer()" :style="{'display' : installBtn}">
        <v-icon>mobile_friendly</v-icon>
      </v-btn>
      <v-btn icon to="/news" class="hidden-sm-and-down">
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      drawer: false,
      installBtn: "none",
      installer: null
    };
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
  }
};
</script>
