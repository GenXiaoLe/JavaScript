### Babel 所需的基础配置
- @babel/cli
> npm install i -S @babel/cli

Babel提供的内建命令行工
- @babel/node
> npm install i @babel/node -g

全局安装的内建命令行工
- @babel/core
> npm install i -S @babel/core

@babel/cli 在执行的时候会依赖 @babel/core 提供的生成 AST 相关的方法

### Babel 配置文件
1. babel.config.js
    
    在项目的根目录（package.json 文件所在目录）下创建一个名为 babel.config.js 的文件，并输入如下内容。

    ```js
    module.exports = function (api) {
     api.cache(true);
     const presets = [ ... ];
     const plugins = [ ... ];
     return {
       presets,
       plugins
     };
    }
    ```

2. .babelrc

    在你的项目中创建名为 .babelrc 的文件
    
    ```js
    {
     "presets": [...],
     "plugins": [...]
    }
    ```
    
3. .babelrc.js

    与 .babelrc 的配置相同，你可以使用 JavaScript 语法编写。
    
    ```js
    const presets = [ ... ];
    const plugins = [ ... ];
    module.exports = { presets, plugins };
    ```
    
4. package.json
    
    还可以选择将 .babelrc 中的配置信息写到 package.json 文件中

    ```js
    {
     ...
     "babel": {
       "presets": [ ... ],
       "plugins": [ ... ],
     }
    }
    ```

### 插件(Plugins)
> 参数是由插件名称和参数对象组成的一个数组。

```js
{
    "plugins": [
        [
            "@babel/plugin-proposal-class-properties", 
            { "loose": true }
        ]
    ]
}
```

### 预设（Presets）
> 预设就是一堆插件(Plugin)的组合，从而达到某种转译的能力，相当于插入多个plugins

```js
{
  "presets":["@babel/preset-react"]
}
```

### 常用预设
1. @babel/preset-stage-xxx

    @babel/preset-stage-xxx 是 ES 在不同阶段语法提案的转码规则而产生的预设，随着被批准为 ES 新版本的组成部分而进行相应的改变（例如 ES6/ES2015

2. @babel/preset-es2015

    preset-es2015 是仅包含 ES6 功能的 Babel 预设
    
    实际上在 Babel7 出来后上面提到的这些预设 stage-x，preset-es2015 都可以废弃了，因为 @babel/preset-env 出来一统江湖了。
    
3. @babel/preset-env

    前面两个预设是从 ES 标准的维度来确定转码规则的，而 @babel/preset-env 是根据浏览器的不同版本中缺失的功能确定代码转换规则的，在配置的时候我们只需要配置需要支持的浏览器版本就好了
    
    ```js
    {
     "presets": [
       ["env", {
         "targets": {
           "browsers": ["last 10 versions", "ie >= 9"]
         }
       }],
     ],
     ...
    }
    ```
    
### Polyfill
> polyfill 的翻译过来就是垫片，垫片就是垫平不同浏览器环境的差异，让大家都一样。

npm install --save @babel/polyfill

注意 @babel/polyfill 不是在 Babel 配置文件中配置，而是在我们的代码中引入。

```js
import '@babel/polyfill';
const arrFun = ()=>{}
const arr = [1,2,3]
console.log(arr.includes(1))
Promise.resolve(true)
```

### 常用操作
```js
{
  "presets": [
    "@babel/preset-flow",
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "8.10"
        },
        "corejs": "3", // 声明 corejs 版本
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```
- false：此时不对Polyfill 做操作，如果引入 @babel/polyfill 则不会按需加载，会将所有代码引入
- usage：会根据配置的浏览器兼容性，以及你代码中使用到的 API 来进行 Polyfill ，实现按需加载
- entry：会根据配置的浏览器兼容性，以及你代码中使用到的 API 来进行 Polyfill ，实现按需加载，不过需要在入口文件中手动加上import ' @babel/polyfill'


### 复用辅助函数方法babel/plugin-transform-runtime
> @babel/plugin-transform-runtime 可以让 Babel 在编译中复用辅助函数，从而减小打包文件体积

npm install --save-dev @babel/plugin-transform-runtime

npm install --save @babel/runtime

```js
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": [
       "@babel/plugin-transform-runtime"
    ]
}
```
