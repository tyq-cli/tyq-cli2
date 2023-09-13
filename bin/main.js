#!/usr/bin/env node

const program = require('commander')
const { chalk } = require('@vue/cli-shared-utils')
const create = require('../lib/create')

program
    .version(`y-cli2 ${require('../package').version}`)
    .usage('<command> [options]')

program
    .command('create <app-name>')
    .description('生成一个新的工程')
    .option('-f --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        // console.log(chalk.bold.blue(`Y CLI V1.0.0 新建${name}`))
        // console.log('name', name)
        // console.log('options', options)
        create(name, options)
    })

program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.yellow(`y-cli2 <command> --help`)} for detailed usage of given command.`)
    console.log()
})

// console.log(process.argv)
// process.argv的值为['/usr/local/bin/node', '/usr/local/bin/ty-cli']
// '/usr/local/bin/node' 为node可执行文件的路径
// '/usr/local/bin/ty-cli' 为被执行js文件的路径

// 解析命令，不传参数的情况下默认process.argv
program.parse(process.argv)
