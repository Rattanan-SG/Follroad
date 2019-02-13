<template>
    <v-card>
      <br><br><br>
      
        <v-container fluid grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card color="cyan darken-2" class="white--text">
                        <v-layout>
                          
                    <v-flex xs1>
                 
                  </v-flex>
                  
                  <v-flex xs2 md1>
                    <br> <br>
                    <v-icon size="50px">account_circle</v-icon>
                   
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">The Nun</div>
                        <div>3 นาที</div>
                        
                      </div>
                    </v-card-title>
                    <div>ถนนประชาอุทิศ ซอยประชาอุทิศ 37  
                            รถจยย. ชนกับ รถปิคอัพ ขวางช่องทางซ้าย 
                              บาดเจ็บ 2 คน การจราจรเคลื่อนตัวช้า</div>
                  </v-flex>
                  
                </v-layout>
                <v-divider light></v-divider>
                
                <v-card-actions class="pa-3">
                  <v-flex xs1>
                  
                  </v-flex>
                   <v-flex xs2 md1    >
                  <v-icon size="30px">account_circle</v-icon>
                  </v-flex>
                  
                  <v-flex xs10>
                   
                        <v-card dark color="white black--text">
                        <v-card-text>รถติดมาก
                          <div class="text-xs-right" > 
                            <v-btn round color="light-blue accent-4 white--text" v-on:click="getRoute" fab >
                          <v-icon>send</v-icon></v-btn>
                          </div>
                          </v-card-text>
                         
                          </v-card>
                        </v-flex>
                  
                </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
    
    
</template>
<script>
export default {
    
}
</script>
    

