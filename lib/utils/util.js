const fs = require('fs-extra')
const path = require('path')

// 递归复制文件夹内容的函数
function copyFolderSync (source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target)
    }

    const files = fs.readdirSync(source)

    for (const file of files) {
        const sourceFilePath = path.join(source, file)
        const targetFilePath = path.join(target, file)
    
        if (fs.statSync(sourceFilePath).isDirectory()) {
            // 如果是文件夹，递归复制
            copyFolderSync(sourceFilePath, targetFilePath)
        } else {
            // 如果是文件，直接复制
            fs.copyFileSync(sourceFilePath, targetFilePath)
        }
    }
}

function writeFileTree (dir, files) {
    Object.keys(files).forEach((name) => {
        const filePath = path.join(dir, name)
        fs.ensureDirSync(path.dirname(filePath))
        fs.writeFileSync(filePath, files[name])
    })
}

function stringifyJS (value) {
    const { stringify } = require('javascript-stringify')
    // 2个空格格式化显示
    return stringify(value, null, 2)
}

function generateConfig (projectName) {
    const value = {
        publicPath: '', // 打包后的项目基础路径，自行配置
        devServerPort: '8080', // 开启调试默认端口
        title: projectName
    }
    return `module.exports = ${stringifyJS(value, null, 2)}`
}

module.exports = {
    copyFolderSync,
    writeFileTree,
    stringifyJS,
    generateConfig,
}