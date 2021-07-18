<template>
  <vue-editor
    ref="editor"
    :placeholder="$props.placeholder"
    :value="$props.content"
    :editor-toolbar="toolbar"
    :editor-options="settings"
    :custom-modules="customModules"
    use-custom-image-handler
    @image-added="handleImageAdded"
    @text-change="handleTextChange"
  ></vue-editor>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  components: { VueEditor },
  props: {
    content: { type: String, default: '' },
    placeholder: { type: String, default: '' },
  },
  data: () => ({
    loading: false,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image' /* 'code-block' */],
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
      this.$emit('update:content', this.$refs.editor.quill.container.firstChild.innerHTML)
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      try {
        this.loading = true

        const formData = new FormData()

        formData.append('image', file)

        const { data } = await this.$axios.post(`/wysiwyg/image`, formData) // аплоад картинки на сервер

        Editor.insertEmbed(cursorLocation, 'image', data.url)
        Editor.formatText(cursorLocation, 1, 'alt', 'image') // Знчение для alt-аттрибута изображения (SEO)

        resetUploader()
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
