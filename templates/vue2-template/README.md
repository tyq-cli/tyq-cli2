# 项目说明
这是一个通过脚手架自动创建的工程，在根目录下的`project.config.js`中，提供了项目的基础配置项，您可以根据自己的需要更改；

除此之外，还为您提供了以下能力：
1. 配置了DNS；
2. 做好了接入`Sentry`的配置工作，只需要您手动补充dsn值；
3. 提供了基础样例代码；
4. 预置了基础工具包，可直接`install`使用；
5. 一些基础工具函数，请查看`src/common/utils`
6. 封装了`axios`；

<!-- 手动补充工程介绍 -->

## 开发规范
- 如果要新增页面，在`pages`文件夹中合理的位置新建页面目录，`pages`中提供了页面目录模板`spa-template`文件夹，可以拷贝使用；

- 在`build/pages.config.js`中配置页面信息

## 开发调试
* 需要 [nodejs](https://nodejs.org/en/) 与 [yarn](https://www.yarnpkg.com)(推荐使用) 或 [npm](https://www.npmjs.com/)

  ```bash
  yarn install  // npm install
  yarn dev    // npm run dev
  ```
