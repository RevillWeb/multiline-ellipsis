const $frame = document.querySelector(".frame");
$frame.innerHTML = $frame.innerText.split(" ").map(word => `<span>${word}</span>`).join(" ");

function addEllipsis() {
    const $visibleWords = Array.prototype.slice.call($frame.children).filter(child => child.dataset.visible === "true");
    // If every word is visible then we don't want to add the ellipsis
    if ($visibleWords.length >= $frame.childElementCount) return;
    // Loop through each visible word and remove the last class
    for (let idx = 0, $word; $word = $visibleWords[idx]; idx++) {
        $word.classList.remove("last");
        // If its the last visible word then ensure the last class gets added
        if (idx === ($visibleWords.length - 1)) $word.classList.add("last");
    }
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.dataset.visible = !(entry.intersectionRatio < 1));
    addEllipsis();
}, { root: $frame, threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });

for (let idx = 0, $word; $word = $frame.children[idx]; idx++) {
    observer.observe($word);
}