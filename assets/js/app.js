// Темная тема (Не относится к урокам, просто захотелось)
document.getElementById('themeToggle').addEventListener('click', function() {
    let body = document.body;
    let themeIcon = document.getElementById('themeIcon');
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});


// M.1
document.addEventListener('DOMContentLoaded', (event) => {
    // Апишка
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            let products = data; // Сейв
            let filteredProducts = [...products]; // Фильтр

            // Вывод
            function displayProducts(products) {
                let productContainer = document.getElementById('productContainer');
                productContainer.innerHTML = '';

                products.forEach(product => {
                    productContainer.innerHTML += `
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="card shadow h-100">
                                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.title}</h5>
                                    <p class="card-text">${product.description}</p>
                                    <p class="card-text"><small class="text-muted">$ ${product.price}</small></p>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }

            // Возрастание
            function sortByPriceAsc() {
                filteredProducts.sort((a, b) => a.price - b.price);
                displayProducts(filteredProducts);
                localStorage.setItem('sort', 'asc');
            }

            // Убывание
            function sortByPriceDesc() {
                filteredProducts.sort((a, b) => b.price - a.price);
                displayProducts(filteredProducts);
                localStorage.setItem('sort', 'desc');
            }

            // Все товары
            function showAllProducts() {
                filteredProducts = [...products];
                displayProducts(filteredProducts);
                localStorage.setItem('sort', 'none');
                document.getElementById('searchInput').value = ''; // Очистка поиска
                localStorage.removeItem('searchQuery'); // Удаление запроса 
            }

            // Поиск
            function searchProducts(query) {
                filteredProducts = products.filter(product =>
                    product.title.toLowerCase().includes(query.toLowerCase()) ||
                    product.description.toLowerCase().includes(query.toLowerCase())
                );

                // Сохр после поиска
                if (localStorage.getItem('sort') === 'asc') {
                    sortByPriceAsc();
                } else if (localStorage.getItem('sort') === 'desc') {
                    sortByPriceDesc();
                } else {
                    displayProducts(filteredProducts);
                }
                localStorage.setItem('searchQuery', query);
            }

            document.getElementById('sortButtonNone').addEventListener('change', showAllProducts);
            document.getElementById('sortButtonAsc').addEventListener('change', sortByPriceAsc);
            document.getElementById('sortButtonDesc').addEventListener('change', sortByPriceDesc);
            document.getElementById('searchInput').addEventListener('input', (e) => searchProducts(e.target.value));

            // Загрузка
            if (localStorage.getItem('sort') === 'asc') {
                document.getElementById('sortButtonAsc').checked = true;
                sortByPriceAsc();
            } else if (localStorage.getItem('sort') === 'desc') {
                document.getElementById('sortButtonDesc').checked = true;
                sortByPriceDesc();
            } else {
                document.getElementById('sortButtonNone').checked = true;
                showAllProducts();
            }
            if (localStorage.getItem('searchQuery')) {
                document.getElementById('searchInput').value = localStorage.getItem('searchQuery');
                searchProducts(localStorage.getItem('searchQuery'));
            } else {
                displayProducts(products);
            }
        })
        .catch(error => console.error(error));
});

