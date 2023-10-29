import "./scss/styles.scss";
import "./components/chart/competence.js";
import "./components/gallery/gallery.js"
import Typed from "typed.js";


new (Typed as any)('#about-me', {
    strings: ['UI/UX Designer', 'Content Creator', 'Software Engineer', 'Artist'],
    typeSpeed: 80,
    showCursor: false,
    loop: true
});