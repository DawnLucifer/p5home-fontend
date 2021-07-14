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
              @click="uploadCode"
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
          ></el-button>
        </el-tooltip>
        <!--    刷新代码    -->
        <el-tooltip effect="dark" content="重置代码" placement="bottom">
          <el-button
              icon="el-icon-refresh"
              @click="refreshCode"
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

    <div id="container" ref="container" style="height:700px"></div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'

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
          readOnly: false,        // 只读
          cursorStyle: 'line',        //光标样式
          automaticLayout: false, //自动布局
          glyphMargin: true,  //字形边缘
          useTabStops: false,
          fontSize: 15,       //字体大小
          autoIndent: true,//自动布局
          quickSuggestionsDelay: 500,   //代码提示延时
        }
      }
    }
  },
  data() {
    return {
      themeOption: [
        {
          value: 'vs',
          label: 'vs'
        },
        {
          value: 'hc-black',
          label: 'hc-black'
        },
        {
          value: 'vs-dark',
          label: 'vs-dark'
        },
      ],
      fontSizeOption: [10, 11, 12, 13, 14, 15, 16, 17, 18],
      theme: 'vs',
      minimapOn: true,
      fontSize: 15,
      codesCopy: '',//内容备份
      monacoEditor: {},
      infoDialogVisible: false,
      settingsDialogVisible: false
    }
  },
  mounted() {
    this.codesCopy = localStorage.getItem('processing_code')
    this.initEditor();

  },
  methods: {
    initEditor() {
      this.$refs.container.innerHTML = '';
      this.monacoEditor = monaco.editor.create(this.$refs.container, {
        value: this.codesCopy || this.codes,
        language: this.language,
        theme: this.theme,//vs, hc-black, or vs-dark
        editorOptions: this.editorOptions,
      });
    },
    themeChange() {
      // this.codesCopy = this.getVal()
      this.monacoEditor.updateOptions({
        theme: this.theme,
      })
    },
    fontSizeChange() {
      this.monacoEditor.updateOptions({
        fontSize: this.fontSize,
      })
    },
    getVal() {
      return this.monacoEditor.getValue()
    },
    refreshCode() {
      this.initEditor()
    },
    runCode() {

    },
    uploadCode() {

    },
    saveCode() {
      localStorage.setItem('processing_code', this.getVal())
    }
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
  margin: 10px;
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