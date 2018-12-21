<script>
    export default {
        name: 'Tabs',
        props: {
            value: {
                type: [String, Number],
                required: true
            }
        },
        data() {
            return {
                panes: []
            }
        },
        render() {
            const contents = this.panes.map(pane => {
                return pane.active? pane.$slots.default : null;
            });
            return (
                <div class='tabs' on-change={this.onChange}>
                    <ul class='tabs-header'>
                        {this.$slots.default}
                    </ul>
                    <div>
                        {contents}
                    </div>
                </div>
            )
        },
        methods: {
            onChange(index) {
                this.$emit('change', index)
            }
        }
    }
</script>

<style scoped>
    .tabs-header {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        margin: 0;
        border-bottom: 1px solid rgba(99, 99, 99, 0.73);
    }
</style>