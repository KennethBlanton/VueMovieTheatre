import './style.scss';

import Vue from 'vue';
import genres from './util/genres';
// import Overview from './components/Overview.vue';

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import { checkFilter, setDay } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get(){return this.$root.bus}});

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes'
const router = new VueRouter({ routes });

import Tooltip from './util/tooltip';
Vue.use(Tooltip);

import VueResource from 'vue-resource';
Vue.use(VueResource);

new Vue({
	el: '#app',
	router,
	data: {
		genre:[],
		time:[],
		movies: [],
		moment,
		day:moment(),
		bus
	},
	created() {
		this.$http.get('./api').then(response => {
			this.movies = response.data;
		})
		this.$bus.$on('check-filter', checkFilter.bind(this));
		this.$bus.$on('set-day', setDay.bind(this));
	}
})


