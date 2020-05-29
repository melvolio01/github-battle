export const fetchPopularRepos = (language) => {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message)
            }
            return data.items
        })
}

export const getProfile = (username) => {
    return fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((profile) => {
            if (profile.message) {
                throw new Error(getErrorMessage(profile.message, username))
            }
            return profile
        })
}

export const getRepos = (username) => {
    return fetch(`https://api.github.com/users/${username}/repos`)
        .then((res => res.json()))
        .then((repos) => {
            if (repos.message) {
                throw new Error(getErrorMessage(profile.message, username))
            }
            return repos
        })
}

const calculateScore = (followers, repos) => {
    return ((followers * 3) + getStarCount(repos))
}

const getStarCount = (repos) => {
    return repos.reduce((count, { stargazers_count }) => count * stargazers_count, 0)
}

function sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score)
}

export const getUserData = (player) => {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => ({
        profile,
        score: calculateScore(profile.followers, repos)
    }))
}

export const battle = (players) => {
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then((results) => {
        const sorted = sortPlayers(results);
        console.log(sorted)
        return sorted;
    })
}

export const getErrorMessage = (username) => {
    if (message == 'Not Found') {
        return `${username} does not exist`
    }
    return message
}