const createElement = (arr) => {
    const createHtml = arr.map((el) => `<span><button class="border-1 border-gray-300 bg-sky-200 rounded-sm px-4 py-1">${el}</button></span>`)
    return createHtml;
}

// const { createElement } = require("react");

const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => display(json.data));
}

const loadLevel = (Id) => {
    const url = `https://openapi.programming-hero.com/api/level/${Id}`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            const clickBtn = document.getElementById(`lesson-btn-${Id}`);
            removeActive();
            clickBtn.classList.add("active");
            displayWord(json.data)
        });
}

const removeActive = () => {
    const getActiveClass = document.querySelectorAll(".lesson-btn");
    getActiveClass.forEach(btn => btn.classList.remove("active"));
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (details) => {
    const parent = document.getElementById("details-container");
    parent.innerHTML = "";
    const child = document.createElement("div");
    child.innerHTML = `
    <div class="text-left border-2 p-5 border-blue-200 rounded-[5px] space-y-5">
        <div class="font-bold text-2xl">${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})</div>
        <div>
            <h1 class="font-semibold">Meaning</h1>
            <h1 class="font-medium">${details.meaning}</h1>
        </div>
        <div>
            <h1 class="font-semibold">Example</h1>
            <h1>${details.sentence}</h1>
        </div>
        <div>
            <h1 class="font-semibold text-[20px]">সমার্থক শব্দ গুলো</h1>
            <div class="flex gap-5">
               ${createElement(details.synonyms).join("")}
            </div>
        </div>
    </div>
            
    `;
    parent.appendChild(child);

    document.getElementById("modal-details").showModal();
}

const displayWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full font-bangla">
            <img src="assets/alert-error.png" alt="" class="mx-auto">
            <p class="text-[16px] text-gray-400">আপনি এখনো কোন Lesson Select করেন নি</p>
            <h1 class="font-medium text-[34px]">একটি Lesson Select করুন।</h1>
        </div>
        `;
        return;
    }

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="border-none p-5 bg-white rounded-lg">
            <div class="text-center space-y-5">
                <h1 class="font-bold text-[32px]">${word.word ? word.word : "Not found"}</h1>
                <h1 class="font-semibold">meaning / pronunciation</h1>
                <h1 class="font-semibold text-[32px]">${word.meaning ? word.meaning : "Not found"} / ${word.pronunciation ? word.pronunciation : "Not found"}</h1>
            </div>
            <div class="flex justify-between items-center pt-5">
                <div onclick="loadWordDetail(${word.id})" class="bg-blue-200 hover:bg-blue-400 p-3 border-none rounded-2xl"><i class="fa-solid fa-circle-exclamation"></i></div>
                <div class="bg-blue-200 hover:bg-blue-400 p-3 border-none rounded-2xl"><i class="fa-solid fa-volume-high"></i></div>
            </div>
        </div>
        `;

        wordContainer.appendChild(card);
    })

}

const display = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    lessons.forEach(lesson => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevel(${lesson.level_no})" class="lesson-btn btn btn-soft btn-primary"><i class="fa-solid fa-book-open"></i>
        Lesson-${lesson.level_no}</button>
        `;

        levelContainer.appendChild(btnDiv);

    })
}
loadData();