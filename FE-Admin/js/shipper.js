
            let shippers = [];
            let editIndex = -1;
        
            function addShipper() {
                const name = document.getElementById('shipperName').value;
                const phone = document.getElementById('shipperPhone').value;
                const email = document.getElementById('shipperEmail').value;

                if (!validateEmail(email)) {
                    document.getElementById('emailError').style.display = 'block';
                    return;
                } else {
                    document.getElementById('emailError').style.display = 'none';
                }

                if (editIndex === -1) {
                    shippers.push({ name, phone, email });
                } else {
                    shippers[editIndex] = { name, phone, email };
                    editIndex = -1;
                    document.querySelector('button[onclick="addShipper()"]').innerText = 'Thêm';
                }

                displayShippers();
                showNotification();
                document.getElementById('shipperForm').reset();
            }

            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/;
                return re.test(email);
            }
        
            function editShipper(index) {
                const shipper = shippers[index];
                document.getElementById('shipperName').value = shipper.name;
                document.getElementById('shipperPhone').value = shipper.phone;
                document.getElementById('shipperEmail').value = shipper.email;
                editIndex = index;
                document.querySelector('button[onclick="addShipper()"]').innerText = 'Cập nhật';
            }
        
            function removeShipper(index) {
                if (editIndex === index) {
                    editIndex = -1;
                    document.getElementById('shipperForm').reset();
                    document.querySelector('button[onclick="addShipper()"]').innerText = 'Thêm';
                }
                shippers.splice(index, 1);
                displayShippers();
            }
        
            function displayShippers() {
                const shipperList = document.getElementById('shipperList');
                shipperList.innerHTML = '';
                shippers.forEach((shipper, index) => {
                    const shipperRow = document.createElement('tr');
                    shipperRow.innerHTML = `
                        <td>${shipper.name}</td>
                        <td>${shipper.phone}</td>
                        <td>${shipper.email}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editShipper(${index})">Sửa</button>
                            <button class="btn btn-danger btn-sm" onclick="removeShipper(${index})">Xóa</button>
                        </td>
                    `;
                    shipperList.appendChild(shipperRow);
                });
            }

            function showNotification() {
                const notification = document.getElementById('notification');
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000); // Ẩn thông báo sau 3 giây
            }