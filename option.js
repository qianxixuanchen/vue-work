module.exports = [
    {
        template: 'p',
        text: 'hello word! hello word! hello word',
        vueData: {
            isShow: false,
            list: ['1', '2'],
            name: 'asdsdasdas'
        },
        attr: {
            'v-if': 'isShow'
        },
        children: [
            {
                template: 'span',
                text: 'ansd kas daslndlajnsldknakkklasndl'
            }
        ]
    }
]