import axios from 'axios';

const ApiService = () => {
    axios.get("https://github.com/Ashutosh-Soni111/DataForBandb/blob/9b35d56d2544a9ca7effde3797b8aacde01d9bf5/Assets/Data/Data.tsx")
    .then(response => {
        console.log(response)
    })
    .catch(error=> {
        console.log(error)
    })
}

export default ApiService;