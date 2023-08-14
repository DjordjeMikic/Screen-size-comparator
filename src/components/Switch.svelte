<script lang="ts">
  export let no: number;
  export let checked: boolean;
  export let change: (e) => void;
</script>

<div class="w-20">
  <label for={`switch-${no}`} class={`label ${checked ? "on" : ""}`}>
    <div class={`circle ${checked ? "right" : ""}`} />
  </label>

  <input
    type="checkbox"
    id={`switch-${no}`}
    class="switch"
    on:change={change}
    bind:value={checked}
    bind:checked
  />
</div>

<style>
  .switch {
    display: none;
  }

  .label {
    height: 100%;
    width: 100%;
    display: block;
    cursor: pointer;
    padding: 4px;
    border-radius: 23px;
    background-color: crimson;
    position: relative;
    transition: all 0.4s;
  }

  .on {
    background-color: blue;
  }

  .circle {
    height: 31px;
    width: 31px;
    border-radius: 50%;
    background-color: aliceblue;
    position: absolute;
    top: 50%;
    left: 4px;
    transform: translateY(-50%);
    transition: all 0.4s;
  }

  .right {
    left: 56%;
  }
</style>
