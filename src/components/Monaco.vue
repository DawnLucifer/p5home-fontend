<template>
  <div>

    <div class="dialogs">
      <!--  信息提示    -->
      <el-dialog
          title="提示"
          :visible.sync="infoDialogVisible"
          width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="infoDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!--   提交代码对话框   -->
      <el-dialog
          title="提交sketch"
          :visible.sync="submitSketchDialogVisible"
          width="30%">
        <el-form
            v-model="submitSketchForm"
            @submit.prevent
            label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="submitSketchForm.name"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="submitSketchForm.author"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="submitSketchForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmUploadCode">确 定</el-button>
          </span>

      </el-dialog>

      <!--   获取代码对话框   -->
      <el-dialog
          title="选择一个sketch"
          :visible.sync="sketchListDialogVisible"
          width="40%"
      >
        <el-table
            :data="sketchListData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
          <el-table-column
              property="name"
              label="名称"
              style="width: 30%">
          </el-table-column>
          <el-table-column
              property="author"
              label="作者"
              style="width: 30%">
          </el-table-column>
          <el-table-column
              property="description"
              label="描述"
              style="width: 40%">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmChangeCode">确 定</el-button>
        </span>
      </el-dialog>

      <!--   设置对话框   -->
      <el-dialog
          title="设置"
          :visible.sync="settingsDialogVisible"
          width="30%">

        <table class="setting-table">
          <tr>
            <td class="text">
              <div class="main-title">主题样式</div>
              <div class="sub-title">切换不同的代码编辑器主题，选择适合你的语法高亮。</div>
            </td>
            <td>
              <!--   选择主题   -->
              <span class="theme">
                <el-select
                    v-model="theme"
                    @change="themeChange">
                  <el-option
                      v-for="item in themeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </span>
            </td>
          </tr>
          <tr>
            <td class="text">
              <div class="main-title">字体设置</div>
              <div class="sub-title">调整适合你的字体大小。</div>
            </td>
            <td>
              <el-select
                  @change="fontSizeChange"
                  v-model="fontSize">
                <el-option
                    v-for="n in fontSizeOption"
                    :key="n"
                    :label="n+'px'"
                    :value="n">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="text">
              <div class="main-title">代码小地图</div>
              <div class="sub-title">选择是否开启代码小地图。</div>
            </td>
            <td>
              <el-switch
                  v-model="minimapOn"
                  disabled>
              </el-switch>
            </td>
          </tr>
        </table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="settingsDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="tool-bar">
      <!--      <el-button type="success" icon="el-icon-check" circle size="mini" @click="getVal"></el-button>-->


      <el-button-group>
        <el-tooltip effect="dark" content="颜色选择器" placement="bottom">
          <el-color-picker></el-color-picker>
        </el-tooltip>
      </el-button-group>


      <el-button-group>
        <!--    运行代码    -->
        <el-tooltip effect="dark" content="运行代码" placement="bottom">
          <el-button
              icon="el-icon-video-play"
              @click="runCode"
          ></el-button>
        </el-tooltip>
        <!--    提交代码    -->
        <el-tooltip effect="dark" content="提交代码" placement="bottom">
          <el-button
              icon="el-icon-upload"
              @click="submitSketchDialogVisible = true"
          ></el-button>
        </el-tooltip>
        <!--   保存代码     -->
        <el-tooltip effect="dark" content="保存代码" placement="bottom">
          <el-button
              icon="el-icon-folder"
              @click="saveCode"
          ></el-button>
        </el-tooltip>
      </el-button-group>


      <el-button-group>
        <!--    信息    -->
        <el-tooltip effect="dark" content="帮助信息" placement="bottom">
          <el-button
              icon="el-icon-info"
              @click="infoDialogVisible = true"
          ></el-button>
        </el-tooltip>

        <!--    获取代码    -->
        <el-tooltip effect="dark" content="获取代码" placement="bottom">
          <el-button
              icon="el-icon-s-flag"
              @click="getSketchList"
          ></el-button>
        </el-tooltip>
        <!--    刷新代码    -->
        <el-tooltip effect="dark" content="刷新编辑器" placement="bottom">
          <el-button
              icon="el-icon-refresh"
              @click="refreshCode"
          ></el-button>
        </el-tooltip>

        <!--    全屏    -->
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <el-button
              icon="el-icon-full-screen"
              @click="navChange"
          ></el-button>
        </el-tooltip>

        <!--    设置    -->
        <el-tooltip effect="dark" content="设置" placement="bottom">
          <el-button
              icon="el-icon-s-tools"
              @click="settingsDialogVisible = true"
          ></el-button>
        </el-tooltip>

      </el-button-group>

    </div>

    <div id="container" ref="container" style="height:800px"></div>
  </div>
</template>
<!--suppress JSUnresolvedVariable -->
<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'
import {postSketch, reqSketchList} from "@/api/sketch";

export default {
  props: {
    codes: {
      type: String,
      default: function () {
        return `function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
}

function draw() {
	ellipse(mouseX, mouseY, 20, 20);
}`
      }
    },
    language: {
      type: String,
      default: function () {
        return 'javascript'
      }
    },
    editorOptions: {
      type: Object,
      default: function () {
        return {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: true,        // 只读
          cursorStyle: 'line',        //光标样式
          automaticLayout: false, //自动布局
          glyphMargin: true,  //字形边缘
          useTabStops: false,
          fontSize: 15,       //字体大小
          autoIndent: true,//自动布局
          quickSuggestionsDelay: 500,   //代码提示延时
          insertSpaces: true
        }
      }
    }
  },
  data() {
    return {
      themeOption: [
        {
          value: 'vs',
          label: 'vs',
          type: 'light',
        },
        {
          value: 'hc-black',
          label: 'hc-black',
          type: 'dark',
        },
        {
          value: 'vs-dark',
          label: 'vs-dark',
          type: 'dark'
        },
      ],
      fontSizeOption: [10, 11, 12, 13, 14, 15, 16, 17, 18],
      theme: 'vs',
      minimapOn: true,
      fontSize: 15,
      codesCopy: '',//内容备份
      monacoEditor: {},
      infoDialogVisible: false,
      settingsDialogVisible: false,
      sketchListDialogVisible: false,
      submitSketchDialogVisible: false,
      // sketch list
      currentRow: null,
      sketchListData: [],
      submitSketchForm: {
        name: '',
        author: '',
        description: '',
      },
      submitSketchRules: {
        name: [{
          required: true,
          message: '请输入sketch名称',
          trigger: 'blur'
        }],
        author: [{
          required: true,
          message: '请输入作者',
          trigger: 'blur'
        }],
      }

    }
  },
  mounted() {

    this.codesCopy = this.$store.state.codes || localStorage.getItem('processing_code')
    this.theme = localStorage.getItem('theme') || this.theme
    this.fontSize = localStorage.getItem('fontSize') || this.fontSize
    this.initEditor();
  },

  methods: {
    initEditor() {
      this.$refs.container.innerHTML = '';
      this.monacoEditor = monaco.editor.create(this.$refs.container, {
        value: this.codesCopy || this.codes,
        language: this.language,
        theme: this.theme,//vs, hc-black, or vs-dark
        fontSize: this.fontSize,
        editorOptions: this.editorOptions,
      });
    },
    themeChange() {
      // this.codesCopy = this.getVal()
      localStorage.setItem('theme', this.theme)
      this.monacoEditor.updateOptions({
        theme: this.theme,
      })
    },
    fontSizeChange() {
      localStorage.setItem('fontSize', this.fontSize)
      this.monacoEditor.updateOptions({
        fontSize: this.fontSize,
      })
    },
    getVal() {
      return this.monacoEditor.getValue()
    },
    refreshCode() {
      this.$store.commit('RECEIVE_CODES', this.getVal())
      this.initEditor()
    },
    runCode() {
      this.$store.commit('RECEIVE_CODES', this.getVal())
      sessionStorage.setItem('codes', this.getVal())
      this.$router.push('/render')
    },
    uploadCode() {
      let flag = true;
      if (this.submitSketchForm.name === '') {
        this.$message('名称不能为空')
        flag = false
      }
      if (this.submitSketchForm.author === '') {
        this.$message('作者不能为空')
        flag = false
      }
      if (this.getVal() === '') {
        this.$message('提交的代码不能为空')
        flag = false
      }
      if (!flag) return false
      const sketch = {...this.submitSketchForm, content: this.getVal()}
      postSketch(sketch).then(resp => {
        if (resp.code === 200) {
          this.$message('提交成功!')
        } else {
          this.$message('提交失败!')
          flag = false
        }
      })
      // this.$refs.submitSketchForm.validate((valid) => {
      //   if (valid) {
      //     const sketch = {...vc.submitSketchForm, content: vc.getVal()}
      //     if (sketch.content === '') {
      //       vc.$message('提交的代码不能为空!')
      //       flag = false
      //       return false
      //     }
      //     postSketch(sketch).then(resp => {
      //       if (resp.code === 200) {
      //         vc.$message('提交成功!')
      //         vc.submitSketchForm.name = ''
      //         vc.submitSketchForm.author = ''
      //         vc.submitSketchForm.description = ''
      //         flag = true
      //         return true
      //       } else {
      //         vc.$message('提交失败! ' + resp.msg)
      //         flag = false
      //         return false
      //       }
      //     })
      //   } else {
      //     vc.$message('信息有误!')
      //     flag = false
      //     return false
      //   }
      // });
      return flag
    },
    confirmUploadCode() {
      if (this.uploadCode()) {
        this.submitSketchForm.name = ''
        this.submitSketchForm.author = ''
        this.submitSketchForm.description = ''
        this.submitSketchDialogVisible = false
        console.log(this)
      }
    },
    saveCode() {
      this.$store.commit('RECEIVE_CODES', this.getVal())
      localStorage.setItem('processing_code', this.getVal())
    },
    navChange() {
      this.$store.commit('RECEIVE_NAV', !this.navShow)
      this.refreshCode()
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    getSketchList() {

      reqSketchList().then(resp => {
        if (resp.code === 200) {
          this.sketchListData = resp.data
          this.sketchListDialogVisible = true
        } else if (resp.code === 401) {
          this.saveCode()
          this.$message('请先登录')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        }
      })
    },
    confirmChangeCode() {
      this.sketchListDialogVisible = false
      this.codesCopy = this.currentRow.content
      this.initEditor()
    }

  },
  computed: {
    navShow() {
      return this.$store.state.navShow
    },
  }
}
</script>

<style scoped>
#container {
  height: 100%;
  text-align: left;
  border: 2px solid #d9d9d9;
  border-radius: 5px;
}

/*.theme {*/
/*  text-align: right;*/
/*  margin-left: 10px;*/
/*  margin-bottom: 10px*/
/*};*/

.tool-bar {
  text-align: right;
}

.tool-bar .el-button-group {
  margin-right: 20px;
}

.el-select {
  width: 100px;
}

.setting-table {
  /*margin-left: 30px;*/
  width: 100%;
  /*font-size: large;*/
}

.setting-table .main-title {
  font-weight: bold;
}

.setting-table .sub-title {
  color: #a7a4a4;
}

.setting-table .text {
  width: 70%;
  padding: 20px;
}

</style>