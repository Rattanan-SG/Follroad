<template>
  <vue-dropzone
    ref="myVueDropzone"
    id="dropzone"
    :options="dropzoneOptions"
    :awss3="awss3"
    @vdropzone-file-added="addFile"
    @vdropzone-s3-upload-error="s3UploadError"
    @vdropzone-s3-upload-success="s3UploadSuccess"
  ></vue-dropzone>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  name: "PictureUploadAndPreview",
  components: {
    vueDropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      awss3: {
        signingURL: f => {
          return "http://aws-direct-s3.dev/" + f.name;
        },
        headers: {},
        params: {},
        sendFileToServer: true,
        withCredentials: false
      },
      images: []
    };
  },
  methods: {
    getSigningURL: function() {},
    uploadFiles: function() {
      if (this.signurl) {
        this.$refs.myVueDropzone.setAWSSigningURL(this.signurl);
        this.$refs.myVueDropzone.processQueue();
      } else {
        this.$refs.urlsigner.focus();
        alert("Enter your signing URL");
      }
    },
    addFile: function(file) {
      console.log(file);
    },
    s3UploadError: function(error) {
      console.log(error);
    },
    s3UploadSuccess: function(location) {
      console.log(location);
    }
  }
};
</script>
<style scoped>
</style>