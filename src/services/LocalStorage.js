export function removeItem(itemToRemove) {
    window.localStorage.removeItem(itemToRemove);
}

export function getItem(item) {
    return window.localStorage.getItem(item) || '{}';
}

export function addItem(localStorageName, newItem) {
    window.localStorage.setItem(localStorageName, newItem);
}

export function getEcoleStored() {
    const data = getItem('gesco')
    const parsed = JSON.parse(data)
    
    return parsed?.user?.ecole_id
}

export function getTokenId() {
    const data = getItem('gesco')
    const parsed = JSON.parse(data)
    
    return parsed?.token_id
}

export function getUserStored() {
    const data = getItem('gesco')
    const parsed = JSON.parse(data)
    
    return parsed?.user
}

export function getEcoleStore() {
    const data = getItem('gesco')
    const parsed = JSON.parse(data)
    
    return parsed?.ecole
}

export function getHeaders() {
    const local = getItem('gesco')
    const dataParsed = JSON.parse(local)
    
    const headers = {}
    headers.Accept = 'application/json'
    headers.ContentType = "application/json"
    headers.Authorization = `Bearer ${dataParsed?.access_token}`
    
    return headers
}

export function getHeadersWithForm() {
    //const local = getItem('gesco')
    //const dataParsed = JSON.parse(local)
    
    const headers = {}
    headers.Accept = 'application/json'
    headers.ContentType = 'multipart/form-data'
    //headers.Authorization = `Bearer ${dataParsed?.access_token}`
    
    return headers
}