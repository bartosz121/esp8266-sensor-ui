<script>
  export let size = "md";
  export let extraCls = "";

  /**
   * @param {string} size
   */
  function getSizeCls(size) {
    switch (size) {
      case "sm":
        return "w-8 h-8";
      case "lg":
        return "w-64 h-64";
      default:
        return "w-20 h-20";
    }
  }

  let sizeCls = getSizeCls(size);
</script>

<div
  class={`loader ease-linear rounded-full border-8 border-t-8 border-gray-400 ${sizeCls} ${extraCls}`}
/>

<style>
  .loader {
    border-top-color: #3498db;
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
  }

  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
