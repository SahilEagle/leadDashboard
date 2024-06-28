import validator from 'validator';

const validateVisitor = (data) => {
    const errors = {};

    if (!data.name || validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    if (!data.visitDate || !validator.isDate(data.visitDate)) {
        errors.visitDate = 'Valid visit date is required';
    }

    if (!data.email || !validator.isEmail(data.email)) {
        errors.email = 'Valid email is required';
    }

    if (!data.city || validator.isEmpty(data.city)) {
        errors.city = 'City is required';
    }

    if (!data.role || validator.isEmpty(data.role)) {
        errors.role = 'Role is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};

export default validateVisitor;
