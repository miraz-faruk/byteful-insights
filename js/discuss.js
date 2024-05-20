const loadTopics = async (searchText = '') => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const topics = data.posts;

    // Filter topics based on searchText
    const filteredTopics = topics.filter(topic =>
        topic.category.toLowerCase().includes(searchText.toLowerCase())
    );

    displayTopics(filteredTopics);
};

const displayTopics = topics => {
    // console.log(topics);
    const topicContainer = document.getElementById('topic-container');

    // Clear topic container card before adding new cards
    topicContainer.textContent = '';

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
                <button id="mark-as-read" onclick="readingHistory('${topic.id}', '${topic.title}', '${topic.view_count}')"><i class="fa-solid fa-envelope-open p-2 text-white"></i></button>
                </div>
            </div>
        </div>
        `;
        // 4. append child
        topicContainer.appendChild(topicCard);
    });
    // Hide loading spinner
    setTimeout(() => {
        toggleLoadingSpinner(false);
    }, 2000);
}

// Function to update the reading count
let readingCount = 0;
const updateReadingCount = () => {
    const readingCountElement = document.getElementById('reading-count');
    readingCount++;
    readingCountElement.textContent = readingCount;
};

// Reading history
const readingHistory = (id, title, view_count) => {

    updateReadingCount();
    // Display the updated reading count
    const readingCountElement = document.getElementById('reading-count');
    readingCountElement.textContent = readingCount;

    // Create a new div to contain the title and view count
    const newPostElement = document.createElement('div');
    newPostElement.classList.add('flex', 'justify-between', 'mb-4', 'bg-white', 'rounded-2xl', 'p-4');

    // Create a new h3 element for the title
    const newTitleElement = document.createElement('h3');
    newTitleElement.classList.add('font-semibold');
    newTitleElement.textContent = title;

    // Create a new div to contain the view count icon and text
    const viewCountContainer = document.createElement('div');
    viewCountContainer.classList.add('flex', 'gap-2', 'items-center', 'text-[#12132D99]');

    // Create a new icon element and p element for the view count
    const viewCountIcon = document.createElement('i');
    viewCountIcon.classList.add('fa-regular', 'fa-eye');
    const viewCountText = document.createElement('p');
    viewCountText.textContent = view_count;

    // Append the title and view count elements to the new post element
    newPostElement.appendChild(newTitleElement);
    viewCountContainer.appendChild(viewCountIcon);
    viewCountContainer.appendChild(viewCountText);
    newPostElement.appendChild(viewCountContainer);

    // Get the topic-details section
    const topicDetails = document.getElementById('topic-details');

    // Append the new post element to the topic-details section
    topicDetails.appendChild(newPostElement);
};

// Handle search
const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadTopics(searchText);
}

// Toggle loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}
loadTopics();