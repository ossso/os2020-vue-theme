import {
  mapState,
} from 'vuex';

export default {
  computed: {
    ...mapState({
      zbp: (state) => state.zbp,
      isLogin: (state) => state.isLogin,
      userinfo: (state) => state.user.info,
    }),
  },
  created() {
    this.cache = {};
  },
};
