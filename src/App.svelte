<script lang="ts">
  import { beforeUpdate } from "svelte";

  import ScreenRatio from "./components/ScreenRatio.svelte";
  import ScreenSize from "./components/ScreenSize.svelte";
  import Screens from "./components/Screens.svelte";

  import { possibleRations } from "./constants";
  import type { Ratios } from "./types";
  import { calculateSideOfScreen } from "./helpers";
  import "./app.css";

  let screenSizeFirst: number = 32;
  let screenSizeSecond: number = 27;
  let isInchesFirst: boolean = true;
  let isInchesSecond: boolean = true;

  let firstScreenSizeToCm: number = screenSizeFirst * 2.55;
  let secondScreenSizeToCm: number = screenSizeSecond * 2.55;

  let firstScreenRatios: Ratios = { height: 9, width: 16 };
  let secondScreenRatios: Ratios = { height: 9, width: 16 };

  let screenDimensionsFirst: Ratios = { height: 0, width: 0 };
  let screenDimensionsSecond: Ratios = { height: 0, width: 0 };

  $: percent = isInchesFirst && screenSizeFirst < 37 && isInchesSecond && screenSizeSecond < 37 ? 10 : 5;

  // Change screens size
  const changeSizeFirstScreen = (e) => {
    const num = parseInt(e.target.value);
    screenSizeFirst = num;
    firstScreenSizeToCm = isInchesFirst ? num * 2.55 : num;
  };

  const changeSizeSecondScreen = (e) => {
    const num = parseInt(e.target.value);
    screenSizeSecond = num;
    secondScreenSizeToCm = isInchesSecond ? num * 2.55 : num;
  };

  // Select measure type (inches or cm)
  const onChangeInchesFirstScreen = (e) => {
    isInchesFirst = e.target.checked;
    firstScreenSizeToCm = isInchesFirst ? firstScreenSizeToCm * 2.55 : screenSizeFirst;
  };

  const onChangeInchesSecondScreen = (e) => {
    isInchesSecond = e.target.checked;
    secondScreenSizeToCm = isInchesSecond ? secondScreenSizeToCm * 2.55 : screenSizeSecond;
  };

  // Calculate dimensions of the sides
  const calculateDimensionsOnFirstScreen = () => {
    const calculateSide = calculateSideOfScreen(firstScreenRatios, firstScreenSizeToCm);
    screenDimensionsFirst = {
      height: calculateSide("height"),
      width: calculateSide("width"),
    };
  };

  const calculateDimensionsOnSecondScreen = () => {
    const calculateSide2 = calculateSideOfScreen(secondScreenRatios, secondScreenSizeToCm);
    screenDimensionsSecond = {
      height: calculateSide2("height"),
      width: calculateSide2("width"),
    };
  };

  // Change Screen Ratios
  const setFirstScreenRatio = (e) => {
    const arr = e.target.value.split(",").map(Number);
    firstScreenRatios = { height: arr[1], width: arr[0] };
    calculateDimensionsOnFirstScreen();
  };

  const setSecondScreenRatio = (e) => {
    const arr = e.target.value.split(",").map(Number);
    secondScreenRatios = { height: arr[1], width: arr[0] };
    calculateDimensionsOnSecondScreen();
  };

  beforeUpdate(() => {
    calculateDimensionsOnFirstScreen();
    calculateDimensionsOnSecondScreen();
  });
</script>

<main
  class="h-screen w-screen flex items-center justify-start flex-col gap-9 p-4 bg-slate-800"
>
  <h1 class="text-3xl font-bold text-white">Screen ratio</h1>

  <div class="w-3/5 flex items-center justify-center gap-6">
    <div class="w-3/5">
      <ScreenRatio
        infoLabel="Display 1"
        options={possibleRations}
        setRatio={setFirstScreenRatio}
      />

      <ScreenSize
        no={1}
        screenSize={screenSizeFirst}
        changeSize={changeSizeFirstScreen}
        inches={isInchesFirst}
        onChange={onChangeInchesFirstScreen}
      />
    </div>

    <div class="w-3/5">
      <ScreenRatio
        infoLabel="Display 2"
        options={possibleRations}
        setRatio={setSecondScreenRatio}
      />

      <ScreenSize
        no={2}
        screenSize={screenSizeSecond}
        changeSize={changeSizeSecondScreen}
        inches={isInchesSecond}
        onChange={onChangeInchesSecondScreen}
      />
    </div>
  </div>

  <div id="screen-container" class="h-4/5 w-3/5 relative">
    <Screens
      first
      height={screenDimensionsFirst.height * percent}
      width={screenDimensionsFirst.width * percent}
    />
    <Screens
      height={screenDimensionsSecond.height * percent}
      width={screenDimensionsSecond.width * percent}
    />
  </div>
</main>
