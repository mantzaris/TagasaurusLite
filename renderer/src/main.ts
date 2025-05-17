import "./app.css";
import App from "./App.svelte";
import { mount } from "svelte";

import "../assets/bootstrap/js/bootstrap.min.js";

let app: any = null;

try {
  window.ASSET_PATH = {
    branding: {
      cuttleFish: new URL('../assets/branding/cuttleFish.png', import.meta.url).href
    }
  };

  console.log(window.ASSET_PATH);
} catch (error) {
  console.error("Error setting up asset paths:", error);
}

app = mount(App, {
  target: document.getElementById("app") as HTMLElement,
});

export default app;
