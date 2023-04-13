function solution(D) {
// Initialize an empty dictionary to store the sum of values for each day of the week 
const daysOfWeek = { "Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0, "Sun": 0 };
// Convert the input dictionary to an array of [date, value] pairs
const data = Object.entries(D).map(([date, value]) => [new Date(date), value]);   
// Sort the data by date   data.sort(([date1], [date2]) => date1 - date2);  
// Iterate over each day and update the corresponding value in daysOfWeek  
for (let i = 0; i < data.length; i++) {    
const [date, value] = data[i];   
const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
daysOfWeek[dayOfWeek] += value;     
// Check if there are any missing days between the current and previous day  
if (i > 0) {    
const [prevDate, prevValue] = data[i - 1];   
const daysDiff = (date - prevDate) / (1000 * 60 * 60 * 24);  
if (daysDiff > 1) {     
const avgValue = (prevValue + value) / 2;  
const prevDayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][prevDate.getDay()];  
const nextDayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];    
for (let j = prevDayOfWeek.charCodeAt(0); j <= nextDayOfWeek.charCodeAt(0); j++) {    
const dayOfWeek = String.fromCharCode(j);       
daysOfWeek[dayOfWeek] += avgValue;      
}      
}    
}  
}  
return daysOfWeek;
}
//unit tests
describe("solution", () => 
{
test("returns the sum of values for each day of the week", () => {
const input = {  
"2020-01-01": 4, 
"2020-01-02": 4, 
"2020-01-03": 6, 
"2020-01-04": 8, 
"2020-01-05": 2, 
"2020-01-06": -6,
"2020-01-07": 2, 
"2020-01-08": -2,
};   
const output = {  
"Mon": -6,    
"Tue": 2, 
"Wed": 2, 
"Thu": 4, 
"Fri": 6, 
"Sat": 8, 
"Sun": 2, 
}; 
expect(solution(input)).toEqual(output);   
});    
test("returns the mean value for missing days", () => { 
const input = {  
"2020-01-01": 6, 
"2020-01-04": 12,
"2020-01-05": 14,
"2020-01-06": 2, 
"2020-01-07": 4, 
};  
const output = {  
"Mon": 2,  
"Tue": 4,  
"Wed": 6,  
"Thu": 8,
