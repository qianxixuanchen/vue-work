const cheerio = require('cheerio');
const $ = cheerio.load('<div class="mail"></div>');
const prettier = require('prettier');
const data = require('./option');
const fs = require('fs');
let isVueConfig = false;

const vueData = {};
const vueMethods = {};
function createTemplate(option) {
    let $ = cheerio.load(`<div id="mail"></div>`);
    for (let item of option) {
        if (item.template) {
            $ = cheerio.load(`<${item.template} id="dom"></${item.template}>`);
        }
        else {
            throw new Error('必须含有template属性');
        }

        if (item.text) {
            $('#dom').text(item.text)
        }

        if (item.attr) {
            for (const attrItem of item.attr) {
                $('#dom').attr(attrItem.key, attrItem.value);
            }
        }

        if ($('#dom').attr('id') == 'dom') {
            $('#dom').attr('id', null);
        }

        if (!isVueConfig && item.vueData) {
            isVueConfig = true;
        }

        if (item.vueData) {
            Object.assign(vueData, item.vueData);
        }

        if (item.vueMethods) {
            Object.assign(vueMethods, item.vueMethods);
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
    console.log(formattedHtml)
    fs.writeFileSync('format.vue', formattedHtml, 'utf-8');
}
writeFile()