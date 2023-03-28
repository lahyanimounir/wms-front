<template>
  <v-container class="text-center" style="display:inline-block">
    <v-card style="border-radius: 20px;" class="upload-card mx-auto mt-6" min-width="600" outlined>
      <h1 class="upload-text mt-6">Importez vos ecritures</h1>
      <span class="mb-6" style="font-size:15px;font-weight:bold">(xlsx)</span>
      <div ref="fileform" class="upload-zone" @click="uploadClick">
        <div class="folder-icon" style="display:flex;flex-direction: column;">
          <v-icon color="blue" size="70">
            mdi-folder-outline
          </v-icon>
          <span style="display:inline;color:grey" class="drop-files">Cliquer ou glissez vos fichiers ici</span>
        </div>
      </div>
      <v-file-input @change="handleFileChange" style="display: none;" ref="fileInput" v-model="inputFiles" multiple
        label="Choisissez un fichier" prepend-icon="mdi-folder-upload" class="my-6"></v-file-input>
      <div v-for="(file, key) in files" class="file-listing">
        <img style="width:50px;height:50px" :src="iconUrl" alt="file" />
        <span style="font-size:15px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px">{{
          file.name }}</span>
        <v-progress-linear :value="file.progress" :buffer-value="buffer" height="10" color="blue" class="my-2"
          min-width="200"></v-progress-linear>

        <v-tooltip bottom v-if="file.uploaded">
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="green" size="30">
              mdi-check
            </v-icon>
          </template>
          <span>{{ file.message }}</span>
        </v-tooltip>

        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="red" size="30">
              mdi-alert-circle
            </v-icon>
          </template>
          <span>
            <ul class="errors-container">
              <li class="errors" v-if="file.errors" v-for="error in file.errors" :key="error">{{ error }}</li>
              <li v-else>{{ file.message }}</li>
            </ul>
          </span>
        </v-tooltip>
        <v-btn icon @click="removeFile(key)">
          <v-icon color="red">mdi-close</v-icon>
        </v-btn>
      </div>
    </v-card>
    <div class="mt-5" ><span @click="downloadModel" style="color:cornflowerblue;cursor: pointer;font-weight: bold;text-decoration: underline;">Cliquez ici </span> pour telecharger un exemple</div>
  </v-container>
</template>
  
<style>
.errors-container {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.errors {
  color: rgb(255, 255, 255);
  padding: 5px
}

div.file-listing {
  /* width: 400px; */
  height: 60px;
  position: relative;
  margin: 10px auto auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

}

div.file-listing img {
  height: 100px;
}

.upload-card {
  padding-bottom: 100px;
  border-style: dashed;
  border-width: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: inline-block;
}

.upload-text {
  font-size: 20px;
  font-weight: bold;
}

.upload-zone {
  cursor: pointer;
  margin: 10px auto;
  padding: 10px;
  border: 2px dashed #4a5ed1;
  border-radius: 0px;
  height: fit-content;
  width: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 250px;

}

.folder-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;

}
</style>

<script>
export default {
  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    /*
      If drag and drop capable, then we continue to bind events to our elements.
    */
    if (this.dragAndDropCapable) {
      /*
        Listen to all of the drag events and bind an event listener to each
        for the fileform.
      */
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
        /*
          For each event add an event listener that prevents the default action
          (opening the file in the browser) and stop the propagation of the event (so
          no other elements open the file in the browser)
        */
        this.$refs.fileform.addEventListener(evt, function (e) {
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));

      /*
        Add an event listener for drop to the form
      */
      this.$refs.fileform.addEventListener('drop', function (e) {
        /*
          Capture the files from the drop event and add them to our local files
          array.
        */
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          console.log('i : ', i)
          let file = e.dataTransfer.files[i];
          if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            console.log('file type : ', file.type)
            file.progress = 0;
            this.files.push(file);
            this.uploadFile(file)


          }

        }
      }.bind(this));
    }

  },
  data() {
    return {
      id: '',
      iconUrl: require('../../../../assets/images/xlsx.png'),
      isDrag: false,
      files: [],
      dragAndDropCapable: false,
      progress: 50,
      buffer: 20,
      inputFiles: [],
    };
  },
  created() {
    this.files = [];
    this.id = this.$route.params.id
  },
  methods: {
    dragOver(e) {
      e.preventDefault();
      this.isDrag = true;
    },
    dragLeave(e) {
      e.preventDefault();
      this.isDrag = false;
    },
    drop(e) {
      e.preventDefault();
      this.isDrag = false;
      this.files = e.dataTransfer.files;
    },
    determineDragAndDropCapable() {
      /*
        Determine if the browser supports drag and drop.
      */
      let div = document.createElement('div');
      return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    },
    removeFile(key) {
      this.files.splice(key, 1);
    },
    uploadFile(file, index) {
      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          file.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        },
      }

      this.$axios.post(`/ecriture/${this.id}/upload`, formData, config)
        .then(response => {
          file.uploaded = true
          file.message = response.data.message
          this.$forceUpdate()
        })
        .catch(error => {
          console.log('error : ', error)
          if (error.response) {
            file.uploaded = false
            file.message = `Upload failed: ${error.response.data.message}`
            file.errors = error.response.data.errors
            this.$forceUpdate()

          } else {
            file.uploaded = false
            file.message = 'Upload failed: network error'
            this.$forceUpdate()

          }
        })

    },
    uploadClick() {
      this.$nextTick(() => {
        try {
          console.log('Trying to trigger file input...');
          this.$refs.fileInput.$refs.input.click();
        } catch (error) {
          console.error('Error triggering file input:', error);
        }
      });
    },
    handleFileChange(e) {
      for (let i = 0; i < e.length; i++) {
        let file = e[i];
        if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          file.progress = 0;
          this.files.push(file);
          this.uploadFile(file)
        }
      }

    },
    async downloadModel() {
      try {
        let apiURL = process.env.Name_api + '/ecriture/download-model';
        const response = await this.$axios.get(apiURL, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'model-file.xlsx');
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.log(error);
      }
    }

    },
};
</script>
  