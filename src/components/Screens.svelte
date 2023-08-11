<script lang="ts">
  export let height: number;
  export let width: number;
  export let first: boolean;
</script>

<div
  class={`absolute bottom-0 left-0 ${first ? 'first' : 'second'}`}
  style={`height: ${height}px; width: ${width}px`}
></div>

<style>
  .first {
    background-color: rgb(71, 71, 244);
    opacity: 0.4;
    border: 4px solid rgb(28, 28, 131);
  }

  .second {
    background-color: rgb(15, 173, 15);
    opacity: 0.4;
    border: 4px solid rgb(12, 60, 12);
  }
</style>