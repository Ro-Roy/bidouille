const countEl = document.getElementById("count");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

plusBtn.addEventListener("click", () => {
    countEl.innerHTML = Number(countEl.innerHTML) + 1;
});

minusBtn.addEventListener("click", () => {
    countEl.innerHTML = Number(countEl.innerHTML) - 1;
});
