/**
 * 列表公用的混入
 */

export default {
  data() {
    return {
      list: [],
      page: {
        fistLoaded: false,
        page: 0,
        loading: true,
        loadOver: false,
        loadError: false,
        pagebar: {
          PrePageCount: 10,
        },
      },
    };
  },
  methods: {},
};
