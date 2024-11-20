const container = document.querySelector('.container');
const loadingText = document.getElementById('loading');

let page = 1;

async function load() {
    try {
        loadingText.disabled = false;
        const res = await fetch (`https://api.unsplash.com/search/photos?page=${page ++}&query=random&client_id=RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw`);
        if (!res.ok) throw new Error("Error in fetching images");
        
        const data = await res.json();

        data.results.forEach(obj => {
            let div = `
                <div class="img-div">
                    <img src="${obj.urls.regular}" alt="${obj.alt_description}">
                </div>
            `;
            container.innerHTML += div;
        });
        loadingText.disabled = true;
    }

    catch(error) {
        console.error(error);
    }
}

load();

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY + window.innerHeight;
    const threshold = document.body.offsetHeight - 5;

    if (scrolled >= threshold) load();
});