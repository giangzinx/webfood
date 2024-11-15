
            let dishes = [];
            let editIndex = -1;
        
            function addDish() {
                const name = document.getElementById('dishName').value;
                const price = document.getElementById('dishPrice').value;
                const image = document.getElementById('dishImage').value;
                const description = document.getElementById('dishDescription').value;

                if (editIndex === -1) {
                    dishes.push({ name, price, image, description });
                } else {
                    dishes[editIndex] = { name, price, image, description };
                    editIndex = -1;
                    document.querySelector('button[onclick="addDish()"]').innerText = 'Thêm';
                }

                displayDishes();
                showNotification();
                document.getElementById('dishForm').reset();
            }
        
            function editDish(index) {
                const dish = dishes[index];
                document.getElementById('dishName').value = dish.name;
                document.getElementById('dishPrice').value = dish.price;
                document.getElementById('dishImage').value = dish.image;
                document.getElementById('dishDescription').value = dish.description;
                editIndex = index;
                document.querySelector('button[onclick="addDish()"]').innerText = 'Cập nhật';
            }
        
            function removeDish(index) {
                if (editIndex === index) {
                    editIndex = -1;
                    document.getElementById('dishForm').reset();
                    document.querySelector('button[onclick="addDish()"]').innerText = 'Thêm';
                }
                dishes.splice(index, 1);
                displayDishes();
            }
        
            function displayDishes() {
                const dishList = document.getElementById('dishList');
                dishList.innerHTML = '';
                dishes.forEach((dish, index) => {
                    const dishRow = document.createElement('tr');
                    dishRow.innerHTML = `
                        <td>${dish.name}</td>
                        <td>${dish.price}</td>
                        <td><img src="${dish.image}" alt="${dish.name}" style="width: 50px; height: 50px;"></td>
                        <td>${dish.description}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editDish(${index})">Sửa</button>
                            <button class="btn btn-danger btn-sm" onclick="removeDish(${index})">Xóa</button>
                        </td>
                    `;
                    dishList.appendChild(dishRow);
                });
            }

            function showNotification() {
                const notification = document.getElementById('notification');
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000); // Ẩn thông báo sau 3 giây
            }