        // Website Data Structure
        const learningSites = [
            {
                category: "🎓 Learning / Course Platforms",
                sites: [
                    { name: "Coursera", base: "https://www.coursera.org/search?query=" },
                    { name: "Great Learning", base: "https://www.mygreatlearning.com/search?q=" },
                    { name: "edX", base: "https://www.edx.org/search?q=" },
                    { name: "Udemy", base: "https://www.udemy.com/courses/search/?q=" },
                    { name: "NPTEL", base: "https://www.google.com/search?q=site:nptel.ac.in+" },
                    { name: "SWAYAM", base: "https://www.google.com/search?q=site:swayam.gov.in+" },
                    { name: "Khan Academy", base: "https://www.khanacademy.org/search?page_search_query=" },
                    { name: "MIT OCW", base: "https://ocw.mit.edu/search/?q=" },
                    { name: "freeCodeCamp", base: "https://www.freecodecamp.org/news/search/?query=" },
                    { name: "The Odin Project", base: "https://www.theodinproject.com/search?query=" },
                    { name: "Harvard CS50", base: "https://cs50.harvard.edu/search/?q=" },
                    { name: "Microsoft Learn", base: "https://learn.microsoft.com/en-us/search/?terms=" },
                    { name: "Google Skillshop", base: "https://skillshop.exceedlms.com/catalogsearch/result/?q=" },
                    { name: "OpenLearn", base: "https://www.open.edu/openlearn/search?search_api_views_fulltext=" },
                    { name: "FutureLearn", base: "https://www.futurelearn.com/search?q=" },
                    { name: "DataCamp", base: "https://www.datacamp.com/search?q=" },
                    { name: "Codecademy", base: "https://www.codecademy.com/search?query=" }
                ]
            },
            {
                category: "💻 Tutorials & Practice",
                sites: [
                    { name: "W3Schools", base: "https://www.w3schools.com/howto/howto_google_search.asp?q=" },
                    { name: "GeeksforGeeks", base: "https://www.geeksforgeeks.org/?s=" },
                    { name: "HackerRank", base: "https://www.hackerrank.com/search?q=" },
                    { name: "LeetCode", base: "https://leetcode.com/problemset/all/?search=" },
                    { name: "Codewars", base: "https://www.codewars.com/search?q=" },
                    { name: "Exercism", base: "https://exercism.org/search?q=" },
                    { name: "Kaggle", base: "https://www.kaggle.com/search?q=" },
                    { name: "HackerEarth", base: "https://www.hackerearth.com/search/?q=" },
                    { name: "CodeChef", base: "https://www.codechef.com/search?q=" },
                    { name: "CodingBat", base: "https://www.google.com/search?q=site:codingbat.com+" },
                    { name: "SQLBolt", base: "https://www.google.com/search?q=site:sqlbolt.com+" }
                ]
            },
            {
                category: "📚 Documentation / Technical",
                sites: [
                    { name: "MDN Web Docs", base: "https://developer.mozilla.org/en-US/search?q=" },
                    { name: "Python Docs", base: "https://docs.python.org/3/search.html?q=" },
                    { name: "Java Docs", base: "https://dev.java/search/?q=" },
                    { name: "PostgreSQL Docs", base: "https://www.postgresql.org/search/?q=" },
                    { name: "MongoDB University", base: "https://learn.mongodb.com/search?q=" },
                    { name: "GitHub Skills", base: "https://skills.github.com/search?q=" }
                ]
            }
        ];

        const body = document.body;
        const contentDiv = document.getElementById('content');
        const searchBar = document.getElementById('search-bar');
        const clearBtn = document.getElementById('clear-btn');
        const historyBox = document.getElementById('history-box');
        const historyTagsWrapper = document.getElementById('history-tags-wrapper');
        const clearHistoryBtn = document.getElementById('clear-history-btn');
        const themeToggle = document.getElementById('theme-toggle');

        // --- Theme (Dark Mode) Functions ---
        function applyTheme(theme) {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                themeToggle.innerText = '☀️';
            } else {
                body.classList.remove('dark-mode');
                themeToggle.innerText = '🌙';
            }
        }

        // Load saved theme on initial load
        let savedTheme = localStorage.getItem('learno_theme') || 'light';
        applyTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                applyTheme('light');
                localStorage.setItem('learno_theme', 'light');
            } else {
                applyTheme('dark');
                localStorage.setItem('learno_theme', 'dark');
            }
        });

        // --- Storage Functions ---
        function getSearches() {
            return JSON.parse(localStorage.getItem('learno_searches') || '[]');
        }

        function saveSearch(query) {
            if(!query) return;
            let searches = getSearches();
            searches = searches.filter(s => s.toLowerCase() !== query.toLowerCase());
            searches.unshift(query);
            if(searches.length > 10) searches.pop();
            localStorage.setItem('learno_searches', JSON.stringify(searches));
            renderHistory();
        }

        function renderHistory() {
            const searches = getSearches();
            if(searches.length === 0) {
                historyBox.style.display = 'none';
                return;
            }
            
            historyBox.style.display = 'block';
            historyTagsWrapper.innerHTML = '';

            searches.forEach(s => {
                const tag = document.createElement('span');
                tag.className = 'history-tag';
                tag.innerText = s;
                tag.addEventListener('click', function() {
                    searchBar.value = s;
                    renderSites();
                    searchBar.focus();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                historyTagsWrapper.appendChild(tag);
            });
        }

        // --- Render Function ---
        function renderSites() {
            const query = encodeURIComponent(searchBar.value.trim());
            contentDiv.innerHTML = ''; 

            learningSites.forEach(categoryData => {
                const catDiv = document.createElement('div');
                catDiv.className = 'category';
                
                const catTitle = document.createElement('h2');
                catTitle.className = 'category-title';
                catTitle.innerText = categoryData.category;
                catDiv.appendChild(catTitle);

                const grid = document.createElement('div');
                grid.className = 'grid';

                categoryData.sites.forEach(site => {
                    const finalUrl = query ? site.base + query : site.base.split('/search')[0] + '/';

                    const link = document.createElement('a');
                    link.className = 'card';
                    link.href = finalUrl;
                    link.target = '_blank'; 
                    link.rel = 'noopener noreferrer';
                    link.innerText = site.name;
                    
                    if(query) {
                        link.addEventListener('click', function() {
                            saveSearch(decodeURIComponent(query));
                        });
                    }
                    
                    grid.appendChild(link);
                });

                catDiv.appendChild(grid);
                contentDiv.appendChild(catDiv);
            });
        }

        // --- Event Listeners ---
        searchBar.addEventListener('input', renderSites);

        clearBtn.addEventListener('click', () => {
            searchBar.value = '';
            renderSites();
            searchBar.focus();
        });

        clearHistoryBtn.addEventListener('click', () => {
            localStorage.removeItem('learno_searches');
            renderHistory();
        });

        searchBar.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                const query = searchBar.value.trim();
                if(query) {
                    saveSearch(query);
                    alert('Search saved to history!\n\nNow click a website below to start learning.');
                }
            }
        });

        // Initial render
        renderSites();
        renderHistory();

        // Show welcome alert and rules on load
        window.onload = function() {
            alert("Welcome to LEARNO Learning Search Router!\n\n" +
                  "Rules & Instructions:\n" +
                  "1. Type your learning topic in the search bar (e.g., 'Python').\n" +
                  "2. Press Enter or click a website below to save it to your history.\n" +
                  "3. You will be redirected to that website's search results.\n" +
                  "4. Click the '✕' button to clear your search text.\n" +
                  "5. Use 'Clear All' to wipe your search history.\n" +
                  "6. Click the 🌙 / ☀️ button in the top right to toggle Dark Mode.\n" +
                  "7. Need help? Use the WhatsApp chat button at the bottom right.\n\n" +
                  "Ready to learn? Start typing above!");
            searchBar.focus(); 
        };
    