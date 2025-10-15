import moment from 'moment';
import countrycountryCodeJosn from './countryCode.json'
export function getProperty(obj: object, desc: string) {
  let arr = desc.split('.')
  // @ts-ignore
  while (arr.length && (obj = obj[arr.shift()]));
  return obj
}
export function toCapitalCase(str:string) {
  // Split the string into an array of words
  var words = str.toLowerCase().split(' ');

  // Capitalize the first letter of each word
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the capitalized words into a single string
  var capitalCaseStr = words.join(' ');

  return capitalCaseStr;
}
export function formatDateTime(date:Date) {
  if(!date){
    return date;
  }
 return moment(date).format('YYYY-MM-DD, hh:mm A')
}
export function formatDate(date:Date) {
  if(!date){
    return date;
  }
 return moment(date).format('YYYY-MM-DD')
}
export function formatTime(date:Date) {
  if(!date){
    return date;
  }
 return moment(date).format('hh:mm a')
}
export function getCountryCodeFromCurrency(currency:any){
  let countryCode = countrycountryCodeJosn[currency.toUpperCase()]
  return countryCode?countryCode.toLowerCase():null
}
export async function loadInitialData(includes=''){
  let url = `${API.OPTION}${includes}`
  const data = await useApi(url)
  const response: any = data
  return response
}


