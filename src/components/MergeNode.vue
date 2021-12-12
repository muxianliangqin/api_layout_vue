<template>
  <Card style="width:95%">
    <p slot="title">
      {{ formInline.title }}
    </p>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="70">
      <FormItem label="id" prop="id">
        <Input v-model="formInline.id" size="small" placeholder="节点的ID，全任务内唯一"></Input>
      </FormItem>
      <FormItem label="nodeIdList" prop="nodeIdList">
        <VueJsonEditor v-model="formInline.nodeIdList" :showBtns="false" :mode="'code'"
                       @json-change="onJsonChange"></VueJsonEditor>
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
  name: "MergeNode",
  components: {
    VueJsonEditor
  },
  data() {
    return {
      formInline: {
        title: 'merge 节点',
        type: 'merge',
        id: '',
        nodeIdList: [],
      },
      ruleInline: {
        id: [
          {required: true, message: 'Please fill in the id', trigger: 'blur'}
        ],
        nodeIdList: [
          {required: true, type: 'array', min: 1, message: 'Please fill in the nodeIdList', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    onJsonChange(value) {
      this.formInline.nodeIdList = [].concat(value)
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
          this.$emit('mergeNodeData', this.formInline)
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
