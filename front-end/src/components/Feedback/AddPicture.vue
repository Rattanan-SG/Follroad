<template>
  <div
    id="my-strictly-unique-vue-upload-multiple-image"
    style="display: flex; justify-content: center;"
  >
    <vue-upload-multiple-image
      @upload-success="uploadImageSuccess"
      @before-remove="beforeRemove"
      @edit-image="editImage"
      :data-images="images"
      idUpload="myIdUpload"
      editUpload="myIdEdit"
      dragText="เพิ่มรูปภาพ"
      browseText="เลือกรูปที่ต้องการ"
      primaryText
      markIsPrimaryText
      popupText
    ></vue-upload-multiple-image>
  </div>
</template>
<script>
import VueUploadMultipleImage from "vue-upload-multiple-image";
export default {
  name: "addpicture",
  data() {
    return {
      images: []
    };
  },
  components: {
    VueUploadMultipleImage
  },
  methods: {
    uploadImageSuccess(formData, index, fileList) {
      console.log("data", formData, index, fileList);
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove(index, done) {
      //   console.log("index", index, fileList);
      var r = confirm("ลบรูปภาพหรือไม่ ?");
      if (r == true) {
        done();
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
    }
  }
};
</script>
<style scoped>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0px 10px;
}

a {
  color: #42b983;
}
</style>