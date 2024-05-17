const loadTopics = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const topics = data.posts;
    // console.log(topics);
    displayTopics(topics);
}

const displayTopics = topics => {
    // console.log(topics);
    const topicContainer = document.getElementById('topic-container');

    topics.forEach(topic => {
        console.log(topic);
        // 2. Create div
        const topicCard = document.createElement('div');
        topicCard.classList = `w-full bg-[#F3F3F5] flex gap-6 p-5 lg:p-10 rounded-3xl`;
        // 3. set innerHTML
        topicCard.innerHTML = `
        <div class="relative ">
            <figure><img class="rounded-2xl w-auto lg:w-[72px]" src="${topic.image}" alt="Shoes" /></figure>
            <div class="absolute -top-1 -right-1 w-4 h-4 ${topic.isActive ? 'bg-green-500' : 'bg-red-500'} rounded-full border-2 border-white"></div>
        </div>
        <div class="w-full">
            <div class="flex gap-5 text-[#12132DCC] font-mulish-small pb-3">
                <p># ${topic.category}</p>
                <p>Author : ${topic.author.name}</p>
            </div>
            <h2 class="card-title mulish-medium text-xl pb-4">${topic.title}</h2>
            <p class="text-[#12132D99] pb-5">${topic.description}</p>
            <hr class="border-[#12132D40] border-dashed pb-5">
            <div class="text-[#12132D99] flex justify-between gap-3 lg:gap-0">
                <div class="flex gap-6">
                    <div class="flex items-center gap-3">
                        <i class="fa-regular fa-message"></i>
                        <p>${topic.comment_count}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="fa-regular fa-eye"></i>
                        <p>${topic.view_count}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="fa-regular fa-clock"></i>
                        <p>${topic.posted_time}</p>
                    </div>
                </div>
                <div class="bg-[#10B981] rounded-full">
                    <i class="fa-solid fa-envelope-open p-2 text-white"></i>
                </div>
            </div>
        </div>
        `;
        // 4. append child
        topicContainer.appendChild(topicCard);
    })
}

loadTopics();