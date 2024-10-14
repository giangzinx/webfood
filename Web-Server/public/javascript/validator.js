function Validator(options) {
  var selectorRules = {};
  //Hàm thực hiện validate
  function GetParent(element, selector) {
    while (element.parentElement) { 
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      } else element = element.parentElement;
    }
  }
  function Validate(inputElement, rule) {
    //Lấy ra các rules của selector

    var errormessage;
    var errorElement = GetParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.errorSelector);
    //Lấy ra từng rules
    var rules = selectorRules[rule.selector];
    // Lặp qua các rules
    for (var i = 0; i < rules.length; ++i) {
      errormessage = rules[i](inputElement.value);
      //Kiểm tra nếu có lỗi thì thoát
      if (errormessage) break;
    }
    if (errormessage) {
      errorElement.innerText = errormessage;
      GetParent(inputElement, options.formGroupSelector).classList.add(
        "invalid"
      );
    } else {
      errorElement.innerText = "";
      GetParent(inputElement, options.formGroupSelector).classList.remove(
        "invalid"
      );
    }
    return !errormessage;
  }
  //Lấy element của form cần validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
    //Khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;
      //Lặp qua từng rule và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = Validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });
      if (isFormValid) {
        //Submit theo Javascript
        if (typeof options.onSubmit === "function") {
          var enableInputs = formElement.querySelectorAll("[name]");
          var formValues = Array.from(enableInputs).reduce(function (
            values,
            input
          ) {
            values[input.name] = input.value;
            return values;
          },
          {});
          options.onSubmit(formValues);
        }
        //Submit mặc định
        else {
          formElement.submit();
        }
      }
    };
    //Lặp qua mỗi rule để lắng nghe event (blur, input, ...)
    options.rules.forEach(function (rule) {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }
      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        //Xử lý trường hợp khi blur khỏi input
        inputElement.onblur = function () {
          //Truyền input vào validate
          Validate(inputElement, rule);
        };
        inputElement.oninput = function () {
          var errorElement = GetParent(
            inputElement,
            options.formGroupSelector
          ).querySelector(options.errorSelector);
          errorElement.innerText = "";
          GetParent(inputElement, options.formGroupSelector).classList.remove(
            "invalid"
          );
        };
      }
    });
  }
}

Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      //Value.trim() : Xử lý các dấu cách ở 2 bên text
      return value.trim() ? undefined : "Vui lòng nhập đủ thông tin";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Vui lòng nhập đúng email";
    },
  };
};
Validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : `Vui lòng nhập ít nhất ${min} ký tự`;
    },
  };
};
Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value == getConfirmValue()
        ? undefined
        : "Giá trị nhập vào không chính xác";
    },
  };
};
