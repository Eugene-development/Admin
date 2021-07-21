<!--<template>-->
<!--  <div >-->
<!--    &lt;!&ndash;    <div class="top">&ndash;&gt;-->
<!--    &lt;!&ndash;      <p>&ndash;&gt;-->
<!--    &lt;!&ndash;        <nuxt-link to="/">Back To Home</nuxt-link>&ndash;&gt;-->
<!--    &lt;!&ndash;        <button @click="reloadWindow" class="button&#45;&#45;grey">Reload For Server Test</button>&ndash;&gt;-->
<!--    &lt;!&ndash;      </p>&ndash;&gt;-->
<!--    &lt;!&ndash;      <h2>Is SSR? {{isSSR}}</h2>&ndash;&gt;-->
<!--    &lt;!&ndash;    </div>&ndash;&gt;-->
<!--    <vue-editor placeholder="Впишите ваши данные..."></vue-editor>-->

<!--    &lt;!&ndash;    <no-ssr placeholder="Loading Your Editor...">&ndash;&gt;-->
<!--    &lt;!&ndash;    </no-ssr>&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// let VueEditor-->

<!--// if (process.browser) {-->
<!--//   VueEditor = require('vue2-editor').VueEditor-->
<!--// }-->

<!--export default {-->
<!--  asyncData() {-->
<!--    return {-->
<!--      content: "",-->
<!--      pageIsMounted: false,-->
<!--      isSSR: process.server ? true : false-->
<!--    };-->
<!--  },-->

<!--  // components: { VueEditor },-->

<!--  // methods: {-->
<!--  //   reloadWindow() {-->
<!--  //     window.location.reload(true);-->
<!--  //   }-->
<!--  // }-->
<!--};-->
<!--</script>-->


<!--&lt;!&ndash;ОТ ВИКТОРА&ndash;&gt;-->

<template>
  <client-only placeholder="loading...">
    <vue-editor
      ref="editor"
      :placeholder="$props.placeholder"
      :value="currentProduct.description"
      :editor-toolbar="toolbar"
      :editor-options="settings"
      :custom-modules="customModules"
      @text-change="handleTextChange"
    ></vue-editor>
  </client-only>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import {mapGetters} from "vuex";

export default {
  components: { VueEditor },
  props: {
    content: { type: String, default: '' },
    placeholder: { type: String, default: 'Введите данные' },
  },
  data: () => ({
    loading: false,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      [{ header: [1, 2, 3, false] }],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      // ['image' /* 'code-block' */],
      ['clean'],
    ],
    customModules: [],
    settings: {
      modules: {
        clipboard: {
          matchers: [
            [
              Node.ELEMENT_NODE,
              (node, delta) => {
                delta.ops = delta.ops.map((op) => {
                  return { insert: op.insert }
                })
                return delta
              },
            ],
          ],
        },
      },
    },
  }),
  methods: {
    handleTextChange(delta, oldDelta, source) {
      this.$emit('update', this.$refs.editor.quill.container.firstChild.innerHTML)
    },

    // handleTextChange(delta, oldDelta, source) {
    //   this.$emit('update:content', this.$refs.editor.quill.container.firstChild.innerHTML)
    // },

    // async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
    //   try {
    //     this.loading = true
    //
    //     const formData = new FormData()
    //
    //     formData.append('image', file)
    //
    //     const { data } = await this.$axios.post(`/wysiwyg/image`, formData) // аплоад картинки на сервер
    //
    //     Editor.insertEmbed(cursorLocation, 'image', data.url)
    //     Editor.formatText(cursorLocation, 1, 'alt', 'image') // Знчение для alt-аттрибута изображения (SEO)
    //
    //     resetUploader()
    //   } catch (error) {
    //     console.error(error)
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },

  computed: {
    ...mapGetters({
      currentProduct: 'data/product/currentProduct',
    }),
  },

}
</script>
