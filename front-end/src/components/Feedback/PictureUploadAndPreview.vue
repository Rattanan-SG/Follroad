<template>
  <vue2Dropzone
    ref="myVueDropzone"
    id="dropzone"
    :options="dropzoneOptions"
    :awss3="awss3"
    :duplicateCheck="true"
    @vdropzone-s3-upload-error="s3UploadError"
    @vdropzone-s3-upload-success="s3UploadSuccess"
  ></vue2Dropzone>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  name: "PictureUploadAndPreview",
  components: {
    vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: `${process.env.VUE_APP_UPLOAD_FILE_URL}/attachment`,
        method: "POST",
        acceptedFiles: "image/*",
        thumbnailWidth: 220,
        maxFiles: 5,
        parallelUploads: 5,
        uploadMultiple: true,
        addRemoveLinks: true,
        autoProcessQueue: false
      },
      awss3: {
        signingURL: f => {
          return `${process.env.VUE_APP_UPLOAD_FILE_URL}/createPresignedPost?key=${f.upload.uuid}_${f.name}&contentType=${f.type}`;
        },
        headers: {},
        params: {}
      },
      images: [],
      count: 0
    };
  },
  methods: {
    getSigningURL: function() {},
    uploadFiles: function() {
      if (this.$refs.myVueDropzone.getQueuedFiles().length > 0) {
        this.$refs.myVueDropzone.processQueue();
        return true;
      }
      return false;
    },
    s3UploadError: function(error) {
      this.$emit("upload-error", error);
    },
    s3UploadSuccess: function(location) {
      this.images.push({ url: location });
      this.count++;
      const fileNumber = this.$refs.myVueDropzone.getAcceptedFiles().length;
      if (this.count === fileNumber) {
        this.uploadComplete();
      }
    },
    uploadComplete: function() {
      const value = this.images;
      this.$refs.myVueDropzone.removeAllFiles();
      this.images = [];
      this.count = 0;
      this.$emit("upload-complete", value);
    }
  }
};
</script>
<style scoped>
</style>