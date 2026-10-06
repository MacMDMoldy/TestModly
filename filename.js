        const clubs = ["All", "Chess Club", "Economics Club", "Math Club", "Law Club", "Medicine Club", "Robotics Club"];

        const announcements = [ { club: "Chess Club", date: "10/5/2026", title: "sample", text: "sample" } ];

        const filters = document.getElementById("filters");
        const posts   = document.getElementById("posts");
        let current   = "null";

        function show() {
            filters.innerHTML = "";
            clubs.forEach(name => {
                const b = document.createElement("button");
                b.textContent = name;
                if (name === current) b.className = "active";
                b.onclick = () => { current = name; show(); };
                filters.appendChild(b);
            });

            posts.innerHTML = "";
            const list = announcements.filter(a => current === "All" || a.club === current);
            
            if (!list.length) {
                posts.textContent = "No announcements yet.";
                return;
            }

            list.forEach(a => {
                const d = document.createElement("div");
                d.className = "post";
                
                const meta = document.createElement("small");
                meta.textContent = `${a.club} \u00b7 ${a.date}`;
                
                const title = document.createElement("h3");
                title.textContent = a.title;
                
                const body = document.createElement("p");
                body.textContent = a.text;

                d.append(meta, title, body);
                posts.appendChild(d);
            });
        }

        show();