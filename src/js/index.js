import Vue from "vue";
import "../css/style.css";

const encabezado = {
  template: "#template-encabezado",
};

const anuncio = {
  template: "#template-anuncio",
};

const vm = new Vue({
  el: "#app",
  data: {},
  components: { encabezado, anuncio },
});

// if (module.hot) {
//   module.hot.accept();
// }
