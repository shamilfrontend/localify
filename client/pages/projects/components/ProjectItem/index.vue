<template>
  <div class="project-item">
    <button
      class="project-item__title"
      type="button"
      @click="handleTitleClick(id)"
    >
      {{ name }}
    </button>
    <div class="project-item__bottom">
      <p class="project-item__description">{{ description }}</p>
      <div class="members">
        <div
          v-for="(member, index) in members.slice(0, 3)"
          :key="member.id"
          class="members__item"
          :style="getAvatarStyles(member.color, index)"
          :title="member.name"
        >
          {{ member.shortName }}
        </div>
        <div v-if="members.length > 3" class="members__item members__item_more">
          +{{ members.length - 3 }}
        </div>
      </div>
    </div>
    <div class="languages">
      <div v-for="language in languages" :key="language.id" class="language">
        <div class="language__heading">
          <img
            class="language__icon"
            :src="`/languages/${language.code}.svg`"
            :alt="language.code"
          />
          <span class="language__name">{{ language.name }}</span>
        </div>
        <div class="language__content">
          <div class="language__content-item">
            <div class="language__content-item-label">Done</div>
            <div class="language__content-item-value">
              {{ language.progress }}%
            </div>
          </div>
          <div class="language__content-item">
            <div class="language__content-item-label">Keys</div>
            <div class="language__content-item-value">
              {{ language.quantityKeys }}
            </div>
          </div>
          <div class="language__content-item">
            <div class="language__content-item-label">Translated</div>
            <div class="language__content-item-value">
              {{ language.translated }} keys
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectItem',

  props: {
    id: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    members: {
      type: Array,
      default: () => []
    },
    languages: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    handleTitleClick(id) {
      this.$router.push(`/projects/${id}`)
    },

    getAvatarStyles(color, index) {
      return `background-color: ${color}; z-index: ${index + 1}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/mixins/buttonDefaultStylesReset';
@import '~/assets/styles/mixins/avatarStyles';

.project-item {
  padding: 0 0 4px;

  &__title {
    @include buttonDefaultStylesReset;

    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: var(--color-primary-blue);
    user-select: text;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4px;
    border-bottom: 1px solid #a5adba;
  }

  &__description {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #c1c7d0;
  }
}

.members {
  display: flex;
  justify-content: flex-end;

  &__item {
    @include avatarStyles(32px, 32px);

    position: relative;
    margin-left: -16px;

    &_more {
      z-index: 10;
      background-color: #dfe1e6;
    }
  }
}

.languages {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  margin-top: 15px;
}

.language {
  &__heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 5px;
    padding-bottom: 8px;
    border-bottom: 1px solid #a5adba;
  }

  &__icon {
    display: block;
    margin-right: 5px;
    min-height: 20px;
  }

  &__name {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: var(--color-primary-blue);
  }

  &__content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    &-item {
      font-size: 12px;
      line-height: 16px;

      &-label {
        color: #a5adba;
      }

      &-value {
        color: #061938;
      }
    }
  }
}
</style>
