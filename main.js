// import dayjs from 'dayjs';

// async function fetchJson(url) {
//     const response = await fetch(url);
//     const obj = await response.json();
//     return obj;
// };

async function getChefBirthday(id) {
    let ricetta;

    try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        ricetta = await response.json();
    } catch (error) {
        throw new Error("Errore nel trovare la ricetta", error.message);
    };

    if (ricetta.message) {
        throw new Error(`Ricetta con id ${id} non trovata`);
    };

    let user;

    try {
        const response = await fetch(`https://dummyjson.com/users/${ricetta.userId}`);
        user = await response.json();
    } catch (error) {
        throw new Error("Errore nel trovare l'user", error.message);
    };

    if (user.message) {
        throw new Error(`User con id ${ricetta.userId} non trovato`);
    };


    return user.birthDate;
};

// getChefBirthday(1)
//     .then(birthDate => console.log('Data di nascita dello chef:', birthDate))
//     .catch(err => console.error(err));

(async () => {
    try {
        const result = await getChefBirthday(1);
        console.log('Data di nascita dello chef:', dayjs(result).format('DD/MM/YYYY'));
    } catch (error) {
        console.error(error);
    } finally {
        console.log('Fine del codice!');
    };
})();