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
        url: "http://localhost:3001/message-queue/api/attachment",
        method: "POST",
        acceptedFiles: "image/*",
        thumbnailWidth: 220,
        addRemoveLinks: true,
        autoProcessQueue: false
      },
      awss3: {
        signingURL: f => {
          return `http://localhost:3001/message-queue/api/createPresignedPost?key=${f.name}&contentType=${f.type}`;
        },
        headers: {},
        params: {}
      },
      images: []
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
      this.images.push(location);
      const fileNumber = this.$refs.myVueDropzone.getAcceptedFiles().length;
      const remainQueueNumber = this.$refs.myVueDropzone.getQueuedFiles()
        .length;
      const uploadingNumber = this.$refs.myVueDropzone.getUploadingFiles()
        .length;
      // console.log(fileNumber, remainQueueNumber, uploadingNumber);
      if (
        fileNumber === 1 ||
        (remainQueueNumber === 0 && uploadingNumber === 0)
      ) {
        this.uploadComplete();
      }
    },
    uploadComplete: function() {
      this.$emit("upload-complete", this.images);
    }
  }
};
</script>
<style scoped>
</style>