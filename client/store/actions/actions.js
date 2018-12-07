export default {
    updateCountASync(store, data) {
        setTimeout(() => {
            store.commit('updateCount', data.number)
        }, data.time)
    }
}