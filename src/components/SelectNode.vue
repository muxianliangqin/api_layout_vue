<template>
  <Card style="width:95%">
    <p slot="title">
      select 节点
    </p>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="70">
      <FormItem label="id" prop="id">
        <Input v-model="formInline.id" size="small" placeholder="节点的ID，全任务内唯一"></Input>
      </FormItem>
      <FormItem label="nodeId" prop="nodeId">
        <Input v-model="formInline.nodeId" size="small" placeholder="从哪个节点字段，就填该节点的ID"></Input>
      </FormItem>
      <FormItem label="keyList" prop="keyList">
        <VueJsonEditor v-model="formInline.keyList" :showBtns="false" :mode="'code'" @json-change="onJsonChange"></VueJsonEditor>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">确定</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
import VueJsonEditor from 'vue-json-editor'

export default {
  name: "SelectNode",
  components: {
    VueJsonEditor
  },
  data() {
    return {
      formInline: {
        title: 'http节点',
        type: 'select',
        id: '',
        nodeId: '',
        keyList: [],
      },
      ruleInline: {
        id: [
          {required: true, message: 'Please fill in the id', trigger: 'blur'}
        ],
        nodeId: [
          {required: true, message: 'Please fill in the nodeId', trigger: 'blur'},
        ],
        keyList: [
          {required: true, type: 'array', min: 1, message: 'Please fill in the keyList', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    onJsonChange(value) {
      this.formInline.keyList = [].concat(value)
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
          this.$emit('selectNodeData', this.formInline)
        } else {
          this.$Message.error('Fail!');
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
