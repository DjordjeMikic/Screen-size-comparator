<script lang="ts">
  export let height: number;
  export let width: number;
  export let first: boolean;
  export let fullWidth: boolean;
</script>

<div
  class={`absolute bottom-0 left-0 ${first ? 'first' : 'second'}`}
  style={`height: ${height}px; width: ${width}px`}
></div>

<style>
  .first {
    background-color: blue;
    opacity: 0.75;
    border: 4px solid blue;
  }

  .second {
    background-color: green;
    opacity: 0.75;
    border: 2px solid green;
  }
</style>