/**
 * 列表公用的混入
 */

export default {
  data() {
    return {
      list: [],
      page: {
        fistLoaded: false,
        pagenow: 0,
        loading: true,
        loadOver: false,
        loadError: false,
        pagination: {},
      },
    };
  },
  methods: {},
};
