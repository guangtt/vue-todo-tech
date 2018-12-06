import Vue from 'vue'

var component = {
    template: `
    <div>
        <p>This is component</p>
        <slot></slot>
    </div>
    `,
    render(h) {
        return h('p', {}, [
            h('p',{}, 'This is comp'),
            this.$slots.default
        ])
    }
}

new Vue({
    el: '#root',
    components: {
        compOne: component
    },
    template: `<comp-one>this is father</comp-one>`,
    render(h) {
        return h('comp-one', {
            ref: 'comp'
        }, [
            h('span', {
                ref: 'span',
                on: {
                    click (){
                        // console.log('hello')
                    }
                }
            }, 'hello'),
            h('input', {
                attrs: {
                    type: 'date'
                }
            }),
            h('div', {
                domProps: {
                    innerHTML: '<h4>hello justin</h4>'
                }
            }, 'World')
        ]);
    }
});