<script>
  export let className = "";
</script>

<div class={`bg-white m-4 p-4 rounded-lg shadow-xl ${className}`}>
  <slot />
</div>
