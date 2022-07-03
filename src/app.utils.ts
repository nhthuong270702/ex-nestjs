import { ValidationPipe, HttpStatus } from '@nestjs/common';
const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const MESSAGE_ERROR = 'Password should hace 1 upper case, lower case letter along with a number and special character';

const VALIDATION_PIPE = new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
});


export const PASSWORD = {
    PASSWORD_RULE,
    MESSAGE_ERROR,
}

export const SETTING = {
    VALIDATION_PIPE
}

