
            let members = [];
            let editIndex = -1;
        
            function addMember() {
                const name = document.getElementById('memberName').value;
                const email = document.getElementById('memberEmail').value;

                if (!validateEmail(email)) {
                    document.getElementById('emailError').style.display = 'block';
                    return;
                } else {
                    document.getElementById('emailError').style.display = 'none';
                }

                if (editIndex === -1) {
                    members.push({ name, email });
                } else {
                    members[editIndex] = { name, email };
                    editIndex = -1;
                    document.querySelector('button[onclick="addMember()"]').innerText = 'Thêm';
                }

                displayMembers();
                showNotification();
                document.getElementById('memberForm').reset();
            }

            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/;
                return re.test(email);
            }
        
            function editMember(index) {
                const member = members[index];
                document.getElementById('memberName').value = member.name;
                document.getElementById('memberEmail').value = member.email;
                editIndex = index;
                document.querySelector('button[onclick="addMember()"]').innerText = 'Cập nhật';
            }
        
            function removeMember(index) {
                if (editIndex === index) {
                    editIndex = -1;
                    document.getElementById('memberForm').reset();
                    document.querySelector('button[onclick="addMember()"]').innerText = 'Thêm';
                }
                members.splice(index, 1);
                displayMembers();
            }
        
            function displayMembers() {
                const memberList = document.getElementById('memberList');
                memberList.innerHTML = '';
                members.forEach((member, index) => {
                    const memberRow = document.createElement('tr');
                    memberRow.innerHTML = `
                        <td>${member.name}</td>
                        <td>${member.email}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editMember(${index})">Sửa</button>
                            <button class="btn btn-danger btn-sm" onclick="removeMember(${index})">Xóa</button>
                        </td>
                    `;
                    memberList.appendChild(memberRow);
                });
            }

            function showNotification() {
                const notification = document.getElementById('notification');
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000); // Ẩn thông báo sau 3 giây
            }