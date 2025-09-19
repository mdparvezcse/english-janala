const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => display(json.data));
}

const loadLevel = (Id) => {
    const url =`https://openapi.programming-hero.com/api/level/${Id}`
    fetch(url)
    .then(res => res.json())
    .then(json => displayWord(json.data));
}

const displayWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML= "";
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML=`
        <div class="border-none p-5 bg-white rounded-lg">
            <div class="text-center space-y-5">
                <h1 class="font-bold text-[32px]">${word.word}</h1>
                <h1 class="font-semibold">meaning / pronunciation</h1>
                <h1 class="font-semibold text-[32px]">${word.meaning} / ${word.pronunciation}</h1>
            </div>
            <div class="flex justify-between items-center pt-5">
                <div class="bg-blue-200 p-3 border-none rounded-2xl"><i class="fa-solid fa-circle-exclamation"></i></div>
                <div class="bg-blue-200 p-3 border-none rounded-2xl"><i class="fa-solid fa-volume-high"></i></div>
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
        <button onclick="loadLevel(${lesson.level_no})" class="btn btn-soft btn-primary"><i class="fa-solid fa-book-open"></i>
        Lesson-${lesson.level_no}</button>
        `;

        levelContainer.appendChild(btnDiv);

    })
}
loadData();