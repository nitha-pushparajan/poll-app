import axios from 'axios';

export async function getQuestions() {
    return await axios.get('https://api.jsonbin.io/v3/b/66ae268ae41b4d34e41b1cce',{
        headers: {
            'X-Master-Key': '$2a$10$1KQLsnL96pHHlB/j3D5HGOBSxJL2aOxMcypQy/H1ZVXlfHHm96qTm'
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return new Promise((_resolve, reject) => {
                reject(error);
            });
        });
}

export async function submitAnswers(answers: any) {
    return await axios.post('https://api.jsonbin.io/v3/b/', {
        ...answers
    }, {
        headers: {
            'Content-Type': 'application/json',
             'X-Master-Key': '$2a$10$1KQLsnL96pHHlB/j3D5HGOBSxJL2aOxMcypQy/H1ZVXlfHHm96qTm'
        }
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return new Promise((_resolve, reject) => {
            reject(error);
        });
    });
}  