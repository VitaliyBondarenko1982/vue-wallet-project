import M from 'materialize-css';

export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$message = (html) => {
      M.toast({ html });
    };

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$error = (html) => {
      M.toast({ html: `[Error]: ${html}` });
    };
  },
};
