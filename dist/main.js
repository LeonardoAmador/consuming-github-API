"use strict";
const users = [];
const fetchUser = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    if (user.message) {
        console.log('User not found!');
    }
    else {
        users.push(user);
        console.log(`User ${user.login} was saved.\n` +
            `\nid: ${user.id}` +
            `\nlogin: ${user.login}` +
            `\nName: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nPublic repositories: ${user.public_repos}`);
    }
};
const showUser = async (username) => {
    const user = users.find(user => user.name === username);
    if (typeof user === 'undefined') {
        console.log('User not found');
    }
    else {
        const response = await fetch(user.repos_url);
        const repos = await response.json();
        let message = `id: ${user.id}\n` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`;
        repos.forEach(repo => {
            message += `\nNome: ${repo.name}` +
                `\nDescrição: ${repo.description}` +
                `\nEstrelas: ${repo.stargazers_count}` +
                `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`;
        });
        console.log(message);
    }
};
const showAllUsers = () => {
    let message = 'Users: \n';
    users.forEach(user => {
        message += `\n- ${user.login}`;
    });
    console.log(message);
};
const showTotalRepos = () => {
    const reposTotal = users.reduce((acc, user) => acc + user.public_repos, 0);
    console.log(`The group have total ${reposTotal} public repositories`);
};
const showTopFive = () => {
    // Nao modifica o array diretamente
    const topFive = users.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0, 5);
    let message = 'Top Five users with more public repositories: \n';
    topFive.forEach((user, index) => {
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositories.`;
    });
};
const main = async () => {
    await fetchUser('LeonardoAmador');
    await showUser('Leonardo Amador');
    showAllUsers();
    showTotalRepos();
    showTopFive();
};
main();
