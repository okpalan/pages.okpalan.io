import "./scss/styles.scss";
import "./components/chart/index.js";
import "./components/hemispheres/index.js";
import "./components/torch/index.js";


import Typed from "typed.js";

import { loadScripts } from '@/utils/index.js';
const scriptLocations = ['./src/lib/css3d.js'];

loadScripts(scriptLocations, (() => { console.log("Script Loaded") }));
new (Typed as any)('#about-me', {
    strings: ['UI/UX Designer', 'Content Creator', 'Software Engineer', 'Artist'],
    typeSpeed: 80,
    showCursor: false,
    loop: true
});