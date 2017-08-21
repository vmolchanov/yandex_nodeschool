(function () {

    class MyForm {

        /**
         * @constructor
         */
        constructor() {
            this._fioInput   = document.getElementById("fio");
            this._emailInput = document.getElementById("email");
            this._phoneInput = document.getElementById("phone");
        }


        /**
         * Метод используется для валидации формы
         * @returns {{isValid: boolean, errorFields: Array}} - объект с признаком результата
         *     валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields)
         */
        validate() {
            let isValid = true;
            let errorFields = [];

            let fioArray = this._fioInput.value.split(" ");
            let isNotValidFio = fioArray.some(name => {
                return /[^А-Яа-я]/i.test(name);
            });

            if (fioArray.length !== 3 || isNotValidFio) {
                isValid = false;
                errorFields.push("fio");
            }

            /** @const массив валидных доменов */
            const DOMAINS = [
                "ya.ru",
                "yandex.ru",
                "yandex.ua",
                "yandex.by",
                "yandex.kz",
                "yandex.com"
            ];
            const REG_EXP_FOR_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))/;

            if (this._emailInput.value.indexOf("@") === -1) {
                isValid = false;
                errorFields.push("email");
            }

            /**
             * @type{Array} Массив, содержащий введеный email.
             *     Под индексом 0 записан логин, под индексом 1 записан домен
             */
            let email = this._emailInput.value.split("@");
            let isValidLogin = REG_EXP_FOR_EMAIL.test(email[0]);
            let isValidDomain = DOMAINS.some(domain => {
                return domain === email[1];
            });

            if (!isValidLogin || !isValidDomain) {
                isValid = false;
                errorFields.push("email");
            }

            const REG_EXP_FOR_PHONE = /\+7\(\d\d\d\)\d\d\d-\d\d-\d\d/;

            let isRightPhoneFormat = REG_EXP_FOR_PHONE.test(this._phoneInput.value);
            let sumOfDigits = this._phoneInput.value.match(/\d+/ig)
                                                    .join("")
                                                    .split("")
                                                    .reduce((sum, value) => {
                return sum + Number(value);
            }, 0);

            if (!isRightPhoneFormat || sumOfDigits > 30) {
                isValid = false;
                errorFields.push("phone");
            }

            return { isValid: isValid, errorFields: errorFields };
        }


        /**
         * Метод возвращает объект с данными формы, где имена свойств совпадают с
         * именами инпутов
         * @returns {{fio: string, email: string, phone: string}} - объект с данными формы
         */
        getData() {
            let data = {};

            data.fio   = this._fioInput.value;
            data.email = this._emailInput.value;
            data.phone = this._phoneInput.value;

            return data;
        }


        /**
         * Метод принимает объект с данными и устанавливает формы и устанавливает их
         * инпутам формы. Поля кроме fio, email, phone игнорируются
         * @param data - Массив с данными формы
         */
        setData(data) {
            if (data.fio)
                this._fioInput.value = data.fio;
            if (data.email)
                this._emailInput.value = data.email;
            if (data.phone)
                this._phoneInput = data.phone;
        }


        /**
         * Метод выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена
         */
        submit() {
            let { isValid, errorFields } = this.validate();

            if (!isValid) {
                if ("fio" in errorFields) {
                    this._fioInput.classList.add("error");
                }
                if ("email" in errorFields) {
                    this._emailInput.classList.add("error");
                }
                if ("phone" in errorFields) {
                    this._phoneInput.classList.add("error");
                }
            }
        }

    }


    let myForm = new MyForm();
    let submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", event => {
        event.preventDefault();
        myForm.submit();
    });


    window.MyForm = MyForm;

})();