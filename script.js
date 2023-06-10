'use strict'
const block = document.querySelector('.heroes');
const form = document.querySelector('form')
const url = '../dbimage/dbHeroes.json'
const input = document.querySelector('.header__search');

const getData = async (url) => {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

getData(url)
	.then(data => {
		renderElements(data)
	})


const renderElements = (data) => {
	const block = document.querySelector('.heroes')
	block.innerHTML = '';

	data.forEach((heroe) => {
			const card = document.createElement('div');
			card.classList.add('card')
			card.innerHTML = `
			<img src='dbimage/${heroe.photo}' class='photo'/>
			<div class='card-bottom'>
			<p class='text actors'>Актеры: ${heroe.actors}</p>
			<p class='text birth-day'>День рождения: ${heroe.birthDay ? heroe.birthDay : 'Неизвестно'}</p>
			<p class='text death-day'>День гибели: ${heroe.deathDay ? heroe.deathDay : 'Неизвестно'}</p>
			<p class='text gender'>Пол: ${heroe.gender}</p>
			<p class='text movies'>Фильмы: ${heroe.movies ? heroe.movies.map((movie) => `${movie}`) : ''}</p>
			<p class='text name'>Имя героя: ${heroe.name}</p>
			<p class='text real-name'>Реальное имя: ${heroe.realName ? heroe.realName : 'Неизвестно'}</p>
			<p class='text species'>Специальность: ${heroe.species}</p>
			<p class='text cityzenship'>Страна: ${heroe.citizenship ? heroe.citizenship : 'Неизвестно'}</p>
			<p class='text status'>Статус: ${heroe.status}</p>
			</div>
			`
			block.append(card)
	})
}

const movieSearch = async (data, word) => { 
    const response = await data(url);
    if(!word) {
        renderElements(response)
        return;
    }

    const searchElements = response.filter(hero => hero.movies && hero.movies.some(movie => movie.toLowerCase().includes(word.toLowerCase())))

    renderElements(searchElements);
    return;
}

form.addEventListener('submit', (e) => {
	e.preventDefault()
		movieSearch(getData, input.value)
})
