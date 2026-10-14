

const STORAGE_KEY = 'club_board_posts';/* add a real bankend here tkn*/


const defaultPosts = [
    { id: 1, club: 'Robotics', title: 'Its not real', date: 'Oct 14, 2026', content: 'revolt' },
    { id: 2, club: 'Drama', title: 'Miros catcphrase will be said', date: 'Oct 14, 2026', content: 'come to the auditorium "noshiut shelock"' },
    { id: 3, club: 'Chess', title: 'Garb Gubta firing squad!', date: 'Oct 14, 2026', content: 'we will mate his ass(not sexual)' }
];


function fetchPosts() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
        return defaultPosts;
    }
    return JSON.parse(saved);
}


function createPost(newPost) {
    const posts = fetchPosts();
    const updatedPosts = [newPost, ...posts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    return updatedPosts;
}