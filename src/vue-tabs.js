if (typeof Vue != 'undefined') {
    Vue.component('tabs', {
        template: `<div class="tabs">
                      <ul vi="tabs.length > 1">
                        <li v-for="tab in tabs" :class="{'active': current === tab}" @click="changeTab(tab)">
                          {{tab.title}}
                        </li>
                      </ul>    
                      <slot></slot>    
                    </div>`,
        data() {
            return {
                tabs: [],
                current: null
            };
        },
        mounted() {
            if (this.current == null) {
                this.current = this.tabs[0];
                this.tabs[0].active = true;
            }
        },
        methods: {
            addTab: function (tab) {
                this.tabs.push(tab);
                if (tab.active === true) {
                    this.current = tab;
                }
            },
            changeTab: function (tab) {
                this.current = tab;
                this.tabs.forEach(value => value.active = value === tab);
            }
        }
    });
    Vue.component('tab', {
        template: `<div v-show="active" :class="{'active': active}">
                      <slot></slot>
                    </div>`,
        data () {
            return {
                active: false
            };
        },
        props: {
            'title': {
                required: true,
                type: String
            },
            'isActive': {
                required: false,
                type: Boolean,
                default: false
            }
        },
        created: function () {
            this.active = this.isActive;
        },
        mounted: function () {
            this.$parent.addTab(this);
        }
    });
}