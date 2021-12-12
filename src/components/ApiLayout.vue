<template>
  <div>
    <Split v-model="split1">
      <div slot="left" class="demo-split-pane" style="padding-left: 2%">
        <Row style="margin-bottom: 2em">
          <Col span="2">任务ID：</Col>
          <Col span="6"><Input v-model="apiLayoutData.id" size="small" placeholder="http请求的url"></Input></Col>
          <Col span="16" style="text-align: center">
            <Button type="primary" style="margin-right: 2em" @click="save">保存</Button>
            <Button type="primary" @click="run()">运行</Button>
          </Col>
        </Row>
        <Row style="margin-bottom: 2em">
          <Col span="2">任务描述：</Col>
          <Col span="22"><Input v-model="apiLayoutData.desc" size="small" type="textarea" placeholder="任务描述"></Input></Col>
        </Row>
        <Row>
          <Col span="2">编排规则：</Col>
          <Col span="22">
            <Input v-model="apiLayoutData.rule" size="small" type="textarea" style="margin-bottom: 2em"
                   placeholder="编排规则：(nodeId)表示节点,[]表示并行，[]内的','表示任务分割，->表示方向。eg:(http1)->[(http2),(http3)]->(http4)"/>
          </Col>
        </Row>
        <Row v-if="execute.isRun" style="margin-bottom: 2em">
          <Col span="2" style="text-align: right">运行结果：</Col>
          <Col span="22" style="text-align: left">{{ execute.result }}</Col>
        </Row>
        <Row>
          <Col span="12" v-for="(node, index) in apiLayoutData.nodeDataList">
            <Card style="margin-bottom: 1em" :title="node.title">
              <a href="#" slot="extra">
                <Icon type="md-close" v-on:click="deleteNode(index)"/>
              </a>
              <Row v-for='(value, name) in node'>
                <Col span="4" style="text-align: right">{{ name }}</Col>
                <Col span="1" style="text-align: center">:</Col>
                <Col span="19" style="text-align: left">{{ value }}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      <div slot="right" class="demo-split-pane">
        <Row style="margin-bottom: 2em">
          <Col span="6" style="text-align: right">新增节点：</Col>
          <Col span="18">
            <Select v-model="select.value" style="width:200px" @on-change="selectNode">
              <Option v-for="item in select.nodeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span=""></Col>
        </Row>
        <Row>
          <Col span="1"></Col>
          <Col span="23">
            <HttpNode v-if="select.value === 'HttpNode'" v-on:httpNodeData="addNodeData"></HttpNode>
            <SelectNode v-else-if="select.value === 'SelectNode'" v-on:selectNodeData="addNodeData"></SelectNode>
            <MergeNode v-else-if="select.value === 'MergeNode'" v-on:mergeNodeData="addNodeData"></MergeNode>
          </Col>
        </Row>
      </div>
    </Split>
  </div>
</template>

<script>
import HttpNode from './HttpNode.vue'
import SelectNode from './SelectNode.vue'
import MergeNode from './MergeNode.vue'

export default {
  name: "api-layout",
  props: {
    taskInfo: Object
  },
  components: {
    HttpNode,
    SelectNode,
    MergeNode
  },
  data() {
    return {
      split1: 0.6,
      select: {
        value: '',
        nodeList: [
          {
            value: 'HttpNode',
            label: 'http节点'
          },
          {
            value: 'SelectNode',
            label: 'select节点'
          },
          {
            value: 'MergeNode',
            label: 'merge节点'
          }
        ]
      },
      apiLayoutData: {
        rule: '',
        id: '',
        nodeDataList: []
      },
      execute: {
        isRun: false,
        result: undefined
      }
    }
  },
  methods: {
    selectNode(value) {
      this.select.value = value
    },
    addNodeData(data) {
      this.apiLayoutData.nodeDataList.push(data)
    },
    deleteNode(index) {
      this.apiLayoutData.nodeDataList.splice(index, 1)
    },
    run() {
      this.$http.post('/apiLayout/run', this.apiLayoutData).then(response => {
        console.log(response)
        this.execute.isRun = true
        this.execute.result = response.data
      }, error => {
        console.log(error)
      })
    },
    save() {
      this.$http.post('/apiLayout/save', this.apiLayoutData).then(response => {
        console.log(response)
        this.$Message.info('保存成功');
      }, error => {
        console.log(error)
      })
    },
    cleanData() {
      this.apiLayoutData = {
        rule: '',
        id: '',
        desc:'',
        nodeDataList: []
      }
    }
  },
  watch: {
    'taskInfo': function (value) {
      if (value) {
        this.apiLayoutData.id = value.id
        this.apiLayoutData.rule = value.rule
        this.apiLayoutData.desc = value.desc
        this.apiLayoutData.nodeDataList = value.nodeDataList
      }
    }
  }
}
</script>

<style scoped>

</style>
