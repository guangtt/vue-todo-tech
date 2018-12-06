import Vue from 'vue'

var component = {
    template: '<div>This is component</div>'
}

new Vue({
    el: '#root',
    components: {
        compOne: component
    },
    template: `<comp-one>this is father</comp-one>`
});