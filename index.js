const cheerio = require('cheerio');
const $ = cheerio.load('<div class="mail"></div>');

const data = [
    {
        // template: 'p',
        text: 'hello word',
        vueData: {
            isShow: false
        },
        attr: [{
            key: 'v-if',
            value: 'isShow'
        }]
    }
]

function createTemplate(domList) {
    let $ = cheerio.load(`<div id="mail"></div>`);
    for (let item of domList) {
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
    }
    if ($) {
        return $('body').html();
    }
    return null
}

console.log(createTemplate(data));