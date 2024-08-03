import axios from 'axios';

export async function getQuestions() {
    return await axios.get('https://run.mocky.io/v3/55159063-f760-44e4-902c-695f2343dab0')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return new Promise((_resolve, reject) => {
                reject(error);
            });
        });
}

export async function submitAnswers() {
    return await axios.post('https://api.example.com/my-endpoint', {
        firstName: 'Fred',
        lastName: 'Flintstone',
        orders: [1, 2, 3],
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
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