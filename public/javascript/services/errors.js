/**
 * Return an error message for an empty field
 *
 * @param {string} fieldName - Name of the field
 * @return {string} Empty field error message
 */
export const generateEmptyFieldMessage = (fieldName) => {
    return `${fieldName} must not be empty`;
}

/**
 * Return an error message for a field with invalid length
 *
 * @param {string} fieldName - Name of the field
 * @param {number} maxLimit - The maximum input limit
 * @param {number} minLimit - The minimum input limit
 * @return {string} invalid length error message
 */
 export const generateInvalidLengthMessage = (fieldName, maxLimit, minLimit = -1) => {
    console.log(minLimit > -1);
    const errorMessage = minLimit > -1 ? `must be between ${minLimit} and ${maxLimit}` : `must have a length of ${maxLimit}`
    return `${fieldName} ${errorMessage}`;
}
