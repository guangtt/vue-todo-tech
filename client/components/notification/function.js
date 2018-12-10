import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component); //extend使我们可以通过new方法创建一个组件（参数为对象）
var instances = []; // 当多个notify一起出现时，确定定位
var seed = 1; // 决定id
var h = 16;
var removeInstance = (instance) => {
    if (!instance) return;
    var index = instances.findIndex(inst => {
        return instance.id === inst.id;
    })
    var len = instances.length;
    instances.splice(index, 1);
    if (len <= 1) return;
    var removeHeight = parseInt(instance.vm.height) + 16; //offsetHeight不存在
    for (let i = index; i < len-1; i++) {
        instances[i].verticalOffset = parseInt(instances[i].verticalOffset - removeHeight)
    }
}

const notify = (options) => {
    var {autoClose, ...rest} = options;
    const instance = new NotificationConstructor({
        propsData: {
            ...rest
        },
        data: {
            autoClose: autoClose === undefined ? 3000 : autoClose
        }
    }); //instance是实例对象
    var id = `notification_${seed++}`;
    instance.id = id; //给实例加上id属性
    instance.vm = instance.$mount(); //不传属性，生成了一个dom节点
    document.body.appendChild(instance.vm.$el); //再通过appendchild放在body下
    instance.visible = true;
    var verticalOffset = 0; //实例相对于底部的距离
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16 //遍历已经有的实例，算出这一个的bottom值，有一个16的间隙
    })
    instance.verticalOffset = verticalOffset;
    instances.push(instance);
    instance.vm.$on('closed', () => {
        removeInstance(instance);
        document.body.removeChild(instance.vm.$el);
        instance.vm.$destroy();
    });
    instance.vm.$on('close', () => {
        instance.visible = false; // instance.vm === instance
    })
    return instance;
}
export default notify;