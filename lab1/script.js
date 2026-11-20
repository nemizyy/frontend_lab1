const variantNumber = 89;
const targetPosition = (variantNumber % 10) + 1;
const orderedContentElements = document.querySelectorAll("h1, h2, p, li");
const firstTargetId = orderedContentElements[targetPosition - 1].id;
const secondTargetId = orderedContentElements[targetPosition].id;
const firstTarget = document.getElementById(firstTargetId);
const secondTarget = document.querySelector(`#${secondTargetId}`);
const colorStates = [
    { background: "#174a73", text: "#ffffff" },
    { background: "#f2c14e", text: "#202124" }
];

function toggleElementColors(element) {
    const colorIndex = Number(element.dataset.colorIndex || 0);
    const colors = colorStates[colorIndex];

    element.style.backgroundColor = colors.background;
    element.style.color = colors.text;
    element.dataset.colorIndex = (colorIndex + 1) % colorStates.length;
}

firstTarget.addEventListener("click", () => toggleElementColors(firstTarget));
secondTarget.addEventListener("click", () => toggleElementColors(secondTarget));

const imageLink = document.getElementById("image-link");
let image = imageLink.querySelector("img");
const imageSource = image.getAttribute("src");
const imageAlt = image.getAttribute("alt");
const addImageButton = document.getElementById("add-image");
const enlargeImageButton = document.getElementById("enlarge-image");
const shrinkImageButton = document.getElementById("shrink-image");
const removeImageButton = document.getElementById("remove-image");
const imageStatus = document.getElementById("image-status");
const minImageScale = 0.6;
const maxImageScale = 1.8;
const imageScaleStep = 0.2;
let imageScale = 1;

function updateImageControls() {
    const imageExists = image !== null;
    addImageButton.disabled = imageExists;
    enlargeImageButton.disabled = !imageExists || imageScale >= maxImageScale;
    shrinkImageButton.disabled = !imageExists || imageScale <= minImageScale;
    removeImageButton.disabled = !imageExists;
}

function setImageScale(nextScale) {
    const boundedScale = Math.min(maxImageScale, Math.max(minImageScale, nextScale));
    imageScale = Math.round(boundedScale * 10) / 10;
    image.style.width = `${imageScale * 100}%`;
    updateImageControls();
}

addImageButton.addEventListener("click", () => {
    if (image) {
        return;
    }

    image = document.createElement("img");
    image.src = imageSource;
    image.alt = imageAlt;
    imageLink.append(image);
    setImageScale(1);
    imageStatus.textContent = "Зображення додано.";
});

enlargeImageButton.addEventListener("click", () => {
    if (image) {
        setImageScale(imageScale + imageScaleStep);
    }
});

shrinkImageButton.addEventListener("click", () => {
    if (image) {
        setImageScale(imageScale - imageScaleStep);
    }
});

removeImageButton.addEventListener("click", () => {
    if (!image) {
        return;
    }

    image.remove();
    image = null;
    imageScale = 1;
    imageStatus.textContent = "Зображення видалено.";
    updateImageControls();
});

updateImageControls();
