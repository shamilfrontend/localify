<template>
  <div
    class="comment"
    :class="{ comment_me: currentUser.id === comment.userId }"
  >
    <div class="comment__inner">
      <div
        class="comment__avatar"
        :style="`background-color: ${comment.color}`"
      >
        {{ getAvatarName(comment.name) }}
      </div>
      <div class="comment__content">
        <div class="comment__name">
          <strong>{{ comment.name }}</strong>
        </div>
        <el-input
          v-if="isEdit"
          ref="messageField"
          v-model="newMessage"
          v-click-outside="handleOutsideFieldClick"
          type="textarea"
          autosize
        />
        <p v-else class="comment__message">{{ comment.message }}</p>
      </div>

      <div v-if="canChange" class="comment__actions">
        <template v-if="isEdit">
          <el-tooltip
            class="comment__edit"
            content="Сохранить комментарий"
            placement="top"
          >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-check"
              circle
              :disabled="!newMessage"
              @click="handleCommentSaveClick"
            />
          </el-tooltip>
          <el-tooltip
            class="comment__delete"
            content="Отменить"
            placement="top"
          >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-circle-close"
              circle
              @click="isEdit = false"
            />
          </el-tooltip>
        </template>
        <template v-else>
          <el-tooltip
            class="comment__edit"
            content="Изменить комментарий"
            placement="top"
          >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              circle
              @click="handleCommentEditClick"
            />
          </el-tooltip>
          <el-tooltip
            class="comment__delete"
            content="Удалить комментарий"
            placement="top"
          >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
              @click="handleCommentDeleteBtnClick"
            />
          </el-tooltip>
        </template>
      </div>
      <span class="comment__date">{{ comment.createdAt }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import { getAvatarName } from '@/common/helpers'

export default {
  name: 'KeyComment',

  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isEdit: false,
      newMessage: ''
    }
  },

  computed: {
    ...mapState('auth', ['currentUser']),

    canChange() {
      return this.currentUser.id === this.comment.userId
    }
  },

  mounted() {
    this.newMessage = this.comment.message
  },

  methods: {
    ...mapActions('comments', ['removeCommentBiID', 'updateCommentBiID']),
    ...mapMutations('projects', ['decreaseCommentsByKeyId']),

    getAvatarName(userName) {
      return getAvatarName(userName)
    },

    handleCommentDeleteBtnClick() {
      this.$confirm('Вы действительно хотите удалить комментарий?', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning'
      })
        .then(async () => {
          try {
            await this.removeCommentBiID({
              keyId: this.comment.keyId,
              commentId: this.comment.id
            })

            this.decreaseCommentsByKeyId()

            this.$notify({
              type: 'success',
              message: 'Комментарий удален'
            })
          } catch (e) {
            this.$notify({
              type: 'error',
              message: 'Ошибка при удалении комментария'
            })
          }
        })
        .catch(() => {
          // do nothing
        })
    },

    handleOutsideFieldClick() {
      this.isEdit = false
    },

    handleCommentEditClick() {
      this.isEdit = true
      setTimeout(() => {
        this.$refs.messageField.focus()
      }, 50)
    },

    async handleCommentSaveClick() {
      try {
        await this.updateCommentBiID({
          keyId: this.comment.keyId,
          commentId: this.comment.id,
          message: this.newMessage
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при обновлении комментария'
        })
      }

      this.isEdit = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/mixins/avatarStyles';

.comment {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 16px 24px;
  color: #292b2c;
  border-radius: 8px;

  &__inner {
    position: relative;
    display: flex;
    align-items: flex-start;
    width: 88%;
    min-height: 120px;
    padding: 15px 15px 50px;
    border-radius: 12px;
    background-color: #f6f6f6;
  }

  &__avatar {
    @include avatarStyles;

    min-width: 40px;
    margin-right: 16px;
  }

  &__content {
    flex-grow: 1;
  }

  &__name {
    margin-bottom: 10px;
  }

  &__message {
    margin-bottom: 12px;
  }

  &__date {
    position: absolute;
    right: 20px;
    bottom: 15px;
    font-size: 12px;
    color: #777;
  }

  &__actions {
    position: absolute;
    left: 20px;
    bottom: 15px;
  }

  &__delete {
    margin-left: 2px;
  }

  &__edit {
    margin-left: 0;
  }

  &_me {
    justify-content: flex-end;

    .comment__inner {
      flex-direction: row-reverse;
      background-color: #e3effd;
    }

    .comment__avatar {
      margin-right: 0;
      margin-left: 16px;
    }

    .comment__date {
      text-align: left;
      margin-left: 0;
      margin-right: 12px;
    }

    .comment__delete {
      left: auto;
      right: 20px;
      bottom: 15px;
    }
  }
}
</style>
