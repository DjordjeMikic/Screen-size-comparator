<script lang="ts">  
  import { onMount } from 'svelte';

  import ScreenRatio from './components/ScreenRatio.svelte';
  import ScreenSize from './components/ScreenSize.svelte';
  import Screens from './components/Screens.svelte';

  import { possibleRations } from './constants';

  import "./app.css";
  import { calculateSideOfScreen } from './helpers';
  import type { Ratios } from './types';
  
  let screenSize1 = 32;
  let screenSize2 = 27;
  let inches1: boolean = true;
  let inches2: boolean = true;
  
  let size1ToCm = screenSize1 * 2.55;
  let size2ToCm = screenSize2 * 2.55;

  let ratios1: Ratios = { height: 9, width: 16 };
  let ratios2: Ratios = { height: 9, width: 16 };

  let screenDimensions1: Ratios = { height: 0, width: 0 };
  let screenDimensions2: Ratios = { height: 0, width: 0 };

  const percent = 500 / 100;

  const changeSize1 = (e) => {
    const num = parseInt(e.target.value);
    screenSize1 = num;
    size1ToCm = inches1 ? num * 2.55 : num;
  }
  
  const changeSize2 = (e) => {
    const num = parseInt(e.target.value);
    size2ToCm = inches2 ? num * 2.55 : num;
  }

  const onChangeInches1 = (e) => { 
    inches1 = e.target.checked;
    size1ToCm = inches1 ? size1ToCm * 2.55 : screenSize1;
  };

  const onChangeInches2 = (e) => {
    inches2 = e.target.checked;
    size2ToCm = inches2 ? size2ToCm * 2.55 : screenSize2;
  };
  
  const setRatio1 = (e) => {
    const arr = e.target.value.split(',').map(Number);
    ratios1 = { height: arr[1], width: arr[0] };

    const calculateSide = calculateSideOfScreen(ratios1, size1ToCm);
    screenDimensions1 = { height: calculateSide('height'), width: calculateSide('width') };
  }

  const setRatio2 = (e) => {
    const arr = e.target.value.split(',').map(Number);
    ratios2 = { height: arr[1], width: arr[0] }

    const calculateSide = calculateSideOfScreen(ratios2, size2ToCm);
    screenDimensions2 = { height: calculateSide('height'), width: calculateSide('width') };
  }

  onMount(() => {
    const calculateSide = calculateSideOfScreen(ratios1, size1ToCm);
    screenDimensions1 = { height: calculateSide('height'), width: calculateSide('width') };

    const calculateSide2 = calculateSideOfScreen(ratios2, size2ToCm);
    screenDimensions2 = { height: calculateSide2('height'), width: calculateSide2('width') };
  })
</script>

<main class="h-screen w-screen flex items-center justify-start flex-col gap-9 p-4 bg-teal-800">
  <h1 class="text-3xl font-bold text-white">Screen ratio</h1>

  <div class="w-3/5 flex items-center justify-center gap-6">
    <div class="w-3/5">
      <ScreenRatio infoLabel="Display 1" options={possibleRations} ratio={0} setRatio={setRatio1} />

      <ScreenSize
        no={1}
        screenSize={screenSize1}
        changeSize={changeSize1}
        inches={inches1}
        onChange={onChangeInches1}
      />
    </div>

    <div class="w-3/5">
      <ScreenRatio infoLabel="Display 2" options={possibleRations} ratio={0} setRatio={setRatio2} />

      <ScreenSize
        no={2}
        screenSize={screenSize2}
        changeSize={changeSize2}
        inches={inches2}
        onChange={onChangeInches2}
      />
    </div>
  </div>
  
  <div class="h-4/5 w-3/5 bg-white relative">
    <Screens
      first
      height={screenDimensions1.height * percent}
      width={screenDimensions1.width * percent}
      fullWidth={screenDimensions1.width > screenDimensions2.width}
    />
    <Screens
      first={false}
      height={screenDimensions2.height * percent}
      width={screenDimensions2.width * percent}
      fullWidth={screenDimensions2.width > screenDimensions1.width}
    />
  </div>

</main>
