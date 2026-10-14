function ClubBoard() {
    const [selectedClub, setSelectedClub] = React.useState('All');
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        const loadedPosts = fetchPosts();
        setPosts(loadedPosts);
    }, []);

    const [newClub, setNewClub] = React.useState('Robotics');
    const [newTitle, setNewTitle] = React.useState('');
    const [newContent, setNewContent] = React.useState('');

    const clubs = ['All', 'Robotics', 'Drama', 'Chess'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;

        const newPost = {
            id: Date.now(),
            club: newClub,
            title: newTitle,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            content: newContent
        };

        const updatedPosts = createPost(newPost);
        setPosts(updatedPosts);

        setNewTitle('');
        setNewContent('');
    };

    const filteredPosts = selectedClub === 'All' 
        ? posts 
        : posts.filter(post => post.club === selectedClub);

    return (
        <div>
            {/* Form */}
            <form onSubmit={handleSubmit} className="announcement-form">
                <h3>Add a New Announcement</h3>
                
                <div className="form-group">
                    <label>Club:</label>
                    <select 
                        value={newClub} 
                        onChange={(e) => setNewClub(e.target.value)}
                        className="form-input"
                    >
                        {clubs.filter(c => c !== 'All').map(club => (
                            <option key={club} value={club}>{club}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Announcement title..."
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Content:</label>
                    <textarea 
                        value={newContent} 
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Write your update here..."
                        className="form-textarea"
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Post Announcement
                </button>
            </form>

            {/* Filters */}
            <div className="filters">
                {clubs.map(club => (
                    <button 
                        key={club} 
                        className={selectedClub === club ? 'active' : ''}
                        onClick={() => setSelectedClub(club)}
                    >
                        {club}
                    </button>
                ))}
            </div>

            {/* Posts List */}
            <div id="posts">
                {filteredPosts.length === 0 ? (
                    <p className="no-posts-msg">No announcements found for this club yet.</p>
                ) : (
                    filteredPosts.map(post => (
                        <div className="post" key={post.id}>
                            <small>{post.club} &bull; {post.date}</small>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ClubBoard />);