<template>
    <b-card
      header-bg-variant="light"
      style="border: none; border-radius: 30px; box-shadow: 0 5px 10px grey">
      <!-- <b-button
        :to="{ name: 'add-data' }"
        variant="success"
        class="mt-3 col-2 ml-4">
        <i class="bi bi-clipboard-plus-fill"></i> Tambah
      </b-button> -->
      <b-card-body>
        <b-input-group>
          <b-input-group-prepend class="mt-1 ml-5" style="margin-right: -80px">
            <span><i class="bi bi-search"></i></span>
          </b-input-group-prepend>
          <b-form-input
            class="form-control col-10 mx-auto"
            style="border-radius: 20px"
            type="search"
            v-model="searchQuery"
            placeholder="Search name"></b-form-input>
        </b-input-group>
      </b-card-body>
  
      <b-card-body>
        <!-- <b-table hover light :fields="field" :items="resultQuery" show-empty>
          <template v-slot:cell(index)="row">
            <p class="text-center">
              {{ row.index + 1 }}
            </p>
          </template>
          <template v-slot:cell(action)="row">
            <router-link
              :to="{ name: 'detail-data', params: { id: row.item.key } }"
              id="actionic">
              <i class="bi bi-eye-fill"></i>
            </router-link>
            <router-link
              :to="{ name: 'edit-data', params: { id: row.item.key } }"
              id="actionic">
              <i class="bi bi-pencil-fill"></i> edit
            </router-link>
  
            <button @click="deleteData(row.item.key)" id="actionic">
              <i class="bi bi-trash-fill"></i> delete
            </button>
          </template>
        </b-table> -->
        <b-card-group>
          <b-card-body v-for="row in resultQuery" :key="row.key">
            <b-card
              style="
                border: none;
                border-radius: 30px;
                box-shadow: 0 3px 0 3px grey;
              ">
              <b-card-title>
                <div class="float-left">
                  <small
                    ><b>
                      <h4>{{ row.name }}</h4>
                    </b></small
                  >
                </div>
                <div class="float-right">
                  <router-link
                    :to="{ name: 'detail-data', params: { id: row.key } }"
                    id="actionic">
                    <i class="bi bi-eye-fill"></i>
                  </router-link>
                  <router-link
                    :to="{ name: 'edit-data', params: { id: row.key } }"
                    id="actionic">
                    <i class="bi bi-pencil-fill"></i>
                  </router-link>
  
                  <button @click="deleteData(row.key)" id="actionic">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </b-card-title>
              <div class="float-left container text-justify">
                <b-card-body>
                  {{ row.description }}
                </b-card-body>
              </div>
              <small class="text-muted float-right"
                >created {{ row.created_at }}</small
              >
            </b-card>
          </b-card-body>
        </b-card-group>
      </b-card-body>
    </b-card>
  </template>
  
  <script>
  import { db } from "../firebaseDb";
  export default {
    name: "home-screen",
    data() {
      return {
        todolist: [],
        todo: {
          name: "",
          description: "",
          created_at: "",
        },
        nameState: null,
        descriptionState: null,
        created_atState: null,
  
        searchQuery: null,
      };
    },
    created() {
      this.loadData();
    },
    methods: {
      deleteData(id) {
        if (window.confirm("Yakin ingin hapus?")) {
          db.collection("todolist")
            .doc(id)
            .delete()
            .then(() => {
              this.makeToast("danger");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      loadData() {
        db.collection("todolist").onSnapshot((snapshotChange) => {
          this.todolist = [];
          snapshotChange.forEach((doc) => {
            this.todolist.push({
              key: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              created_at: doc.data().created_at,
            });
          });
        });
      },
      makeToast(variant = null) {
        this.$bvToast.toast("Data deleted", {
          title: `Delete ToDoList`,
          variant: variant,
          solid: true,
        });
      },
    },
    computed: {
      resultQuery() {
        if (this.searchQuery) {
          return this.todolist.filter((item) => {
            return this.searchQuery
              .toLowerCase()
              .split(" ")
              .every((v) => item.name.toLowerCase().includes(v));
          });
        } else {
          return this.todolist;
        }
      },
    },
  };
  </script>
  