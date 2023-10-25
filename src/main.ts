import "./scss/styles.scss";

import "./components/competence/competence-chart.js";

import Typed from "typed.js";

new (Typed as any)('#about-me', {
    strings: [' Web Developer', ' Content Creator', 'Pythonista'],
    typeSpeed: 80,
    showCursor: false,
    loop: true
});


