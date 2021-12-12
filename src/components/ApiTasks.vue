<template>
  <div>
    <Table stripe :columns="columns" :data="apiTasks">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">View</Button>
      </template>
    </Table>
    <Modal
      v-model="modal.show"
      :title="modal.title"
      fullscreen
      @on-ok="ok"
      @on-cancel="cancel">
      <ApiLayout :taskInfo="modal.taskInfo" ref="apiLayout"></ApiLayout>
    </Modal>
  </div>
</template>

<script>
import ApiLayout from './ApiLayout.vue'

export default {
  name: "ApiTasks",
  components: {
    ApiLayout
  },
  data() {
    return {
      modal: {
        show: false,
        title: '',
        taskInfo: {}
      },
      columns: [
        {
          title: '任务ID',
          width: 150,
          key: 'taskId'
        },
        {
          title: '任务描述',
          width: 300,
          key: 'taskDesc'
        },
        {
          title: '任务详情',
          key: 'taskInfo'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      apiTasks: []
    }
  },
  methods: {
    selectApiTasks() {
      this.$http.get("/apiLayout/apiTasks").then(response => {
        this.apiTasks = response.data
      }, error => {
        alert(error)
      })
    },
    show(row) {
      this.modal.show = true
      this.modal.taskInfo = JSON.parse(row.taskInfo)
    },
    ok() {
      this.$Message.info('Clicked ok');
    },
    cancel() {
      this.$Message.info('Clicked cancel');
      this.selectApiTasks()
      this.$refs.apiLayout.cleanData()
    }
  },
  mounted() {
    this.selectApiTasks()
  }
}
</script>

<style scoped>

</style>
