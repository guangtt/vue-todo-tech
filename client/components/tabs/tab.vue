<script>
    export default {
        name: 'Tab',
        props: {
            index: {
                type: [Number, String],
                required: true
            },
            label: {
                default: 'tab',
                type: String
            }
        },
        computed: {
            active() {
                return this.index === this.$parent.value;
            }
        },
        mounted() {
            this.$parent.panes.push(this);
        },
        render() {
            const tab = this.$slots.label || <span>{this.label}</span>;
            const classNames = {
                tab: true,
                active: this.active
            };
            return (
                <li class={classNames} on-click={this.handleClick}>
                    {tab}
                </li>
            )
        },
        methods: {
            handleClick() {
                this.$parent.$emit('change', this.index);
            }
        }
    }
</script>
<style scoped>
    .tab {
        list-style: none;
        line-height: 40px;
        padding: 0 15px;
        position: relative;
        bottom: -2px;
        cursor: pointer;
    }
    .tab.active {
        border-bottom: 3px solid darkred;
        color: darkred;
    }
</style>