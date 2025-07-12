<script lang="ts">
//   import { canvasToTensor } from "./testing.svelte";


import * as onnxruntime from 'onnxruntime-web';


const MODEL_PATH_DETECTION = '...'
const MODEL_PATH_EMBEDDING = '...'



let canvas: HTMLCanvasElement;
let inputEl: HTMLInputElement;
let ctx: CanvasRenderingContext2D | null;

function onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];

    if(!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            if(!canvas) return;

            ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img,0,0);
        }

        img.src = reader.result as string;
    }

    reader.readAsDataURL(file);
    reader.onloadend = () => {
        const tnsr = canvasToTensor(canvas);
        // console.log(tnsr);
    }
}

function canvasToTensor(cnv: HTMLCanvasElement) {
  const W = 112, H = 112, size = W * H;
  const imgData = cnv.getContext('2d')!.getImageData(0,0,W,H).data;
  const arr = new Float32Array(3 * size);
  for (let i = 0; i < size; ++i) {
    const r = imgData[i*4    ];
    const g = imgData[i*4 + 1];
    const b = imgData[i*4 + 2];
    // InsightFace expects BGR, (v-127.5)/128
    arr[i]          = (b - 127.5) / 128;
    arr[i +   size] = (g - 127.5) / 128;
    arr[i + 2*size] = (r - 127.5) / 128;
  }
  return new (onnxruntime as any).Tensor('float32', arr, [1,3,H,W]);
}

</script>

<input type="file" accept="image/*" bind:this={inputEl} onchange={onFileChange}>
<canvas bind:this={canvas}></canvas>


