

export const DateFormatter = (value:string) => {
    // Create a new Date object
let date = new Date(value);

// Extract the year, month, and day from the Date object
let year = date.getFullYear();
// Note: getMonth() returns the month from 0 to 11, so we need to add 1 to get the correct month
let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Padding with '0' if necessary
let day = date.getDate().toString().padStart(2, '0'); // Padding with '0' if necessary

// Form the desired date string in the format 'YYYY-MM-DD'
let formattedDate = `${year}-${month}-${day}`;

return formattedDate
    
};


