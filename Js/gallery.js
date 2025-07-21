document.addEventListener('DOMContentLoaded', function() {
    // Sample gallery data - replace with your actual work data
    const galleryData = [
        {
            id: 1,
            title: "Brand Identity Project",
            category: "branding",
            image: "images/work1.jpg",
            comments: [
                { author: "Client A", text: "Absolutely love the new brand identity!" },
                { author: "Colleague B", text: "Great color scheme and typography choices." }
            ]
        },
        {
            id: 2,
            title: "Marketing Poster",
            category: "print",
            image: "images/work2.jpg",
            comments: [
                { author: "Client C", text: "This poster really stood out at our event." }
            ]
        },
        {
            id: 3,
            title: "Product Packaging",
            category: "packaging",
            image: "images/work3.jpg",
            comments: []
        },
        {
            id: 4,
            title: "Website Redesign",
            category: "digital",
            image: "images/work4.jpg",
            comments: [
                { author: "Client D", text: "The new design increased our conversions by 30%!" }
            ]
        },
        {
            id: 5,
            title: "Logo Design",
            category: "branding",
            image: "images/work5.jpg",
            comments: []
        },
        {
            id: 6,
            title: "Social Media Graphics",
            category: "digital",
            image: "images/work6.jpg",
            comments: []
        }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const commentForm = document.querySelector('.add-comment-form');
    const projectForm = document.getElementById('comment-form');

    // Initialize gallery
    function initGallery() {
        renderGallery(galleryData);
        setupFilterButtons();
        setupLightbox();
    }

    // Render gallery items
    function renderGallery(items) {
        galleryGrid.innerHTML = '';
        
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${item.category}`;
            galleryItem.dataset.id = item.id;
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-caption">${item.title}</div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Filter gallery items
    function filterGallery(category) {
        if (category === 'all') {
            renderGallery(galleryData);
            return;
        }
        
        const filteredItems = galleryData.filter(item => item.category === category);
        renderGallery(filteredItems);
    }

    // Setup filter buttons
    function setupFilterButtons() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery
                const filter = this.dataset.filter;
                filterGallery(filter);
            });
        });
    }

    // Setup lightbox functionality
    function setupLightbox() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const itemId = parseInt(this.dataset.id);
                const galleryItem = galleryData.find(item => item.id === itemId);
                
                if (galleryItem) {
                    const lightboxImg = lightbox.querySelector('.lightbox-img');
                    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
                    const commentsList = lightbox.querySelector('.comments-list');
                    
                    // Update lightbox content
                    lightboxImg.src = galleryItem.image;
                    lightboxCaption.textContent = galleryItem.title;
                    
                    // Render comments
                    commentsList.innerHTML = '';
                    galleryItem.comments.forEach(comment => {
                        const commentElement = document.createElement('div');
                        commentElement.className = 'comment';
                        commentElement.innerHTML = `
                            <div class="comment-author">${comment.author}</div>
                            <div class="comment-text">${comment.text}</div>
                        `;
                        commentsList.appendChild(commentElement);
                    });
                    
                    // Show lightbox
                    lightbox.classList.add('show');
                    
                    // Store current item ID for adding new comments
                    lightbox.dataset.currentItem = itemId;
                }
            });
        });
    }

    // Handle comment submission in lightbox
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const textarea = this.querySelector('textarea');
            const commentText = textarea.value.trim();
            
            if (commentText) {
                const itemId = parseInt(lightbox.dataset.currentItem);
                const galleryItem = galleryData.find(item => item.id === itemId);
                
                if (galleryItem) {
                    // Add new comment
                    galleryItem.comments.push({
                        author: "Visitor",
                        text: commentText
                    });
                    
                    // Refresh comments list
                    const commentsList = lightbox.querySelector('.comments-list');
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.innerHTML = `
                        <div class="comment-author">Visitor</div>
                        <div class="comment-text">${commentText}</div>
                    `;
                    commentsList.appendChild(commentElement);
                    
                    // Clear textarea
                    textarea.value = '';
                }
            }
        });
    }

    // Handle project feedback submission
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const projectName = document.getElementById('project-name').value.trim();
            const projectComment = document.getElementById('project-comment').value.trim();
            
            if (projectName && projectComment) {
                // In a real app, you would send this data to a server
                alert(`Thank you for your feedback on "${projectName}"!`);
                this.reset();
            }
        });
    }

    // Initialize the gallery
    initGallery();
});