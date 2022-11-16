<template>
  <div class="the-logo">
    <svg
      width="31"
      height="29"
      fill="none"
      class="the-logo__icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.74 29H3.088l-.809-5.133 2.892-1.427a2.563 2.563 0 001.396-2.071l.441-6.859c.294-4.465 3.774-7.595 8.479-7.595 4.778 0 8.11 2.97 8.453 7.572l.49 6.905c.05.852.564 1.634 1.373 2.049l2.94 1.634L27.74 29zM5.514 26.238h19.823l.245-.736-1.225-.645c-1.666-.874-2.744-2.486-2.867-4.28l-.49-6.906c-.123-1.496-.882-5.017-5.538-5.017-3.602 0-5.366 2.509-5.538 4.994l-.44 6.86c-.123 1.817-1.201 3.428-2.892 4.326l-1.225.668.147.736zM.001 13.257C-.072 7.365 3.824 2.048 9.704 0l.637 1.611c-5.145 1.795-8.551 6.445-8.478 11.6l-1.862.046z"
        fill="currentColor"
      />
      <path
        d="M3.653 13.257C3.555 8.792 6.495 4.764 10.955 3.2l.637 1.611c-3.725 1.29-6.2 4.673-6.126 8.401l-1.813.046zM30.998 13.257l-1.838-.023c.074-5.156-3.332-9.805-8.478-11.6L21.32.022C27.2 2.048 31.096 7.365 31 13.257z"
        fill="currentColor"
      />
      <path
        d="M27.372 13.257l-1.838-.023c.074-3.728-2.377-7.089-6.126-8.4l.637-1.612c4.484 1.542 7.425 5.57 7.327 10.035z"
        fill="currentColor"
      />
    </svg>
    <span class="the-logo__text" :class="{ 'the-logo__text_hide': isCollapsed }"
      >csp</span
    >
  </div>
</template>

<script>
export default {
  name: 'IconLogo',

  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.the-logo {
  display: inline-flex;
  align-items: center;
  color: inherit;

  &__text {
    margin-left: 10px;
    font-size: 28px;
    font-weight: var(--font-weight-base);
    letter-spacing: 0.2px;
    opacity: 1;
    transition: opacity 0.25s ease 0.1s;

    &_hide {
      opacity: 0;
      transition: opacity 0.5s ease;
    }
  }

  &__icon {
    min-width: 31px;
  }
}
</style>
