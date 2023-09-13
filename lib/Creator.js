const inquirer = require("inquirer")
const wrapLoading = require('./utils/loading')
const { chalk, log, hasGit, hasProjectGit, execa } = require('@vue/cli-shared-utils')
const fs = require('fs')
const path = require('path')
const {
    copyFolderSync,
    writeFileTree,
    generateConfig
} = require('./utils/util.js')

class Creator {
    constructor (projectName, context) {
        this.name = projectName
        this.context = context
    }

    async create () {
        // 1) 获取模板名称列表，从template文件夹中拉取
        const temList = await this.getTemList()
        // 2) 与用户交互，获取用户选择的模板名称
        const targetTem = await this.getTargetTem(temList)
        // 3) 复制模板到目标地址
        await wrapLoading(this.generateProjet, this, '生成项目模板', targetTem)
        // 4）在项目中生成项目初始配置文件，即project.config.js
        await wrapLoading(this.generatorConfig, this, '生成配置文件')
        // 5) 在项目中初始化git
        await wrapLoading(this.initGit, this, '初始化git')
        // 6) 完成创建，成功提示
        this.finished()
    }

    // 获取模板名称列表
    getTemList () {
        return new Promise((resolve, reject) => {
            const temPath = path.resolve(__dirname, '../templates')
            // 读取文件夹内容
            fs.readdir(temPath, (err, files) => {
                if (err) {
                    console.error('无法读取文件夹内容：', err)
                    reject(err)
                }
                // 过滤出文件夹
                const templates = files.filter(file => {
                    return fs.statSync(`${temPath}/${file}`).isDirectory()
                })
                // 输出文件夹名称列表
                resolve(templates)
            })
        })
    }

    // 获取用户选择的模板名称
    async getTargetTem (temList) {
        const { template } = await inquirer.prompt({
            name: 'template',
            type: 'list',
            choices: temList,
            message: 'Please choose a template to create project'
        })
        return template
    }

    // 复制模板到目标地址
    generateProjet (targetTem) {
        const sourceFolder = path.resolve(__dirname, `../templates/${targetTem}`)
        copyFolderSync(sourceFolder, this.context)
    }

    generatorConfig () {
        const { context, name } = this
        writeFileTree(context, {
          'project.config.js': generateConfig(name)
        })
    }

    // 判断是否可以初始化 git 仓库：系统安装了 git 且目录下未初始化过，则初始化
    shouldInitGit () {
        if (!hasGit()) {
            // 系统未安装 git
            return false
        }
    
        // 项目未初始化 Git
        return !hasProjectGit(this.context)
    }

    // 初始化git
    async initGit () {
        // 初始化git仓库
        const shouldInitGit = this.shouldInitGit()
        if (shouldInitGit) {
            this.run('git init')
        }
    }

    // 执行命令行
    run (command, args) {
        if (!args) { [command, ...args] = command.split(/\s+/) }
        return execa(command, args, { cwd: this.context })
    }

    finished () {
        console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
        console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
        console.log(`\r\n  npm install / yarn install`)
        console.log('  npm run dev / yarn dev\r\n')
    }
}

module.exports = Creator