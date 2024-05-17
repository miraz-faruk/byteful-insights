const loadPosts = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const posts = data;
    // console.log(data);
    displayPosts(posts);

}

const displayPosts = posts =>{
    // console.log(posts);
    const postContainer = document.getElementById('post-container');

    posts.forEach(post =>{
        console.log(post);

        const postCard = document.createElement('div');
        postCard.classList = `card w-auto border border-[#12132D26] rounded-3xl p-5`;

        postCard.innerHTML = `
        <figure><img class="rounded-[20px] pb-6" src="${post.cover_image}" alt="Shoes" /></figure>
        <div>
            <div class="flex items-center gap-2 text-[#12132D99] pb-4">
                <i class="fa-regular fa-calendar-days"></i>
                <p>${post.author.posted_date || 'No publish date'}</p>
            </div>
            <h2 class="card-title text-lg font-extrabold pb-3">${post.title}</h2>
            <p class="pb-4 text-[#12132D99]">${post.description}</p>
            <div class="flex gap-4">
                <img class="w-11 h-11 rounded-full" src="${post.profile_image}" alt="">
                <div class="">
                    <h3 class="font-bold">${post.author.name}</h3>
                    <p>${post.author.designation || 'unknown'}</p>
                </div>
            </div>
            </div>
        `;
        postContainer.appendChild(postCard);
    })
}

loadPosts();