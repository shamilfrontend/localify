<template>
  <div class="key-comments">
    <div ref="commentsList" class="comments-list">
      <key-comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>

    <div class="add-comment">
      <el-input
        v-model="message"
        type="textarea"
        class="add-comment__field"
        resize="none"
        :rows="3"
        placeholder="Введите текст комментария..."
      />
      <el-button
        type="primary"
        class="add-comment__btn"
        :loading="isLoading"
        @click="handleAddCommentBtnClick"
      >
        Добавить
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import KeyComment from './KeyComment'

export default {
  name: 'KeyComments',

  components: {
    KeyComment
  },

  props: {
    keyId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      message: '',
      isLoading: false,
      intervalId: null
    }
  },

  computed: {
    ...mapState('auth', ['currentUser']),
    ...mapState('comments', ['comments'])
  },

  mounted() {
    this.getCommentsByInterval()
  },

  beforeDestroy() {
    clearInterval(this.intervalId)
  },

  methods: {
    ...mapActions('comments', ['fetchCommentsByKeyId', 'createCommentToKey']),
    ...mapMutations('projects', [
      'incrementCommentsByKeyId',
      'setCommentsByKeyId'
    ]),

    getCommentsByInterval() {
      try {
        this.intervalId = setInterval(() => {
          this.fetchCommentsByKeyId(this.keyId).then((response) => {
            this.setCommentsByKeyId({
              keyId: this.keyId,
              length: response.length
            })
          })
        }, 5000)
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при загрузке комментариев'
        })
      }
    },

    async handleAddCommentBtnClick() {
      this.isLoading = true

      try {
        await this.createCommentToKey({
          keyId: this.keyId,
          body: {
            userId: this.currentUser.id,
            message: this.message
          }
        })

        const { commentsList } = this.$refs
        commentsList.scrollTop = commentsList.scrollHeight
        this.incrementCommentsByKeyId(this.keyId)
        this.message = ''
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при создании комментария'
        })
      }

      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
$addCommentHeight: 155px;
$drawerHeaderHeight: 75px;

.key-comments {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.comments-list {
  height: calc(100vh - #{$drawerHeaderHeight} - #{$addCommentHeight});
  overflow-y: auto;
}

.add-comment {
  min-height: $addCommentHeight;
  padding: 16px;
  background-color: #eee;

  &__field {
    display: block;
    margin-bottom: 12px;
  }

  &__btn {
    display: block;
    margin-left: auto;
  }
}
</style>
