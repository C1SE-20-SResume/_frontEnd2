function Validator(options) {
  let formElement = document.querySelector(options.form);

  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  let selectorRules = {};

  function validate(input, rule, messElement) {
    let errorMessage;

    let rules = selectorRules[rule.selector];

    for (let i = 0; i < rules.length; i++) {
      errorMessage = rules[i](input.value);
      if (errorMessage) break;
    }

    if (errorMessage) {
      messElement.innerText = errorMessage;
      getParent(input, options.formGroupSelector).classList.add(
        options.classError
      );
    } else {
      messElement.innerText = "";
      getParent(input, options.formGroupSelector).classList.remove(
        options.classError
      );
    }

    return !!errorMessage;
  }

  if (formElement) {
    formElement.onsubmit = (e) => {
      e.preventDefault();

      let isFormValid = true;
      options.rules.forEach((rule) => {
        let inputElement = formElement.querySelector(rule.selector);
        let messElement = getParent(
          inputElement,
          options.formGroupSelector
        ).querySelector(options.errorSelector);
        let isValid = validate(inputElement, rule, messElement);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        if (typeof options.onSubmit === "function") {
          let enableInputs = formElement.querySelectorAll(
            "[name]:not([disable])"
          );

          let formValue = Array.from(enableInputs).reduce((val, input) => {
            val[input.name] = input.value;
            return val;
          }, {});

          options.onSubmit(formValue);
        } else {
          formElement.submit();
        }
      } else {
        console.log("Error");
      }
    };
    options.rules.forEach((rule) => {
      // Save all rules for input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      let inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        let messElement = getParent(
          inputElement,
          options.formGroupSelector
        ).querySelector(options.errorSelector);
        inputElement.onblur = () => {
          validate(inputElement, rule, messElement);
        };

        inputElement.oninput = () => {
          messElement.innerText = "";
          getParent(inputElement, options.formGroupSelector).classList.remove(
            options.classError
          );
        };
      }
    });
  }
}

Validator.isRequired = (selector, message) => {
  return {
    selector: selector,
    test: (value) => {
      return value.trim() ? undefined : message || "Required";
    },
  };
};

Validator.isEmail = (selector, message) => {
  return {
    selector: selector,
    test: (value) => {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : message || "Invalid email address";
    },
  };
};

Validator.minLength = (selector, min, message) => {
  return {
    selector: selector,
    test: (value) => {
      return value.length >= min
        ? undefined
        : message || `Minimum required ${min} characters `;
    },
  };
};

Validator.isConfirmation = (selector, getConfirmValue, message) => {
  return {
    selector: selector,
    test: (value) => {
      return value === getConfirmValue()
        ? undefined
        : message || "Input value is incorrect";
    },
  };
};

export default Validator;
