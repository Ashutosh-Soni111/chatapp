import { useState, useEffect } from 'react';
import { octokit } from './Octokit';
export default function useOctokit(path) {
   const [code, setCode] = useState(null);
   
   useEffect(() => {
     async function onLoad() {
       await octokit.request(
          'GET /repos/{owner}/{repo}/contents/{path}', {
             owner: 'Ashutosh-Soni111',
             repo: 'DataForBandb',
             path: `Assets/Data/${path}`
       }).then(res => console.log(res))
       .catch(err => console.log(err));
    }
onLoad();
},[])
return {
   code
    }
};