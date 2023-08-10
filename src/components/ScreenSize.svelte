<script lang="ts">
  import Switch from "./Switch.svelte";

  export let no: number;
  export let screenSize: number;
  export let changeSize: (e) => void;

  export let inches: boolean;
  export let onChange: (e) => void;
</script>

<div>
  <div class="w-full flex items-center justify-between">   
    <label for={`size-${no}`} class="block my-2 font-medium text-white dark:text-white text-align-left">
      Size    
    </label>
    <p class="block my-2 font-medium text-white dark:text-white text-align-left">
      {!!inches ? "Inches" : "Cm"}
    </p>
  </div>

  <div class="w-full flex justify-between">
    <input
      id={`size-${no}`}
      type="number"
      placeholder="0"
      class="w-3/5 bg-gray-50 text-xl border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      bind:value={screenSize}
      on:change={changeSize}
    />
    
    <Switch no={no} checked={inches} change={onChange} />
  </div>
</div>