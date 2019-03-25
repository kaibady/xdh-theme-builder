<template>
  <div class="preview">
    <h2>{{title}}</h2>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Preview',
    props: {
      title: String
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/vars";

  .preview {
    margin-bottom: 30px;
  }

  .body {
    border: $--border-base;
    padding: 20px;
  }
</style>
