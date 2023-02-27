function fetchBlogData() {

    const baseURL = "https://blogstop-production.up.railway.app/";

        fetch(`${baseURL}api/BlogPosts?num=4`)
            .then((response) => response.json())
            .then(function (data) {
                displayBlogs(data, baseURL)
            })
            .catch((reason) => console.error(reason));
        }

    function displayBlogs(blogPosts, baseURL) {

            let template = document.getElementById('blog-template');
            let blogSection = document.getElementById('blogs');

            blogPosts.forEach(blogPost => {

                   const articleCard = document.importNode(template.content, true ) 

                   let imageDiv = articleCard.querySelector('[data-blog="imageLink"]');
                   imageDiv.href = `${baseURL}Content/${blogPost.slug}`;

                   let blogImage = document.createElement('img');

                   blogImage.classList.add('blog-image');
                    if(blogPost.imageData) {
                        blogImage.setAttribute('src', `data:${blogPost.imageType};base64,${blogPost.imageData}`);
                    } else {
                        blogImage.setAttribute('src', `${baseURL}img/DefaultBlogImage.jpg`)
                    }
                   

                    imageDiv.appendChild(blogImage);

                    let blogDate = articleCard.querySelector('[data-blog="day"]');
                    let blogMonth = articleCard.querySelector('[data-blog="month"]');

                    let createdDate = new Date(blogPost.created);

                    blogDate.textContent = createdDate.getDate();
                    blogMonth.textContent = createdDate.toLocaleString("default", {month: "long"});

                    let blogTitle = articleCard.querySelector('[data-blog="title"]');

                    blogTitle.textContent = blogPost.title;

                    let blogAbstract = articleCard.querySelector('[data-blog="abstract"]');

                    blogAbstract.textContent = blogPost.abstract;

                    let buttonLink = articleCard.querySelector('[data-blog="buttonLink"]');

                    buttonLink.href = `${baseURL}Content/${blogPost.slug}`;


                    let updatedText = articleCard.querySelector('[data-blog="updated"]');

                    let today = new Date();

                    let updated = new Date(blogPost.updated ? blogPost.updated : blogPost.created);

                    let daysAgo = Math.ceil((Math.abs(today.getTime() - updated.getTime())) / (1000 * 60 * 60 * 24));       
                    
                    updatedText.textContent = ( daysAgo == 1 ? "Updated one day ago" : `Updated ${daysAgo} days ago`);

                    blogSection.appendChild(articleCard);



            }); 

    }