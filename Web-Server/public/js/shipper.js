// Tạo file JavaScript riêng, ví dụ: shipper.js để xử lý các API liên quan đến shipper

// Khởi tạo đối tượng quản lý Shipper API
const ShipperAPI = {
  // Hàm để cập nhật thông tin shipper
  updateShipper: async function (shipperData) {
    try {
      const response = await fetch(
        `/update-shipper/${shipperData.shipper_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shipperData),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Cập nhật thành công!");
        location.reload(); // Tải lại trang để cập nhật danh sách
      } else {
        alert("Có lỗi xảy ra: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi trong quá trình cập nhật shipper.");
    }
  },
};

// Khởi tạo các hàm liên quan đến UI
const ShipperUI = {
  // Hàm để mở modal chỉnh sửa shipper và điền thông tin
  openEditUserModal: function (userId, name, phone, password) {
    document.getElementById("editUserId").value = userId;
    document.getElementById("editUsername").value = name;
    document.getElementById("editPhone").value = phone;
    document.getElementById("editPassword").value = password;

    const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
    modal.show();
  },

  // Hàm để lưu thông tin shipper chỉnh sửa
  saveUserEdit: function () {
    const shipperData = {
      shipper_id: document.getElementById("editUserId").value,
      name: document.getElementById("editUsername").value,
      phonenumber: document.getElementById("editPhone").value,
      password: document.getElementById("editPassword").value,
    };

    ShipperAPI.updateShipper(shipperData);
  },

  // Hàm để bật/tắt hiển thị mật khẩu
  togglePasswordVisibility: function (passwordFieldId, iconElement) {
    const passwordField = document.getElementById(passwordFieldId);
    const icon = iconElement.querySelector("i");

    if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  },
};

// Event listeners
// Toggle password visibility for add user form
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    ShipperUI.togglePasswordVisibility("password", this);
  });

// Toggle password visibility for edit user form
document
  .getElementById("toggleEditPassword")
  .addEventListener("click", function () {
    ShipperUI.togglePasswordVisibility("editPassword", this);
  });

// Save user edit button event listener
document
  .getElementById("saveUserEditButton")
  .addEventListener("click", function () {
    ShipperUI.saveUserEdit();
  });
