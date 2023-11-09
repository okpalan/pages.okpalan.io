// Get references to the eye elements and their lids
const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');
const leftEyeLid = document.querySelector('.left-eye-lid');
const rightEyeLid = document.querySelector('.right-eye-lid');

// Calculate the center positions of the eyes
const eyeSize = parseFloat(getComputedStyle(leftEye).getPropertyValue('--eye-size'));
const eyeCenterX = leftEye.getBoundingClientRect().left + eyeSize / 2;
const eyeCenterY = leftEye.getBoundingClientRect().top + eyeSize / 2;

document.addEventListener('mousemove', (e) => {
    // Calculate the angle and distance of the mouse from the eyes
    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
    const distance = Math.min(eyeSize / 4, Math.hypot(e.clientY - eyeCenterY, e.clientX - eyeCenterX));

    // Update the pupil positions based on the mouse position
    leftEye.querySelector('.pupil').style.transform = `translate(${distance * Math.cos(angle)}px, ${distance * Math.sin(angle)}px)`;
    rightEye.querySelector('.pupil').style.transform = `translate(${distance * Math.cos(angle)}px, ${distance * Math.sin(angle)}px)`;

    // Toggle eyelid open/closed based on mouse position
    if (e.clientY < eyeCenterY) {
        leftEyeLid.classList.add('open');
        rightEyeLid.classList.add('open');
        leftEyeLid.classList.remove('close');
        rightEyeLid.classList.remove('close');
    } else {
        leftEyeLid.classList.add('close');
        rightEyeLid.classList.add('close');
        leftEyeLid.classList.remove('open');
        rightEyeLid.classList.remove('open');
    }
});