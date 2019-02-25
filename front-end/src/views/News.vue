<template>
    <v-card>
      <br><br><br>
      
        <v-container fluid grid-list-lg>
            <v-layout row wrap align-start justify-center  fill-height>
                
                    <v-card  color="cyan darken-2 white--text" class="mb-4 mt-4 ">
                        <v-layout>
                          
                    
                  
                  <v-flex xs2 md1>
                    <br> <br>
                    <v-icon size="50px" class="ml-4">account_circle</v-icon>
                   
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline , ml-4"  >The Nun</div>
                        <div id="abc" class="ml-4">3 นาที</div>
                        
                      </div>
                    </v-card-title>
                   
                  </v-flex>
                  
                </v-layout>
                <v-flex xs12>
                 <div>ถนนประชาอุทิศ ซอยประชาอุทิศ 37  
                            รถจยย. ชนกับ รถปิคอัพ ขวางช่องทางซ้าย 
                              บาดเจ็บ 2 คน การจราจรเคลื่อนตัวช้า
                 </div>
                </v-flex>
                <v-divider light></v-divider>
                
                <v-card-actions class="pa-3">
                  
                   <v-flex xs2 md1    >
                  <v-icon size="30px">account_circle</v-icon>
                  </v-flex>
                  
                  <v-flex xs11>
                   
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
                
            </v-layout>
        </v-container>
    </v-card>
    
    
</template>

<style>
  .abc{
    margin-top: 2px;
    
  }
</style>

<script>
export default {
    
}
</script>
    

