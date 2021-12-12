<template>
  <Card style="width:95%">
    <p slot="title">
      http 节点
    </p>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="70">
      <FormItem label="id" prop="id">
        <Input v-model="formInline.id" size="small" placeholder="节点的ID，全任务内唯一"></Input>
      </FormItem>
      <FormItem label="url" prop="url">
        <Input v-model="formInline.url" size="small" placeholder="http请求的url"></Input>
      </FormItem>
      <FormItem label="input" prop="input">
        <VueJsonEditor v-model="formInline.input" :showBtns="false" :mode="'code'"
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
  name: "HttpNode",
  components: {
    VueJsonEditor
  },
  data() {
    return {
      formInline: {
        title: 'http节点',
        type: 'http',
        id: '',
        url: '',
        input: {},
      },
      ruleInline: {
        id: [
          {required: true, message: 'Please fill in the id', trigger: 'blur'}
        ],
        url: [
          {required: true, message: 'Please fill in the url.', trigger: 'blur'},
        ],
        input: [
          {required: true, type: 'object', message: 'Please fill in the input.', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    onJsonChange(value) {
      this.formInline.input = {}.assign(value)
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
          this.$emit('httpNodeData', this.formInline)
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
