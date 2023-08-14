<script lang="ts">
  import type { OptionType } from "../types";

  export let infoLabel: string;
  export let options: OptionType[];
  export let setRatio: (e) => void;
</script>

<div class="w-full flex items-start flex-col">
  <label
    for="ratios"
    class="block mb-2 font-medium text-white dark:text-white text-align-left"
  >
    {infoLabel}: aspect
  </label>

  <select
    id="ratios"
    class="w-full bg-gray-50 text-xl border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    on:change={setRatio}
  >
    {#each options as { value, label }, index}
      <option
        selected={!index}
        value={value.split(" x ")}
        class="text-gray-900 bg-gray-50 active:ring-red-500"
      >
        {label}
      </option>
    {/each}
  </select>
</div>

<style>
  label {
    text-align: left;
  }
  
  option {
    font-size: 1.2rem;
    padding: 14px;
    color: darkblue;
  }
</style>
