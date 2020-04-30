
module.exports = {
  "extends": "stylelint-config-standard",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "amd": true,
    "jest": true
  },
  "plugins": [
    "stylelint-z-index-value-constraint",
  ],
  "parserOptions": {

  },
  "rules": {
    // 缩进2个空格
    "indentation": [2, {
      "except": ["value"],
      "severity": "warning",
      "message": "Please use 2 spaces for indentation. Tabs make The Architect grumpy."
    }],
    // 去掉小数前面的 0
    "number-leading-zero": "never",
    // 不允许空规则
    "block-no-empty": true,
    "max-empty-lines": 2,
    "color-no-invalid-hex": true,
    // 注释空行前
    "comment-empty-line-before": ["always", {
      "ignore": ["stylelint-commands", "between-comments"],
    }],
    // 注释空行后
    "declaration-colon-space-after": "always",
    // 排除前面空行
    "rule-nested-empty-line-before": ["always", {
      "except": ["first-nested"],
      "ignore": ["after-comment"],
    }],
    // 单位白名单
    "unit-whitelist": ["rem", "%", "s", "deg", "px", "em", "vh", "vm"],
    "plugin/z-index-value-constraint": {
      "min": -10,
      "max": 999
    }
  },
  "root": true
};

/**
 * plugins: 插件， 插件列表地址：https://stylelint.io/user-guide/plugins/
 */


/** 
1.要调整任何具体规则的严重程度，使用辅助选项severity，可获得的值有warning,error
2.提供一个message选项，提供自定义消息

*/
