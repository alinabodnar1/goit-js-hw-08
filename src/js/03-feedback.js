import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('input');
const messageRef = document.querySelector('textarea');

const LOCAL_STORAGE_KEY = "feedback-form-state";
const formData = {};

fillFields();

formRef.addEventListener('input', createSaveData);
formRef.addEventListener('submit', throttle(clearStorage, 500));

function createSaveData(event){

    formData[event.target.name] = event.target.value;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function fillFields() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    const parseData = JSON.parse(savedData);

    if (savedData) {
        
        const { email, message } = parseData;
        
        emailRef.value = email;
        messageRef.value = message;
        
    }
    return parseData;
}

const currentData = fillFields();

function clearStorage(event) {

    event.preventDefault();

    event.target.reset();

    console.log(currentData);

    localStorage.removeItem(LOCAL_STORAGE_KEY);
}

