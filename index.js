const cheerio = require('cheerio');
const $ = cheerio.load('<div class="mail"><div></div></div>');
const prettier = require('prettier');
const data = require('./option');
const fs = require('fs');
let isVueConfig = false;

const vueData = {};
const vueMethods = {};
function createTemplate(option) {
    let $ = null;
    for (let item of option) {

        // 标签名 内置一个id方便后续操作
        if (item.template) {
            $ = cheerio.load(`<${item.template} id="dom"></${item.template}>`);
        }
        else {
            throw new Error('必须含有template属性');
        }

        // 内容
        if (item.text) {
            $('#dom').text(item.text)
        }

        // 属性  可包含：class id 以及vue自定义指令
        if (item.attr) {
            for (const key in item.attr) {
                $('#dom').attr(key, item.attr[key]);
            }
        }

        // 合并vue data属性
        if (item.vueData) {
            Object.assign(vueData, item.vueData);
        }

        // 合并vue method属性
        if (item.vueMethods) {
            Object.assign(vueMethods, item.vueMethods);
        }

        // 子元素
        if (item.children) {
            $('#dom').append(arguments.callee(item.children))
        }

        // 取消内置id
        if ($('#dom').attr('id') == 'dom') {
            $('#dom').attr('id', null);
        }
    }
    if ($) {
        return $('body').html();
    }
    return null
}

function createScript(option) {
    return `<script>export default {data(){ return ${JSON.stringify(vueData)}},methods: ${JSON.stringify(vueMethods)}}</script>`;
}

let template = createTemplate(data);
let scriptText = createScript(data);

async function writeFile() {
    const formattedHtml = await prettier.format(`<template><div>${template}</div></template>${scriptText}`, {
        parser: 'vue', // 格式化模板，有
        tabWidth: 4,
        proseWrap: 'never',
        printWidth: 64 // 打印宽带，超过之后才会格式化换行，否则就会压缩在一行内
    });
    fs.writeFileSync('format.vue', formattedHtml, 'utf-8');
}
writeFile()