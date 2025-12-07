import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from './CustomSelect';
import ModalMessage from '../ModalMessage';
import { IMaskInput } from 'react-imask';
import { updatePassengerData } from '../../redux/slices/passengerSlice';

const PassengerInformation = ({ passengerNumber = 1, onClose, onValidityChange, onNextPassenger, isLastPassenger = false }) => {
  const dispatch = useDispatch();
  const passengerIndex = passengerNumber - 1;
  const selectedPassengers = useSelector((state) => state.passengers);

  const storedPassenger = useSelector((state) => state.passengers?.data?.[passengerIndex]) || {};

  const [documentType, setDocumentType] = useState(storedPassenger.documentType || 'passport__rf');
  const [age, setAge] = useState(storedPassenger.age || '');
  const [lastName, setLastName] = useState(storedPassenger.lastName || '');
  const [firstName, setFirstName] = useState(storedPassenger.firstName || '');
  const [fatherName, setFatherName] = useState(storedPassenger.fatherName || '');
  const [checked, setChecked] = useState(storedPassenger.checked || false);
  const [gender, setGender] = useState(storedPassenger.gender || 'M');
  const [birth, setBirth] = useState(storedPassenger.birth || '');
  const [passportSeries, setPassportSeries] = useState(storedPassenger.passportSeries || '');
  const [passportNumber, setPassportNumber] = useState(storedPassenger.passportNumber || '');
  const [birthNumber, setBirthNumber] = useState(storedPassenger.birthNumber || '');

  const [isValid, setIsValid] = useState(storedPassenger.isValid || false);
  const [birthError, setBirthError] = useState(false);
  const [error, setError] = useState(false);
  const [passportError, setPassportError] = useState(false);
  const [ageError, setAgeError] = useState(false);

  const [modal, setModal] = useState({ visible: false, title: '', message: '' });

  const showModal = (title, message) => {
    setModal({ visible: true, title, message });
  };

  const closeModal = () => {
    setModal({ visible: false, title: '', message: '' });
  };

  useEffect(() => {
    dispatch(updatePassengerData({
      index: passengerIndex,
      data: {
        documentType,
        age,
        lastName,
        firstName,
        fatherName,
        checked,
        gender,
        birth,
        passportSeries,
        passportNumber,
        birthNumber,
        isValid
      },
    }));
  }, [
    documentType,
    age,
    lastName,
    firstName,
    fatherName,
    checked,
    gender,
    birth,
    passportSeries,
    passportNumber,
    birthNumber,
    isValid,
    passengerIndex,
    dispatch,
  ]);

  useEffect(() => {
    if (!isValid) return;

    setIsValid(false);
    onValidityChange(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    documentType,
    age,
    lastName,
    firstName,
    fatherName,
    checked,
    gender,
    birth,
    passportSeries,
    passportNumber,
    birthNumber,
  ]);


  const validateBirthDate = (dateStr) => {
    const parts = dateStr.split('.');
    if (parts.length !== 3) return false;
    const [day, month, year] = parts.map(Number);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (day < 1 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) return false;

    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year;
  };

  const handleGender = (value) => {
    setGender(value);
  };

  const handleBirth = (e) => {
    let v = e.target.value;

    setBirth(v);

    const digits = v.replace(/\D/g, "").slice(0, 8);

    if (digits.length === 8) {
      const formatted = digits.replace(/(\d{2})(\d{2})(\d{4})/, "$1.$2.$3");
      setBirth(formatted);
    }

    if (birthError) setBirthError(false);
  };

  const handleDocumentSelect = (val) => {
    setDocumentType(val);
    if (val === 'passport__rf') {
      setBirthNumber('');
    } else if (val === 'birth__certificate') {
      setPassportSeries('');
      setPassportNumber('');
    }
  };

  const validate = (input) => {
    const pattern = /^(?:I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)-[А-ЯЁ]{2}-\d{6}$/u;
    return pattern.test(input);
  };

  const getAge = (dateStr) => {
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;

    const [day, month, year] = parts.map(Number);
    const birthDate = new Date(year, month - 1, day);
    if (isNaN(birthDate.getTime())) return null;

    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();

    const isBeforeBirthday =
      now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate());

    if (isBeforeBirthday) {
      age--;
    }

    return age;
  };

  const checkPassengerCount = () => {
    if (!isLastPassenger) return true;
    const adultsCount = selectedPassengers.data.filter(p => p.age === 'adult').length;
    const childrenCount = selectedPassengers.data.filter(p => p.age === 'children').length;

    const expectedAdults = selectedPassengers.forward.adults;
    const expectedChildren = selectedPassengers.forward.children;

    if (adultsCount !== expectedAdults || childrenCount !== expectedChildren) {
      showModal(
        'Ошибка',
        `Количество взрослых и детей не соответствует выбранному.\nОжидалось: ${expectedAdults} взрослых и ${expectedChildren} детей.`
      );
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!birth || !validateBirthDate(birth)) {
      setAgeError(false);
      return;
    }

    const ageNum = getAge(birth);
    if (ageNum === null) {
      setAgeError(false);
      return;
    }

    if (age === "adult" && ageNum < 18) {
      setAgeError(true);
      setIsValid(false);
      onValidityChange(false);
      return;
    }

    if (age === "children" && ageNum >= 18) {
      setAgeError(true);
      setIsValid(false);
      onValidityChange(false);
      return;
    }

    setAgeError(false);
  }, [birth, age, onValidityChange]);

  const handleChange = (e) => {
    const input = e.target.value.toUpperCase();
    setBirthNumber(input);
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(false);
    setPassportError(false);
    setBirthError(false);

    const cleanSeries = passportSeries.replace(/\s/g, '');
    const cleanNumber = passportNumber.replace(/\s/g, '');
    const cleanBirthNumber = birthNumber.trim();

    if (!validateBirthDate(birth)) {
      setBirthError(true);
      setIsValid(false);
      onValidityChange(false);
      return;
    }

    if (!checkPassengerCount()) {
      setIsValid(false);
      onValidityChange(false);
      return;
    }

    if (documentType === 'birth__certificate') {
      if (!cleanBirthNumber || !validate(cleanBirthNumber)) {
        setError(true);
        setIsValid(false);
        onValidityChange(false);
        return;
      }
    } else if (documentType === 'passport__rf') {
      if (
        !cleanSeries ||
        cleanSeries.length !== 4 ||
        !cleanNumber ||
        cleanNumber.length !== 6
      ) {
        setPassportError(true);
        setIsValid(false);
        onValidityChange(false);
        return;
      }
    }

    setError(false);
    setPassportError(false);
    setBirthError(false);
    setIsValid(true);
    onValidityChange(true);
    onNextPassenger();
  };

  useEffect(() => {
    if (birth && validateBirthDate(birth)) {
      setBirthError(false);
    }
  }, [birth]);

  useEffect(() => {
    if (documentType === 'birth__certificate' && birthNumber && validate(birthNumber)) {
      setError(false);
    }
  }, [birthNumber, documentType]);

  useEffect(() => {
    if (
      documentType === 'passport__rf' &&
      passportSeries.replace(/\s/g, '').length === 4 &&
      passportNumber.replace(/\s/g, '').length === 6
    ) {
      setPassportError(false);
    }
  }, [passportSeries, passportNumber, documentType]);

  return (
    <form className="pasenger-information__form" onSubmit={handleSubmit}>
      <header className="passenger-information__form-header">
        <div className="form-header__wrapper">
          <svg onClick={onClose} className="form-header__wrapper-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="#928F94" strokeWidth="2" />
            <line
              x1="8"
              y1="16"
              x2="24"
              y2="16"
              stroke="#928F94"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="form-header__title">Пассажир {passengerNumber}</h2>
        </div>
        <button
          type="button"
          className="form-header__close-button"
          onClick={onClose}
        >
          &times;
        </button>
      </header>
      <div className="passenger-information__field">
        <CustomSelect
          options={[
            { value: 'adult', label: 'Взрослый' },
            { value: 'children', label: 'Детский' }
          ]}
          value={age}
          onChange={val => setAge(val)}
        />
        <div className="passenger-name">
          <div className="passenger-name__wrapper">
            <label htmlFor={`lastName-${passengerNumber}`} className="input__label">
              Фамилия
            </label>
            <input
              id={`lastName-${passengerNumber}`}
              className="passenger-name__input passenger-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required />
          </div>
          <div className="passenger-name__wrapper">
            <label htmlFor={`firstName-${passengerNumber}`} className="input__label">
              Имя
            </label>
            <input
              id={`firstName-${passengerNumber}`}
              className="passenger-name__input passenger-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required />
          </div>
          <div className="passenger-name__wrapper">
            <label htmlFor={`fatherName-${passengerNumber}`} className="input__label">
              Отчество
            </label>
            <input
              id={`fatherName-${passengerNumber}`}
              className="passenger-name__input passenger-input"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              required />
          </div>
        </div>
        <div className="gb">
          <div className="gb__field">
            <label className="input__label">Пол</label>
            <div className="gb__segmented" role="radiogroup" aria-label="Пол">
              <input
                type="radio"
                id={`gender-m-${passengerNumber}`}
                name="gender"
                className="passenger-input"
                value="M"
                checked={gender === "M"}
                onChange={() => handleGender("M")}
                required
              />
              <label htmlFor={`gender-m-${passengerNumber}`}>М</label>
              <input
                type="radio"
                id={`gender-f-${passengerNumber}`}
                className="passenger-input"
                name="gender"
                value="F"
                checked={gender === "F"}
                onChange={() => handleGender("F")}
                required
              />
              <label htmlFor={`gender-f-${passengerNumber}`}>Ж</label>
            </div>
          </div>
          <div className="gb__field">
            <label htmlFor={`gb__date-${passengerNumber}`} className="input__label">Дата рождения</label>
            <input
              id={`gb__date-${passengerNumber}`}
              type="text"
              inputMode="numeric"
              className="gb__date passenger-input"
              placeholder="ДД/ММ/ГГ"
              value={birth}
              onChange={handleBirth}
              required
            />
          </div>
        </div>
        <label className="passenger-information__checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <span className="checkmark"></span>
          ограниченная подвижность
        </label>
      </div>
      <div className="passenger-documents__field">
        <label htmlFor={`docType-${passengerNumber}`} className="input__label">
          Тип документа
          <CustomSelect
            style={{ width: documentType === 'birth__certificate' ? 444 : 206 }}
            options={[
              { value: 'passport__rf', label: 'Паспорт РФ' },
              { value: 'birth__certificate', label: 'Свидетельство о рождении' },
            ]}
            value={documentType}
            onChange={handleDocumentSelect}
          />
        </label>
        {documentType === 'passport__rf' && (
          <div className="doc-fields doc-fields__passport">
            <div className="doc-field">
              <label htmlFor={`passportSeries-${passengerNumber}`} className="input__label">Серия</label>
              <IMaskInput
                id={`passportSeries-${passengerNumber}`}
                className="passenger-input input__doc"
                mask="0 0 0 0"
                lazy={false}
                placeholderChar="_"
                unmask={true}
                value={passportSeries}
                onAccept={(val) => setPassportSeries(val)}
                inputMode="numeric"
                required
              />
            </div>
            <div className="doc-field">
              <label htmlFor={`passportNumber-${passengerNumber}`} className="input__label">Номер</label>
              <IMaskInput
                id={`passportNumber-${passengerNumber}`}
                className="passenger-input input__doc"
                mask="0 0 0 0 0 0"
                lazy={false}
                placeholderChar="_"
                unmask={true}
                value={passportNumber}
                onAccept={(val) => setPassportNumber(val)}
                inputMode="numeric"
                required
              />
            </div>
          </div>
        )}
        {documentType === 'birth__certificate' && (
          <div className="doc-fields doc-fields--birth">
            <div className="doc-field">
              <label htmlFor={`birthNumber-${passengerNumber}`} className="input__label">Номер</label>
              <input
                type="text"
                value={birthNumber}
                onChange={handleChange}
                placeholder="VIII-ЫП-123456"
                className={`passenger-input input__doc ${error ? "error" : ""}`}
              />
            </div>
          </div>
        )}
      </div>
      {birthError ? (
        <div className="passenger-information__error-wrapper">
          <button
            type="button"
            className="passenger-information__error-button"
            onClick={() => {
              setError(false);
              setBirthError(false);
              document.getElementById(`gb__date-${passengerNumber}`)?.focus();
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM16 14.6L20.2998 10.3C20.5996 9.90002 21.2002 9.90002 21.5996 10.3L21.7002 10.4C22.0996 10.7 22.0996 11.3 21.7002 11.7L17.4004 16L21.5996 20.2C22 20.6 22 21.2 21.5996 21.6C21.3662 21.8337 21.0645 21.9309 20.7744 21.8915C20.5674 21.8634 20.3662 21.7662 20.2002 21.6L16 17.4L11.7002 21.7C11.4004 22.1 10.7998 22.1 10.4004 21.7L10.2998 21.6C9.90039 21.3 9.90039 20.7 10.2998 20.3L14.5996 16L10.2998 11.7C10.0811 11.4811 9.98242 11.2021 10.0029 10.929C10.0205 10.7031 10.1191 10.4811 10.2998 10.3C10.7002 9.90002 11.2998 9.90002 11.7002 10.3L16 14.6Z"
                fill="white"
                fillOpacity="0.81"
              />
            </svg>
          </button>
          <div className="passenger-information__error">
            Некорректная дата рождения<br />
            <span className="passenger-information__error-span">Пример: 25.12.2015</span>
          </div>
        </div>
      ) : ageError ? (
        <div className="passenger-information__error-wrapper">
          <button
            type="button"
            className="passenger-information__error-button"
            onClick={() => {
              setAgeError(false);
              document.getElementById(`gb__date-${passengerNumber}`)?.focus();
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM16 14.6L20.2998 10.3C20.5996 9.90002 21.2002 9.90002 21.5996 10.3L21.7002 10.4C22.0996 10.7 22.0996 11.3 21.7002 11.7L17.4004 16L21.5996 20.2C22 20.6 22 21.2 21.5996 21.6C21.3662 21.8337 21.0645 21.9309 20.7744 21.8915C20.5674 21.8634 20.3662 21.7662 20.2002 21.6L16 17.4L11.7002 21.7C11.4004 22.1 10.7998 22.1 10.4004 21.7L10.2998 21.6C9.90039 21.3 9.90039 20.7 10.2998 20.3L14.5996 16L10.2998 11.7C10.0811 11.4811 9.98242 11.2021 10.0029 10.929C10.0205 10.7031 10.1191 10.4811 10.2998 10.3C10.7002 9.90002 11.2998 9.90002 11.7002 10.3L16 14.6Z"
                fill="white"
                fillOpacity="0.81"
              />
            </svg>
          </button>
          <div className="passenger-information__error">
            Возраст не соответствует категории <br />
            <span className="passenger-information__error-span">
              {age === "adult" ? "Должно быть 18 лет и старше" : "Должно быть младше 18 лет"}
            </span>
          </div>
        </div>
      ) : error ? (
        <div className="passenger-information__error-wrapper">
          <button
            type="button"
            className="passenger-information__error-button"
            onClick={() => {
              setError(false);
              setBirthError(false);
              document.querySelector(`input[placeholder="VIII-ЫП-123456"]`)?.focus();
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM16 14.6L20.2998 10.3C20.5996 9.90002 21.2002 9.90002 21.5996 10.3L21.7002 10.4C22.0996 10.7 22.0996 11.3 21.7002 11.7L17.4004 16L21.5996 20.2C22 20.6 22 21.2 21.5996 21.6C21.3662 21.8337 21.0645 21.9309 20.7744 21.8915C20.5674 21.8634 20.3662 21.7662 20.2002 21.6L16 17.4L11.7002 21.7C11.4004 22.1 10.7998 22.1 10.4004 21.7L10.2998 21.6C9.90039 21.3 9.90039 20.7 10.2998 20.3L14.5996 16L10.2998 11.7C10.0811 11.4811 9.98242 11.2021 10.0029 10.929C10.0205 10.7031 10.1191 10.4811 10.2998 10.3C10.7002 9.90002 11.2998 9.90002 11.7002 10.3L16 14.6Z"
                fill="white"
                fillOpacity="0.81"
              />
            </svg>
          </button>
          <div className="passenger-information__error">
            Номер свидетельства о рождении указан некорректно <br /> Пример:
            <span className="passenger-information__error-span">VIII-ЫП-123456</span>
          </div>
        </div>
      ) : passportError ? (
        <div className="passenger-information__error-wrapper">
          <button
            type="button"
            className="passenger-information__error-button"
            onClick={() => {
              setError(false);
              setPassportError(false);
              setBirthError(false);
              const seriesInput = document.querySelector(`input[id^="passportSeries-"]`);
              const numberInput = document.querySelector(`input[id^="passportNumber-"]`);
              if (seriesInput && !seriesInput.value) seriesInput.focus();
              else numberInput?.focus();
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM16 14.6L20.2998 10.3C20.5996 9.90002 21.2002 9.90002 21.5996 10.3L21.7002 10.4C22.0996 10.7 22.0996 11.3 21.7002 11.7L17.4004 16L21.5996 20.2C22 20.6 22 21.2 21.5996 21.6C21.3662 21.8337 21.0645 21.9309 20.7744 21.8915C20.5674 21.8634 20.3662 21.7662 20.2002 21.6L16 17.4L11.7002 21.7C11.4004 22.1 10.7998 22.1 10.4004 21.7L10.2998 21.6C9.90039 21.3 9.90039 20.7 10.2998 20.3L14.5996 16L10.2998 11.7C10.0811 11.4811 9.98242 11.2021 10.0029 10.929C10.0205 10.7031 10.1191 10.4811 10.2998 10.3C10.7002 9.90002 11.2998 9.90002 11.7002 10.3L16 14.6Z"
                fill="white"
                fillOpacity="0.81"
              />
            </svg>
          </button>
          <div className="passenger-information__error">
            Паспортные данные указаны некорректно <br />
            <span className="passenger-information__error-span">
              Пример: серия 1234, номер 567890
            </span>
          </div>
        </div>
      ) : isValid ? (
        <div className="passenger-information__success">
          <div className="passenger-information__success-left">
            <div className="passenger-information__success-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM10.2168 15.8293L10.207 15.8401C9.93262 16.1293 9.93262 16.6112 10.1973 16.9111C10.8311 17.5991 11.4551 18.2819 12.0703 18.9553C12.6914 19.6343 13.3037 20.3038 13.9092 20.9598C13.958 21.0134 14.0361 21.0134 14.085 20.9598L22.8018 11.4272C23.0664 11.1381 23.0664 10.6667 22.8018 10.3776L22.665 10.2169C22.4004 9.92773 21.959 9.92773 21.6953 10.2169L13.9189 18.7213C13.8799 18.7642 13.8311 18.7642 13.791 18.7213C12.9297 17.7681 12.0479 16.7933 11.1768 15.8401C10.9121 15.5509 10.4814 15.5509 10.2168 15.8293Z" fill="#F9FEF7" />
              </svg>
            </div>
            <span className="passenger-information__success-span">Готово</span>
          </div>
          <button type="submit" className="passenger-information__button">
            Следующий пассажир
          </button>
        </div>
      ) : (
        <div className="passenger-information__button-wrapper">
          <button type="submit" className="passenger-information__button">
            Следующий пассажир
          </button>
        </div>
      )}
      {modal.visible && (
        <ModalMessage
          type="error"
          title={modal.title}
          message={modal.message}
          onClose={closeModal}
        />
      )}
    </form>
  )
}

export default PassengerInformation;