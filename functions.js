
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getUrl(idx) {
    return `photos/${idx+1}.jpg`;
};

function getAvatar() {
    return `img/avatar-${getRandomInt(1, 6)}.svg`;
};

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function getComments(messages, names) {
    return Array.from({length: getRandomInt(1, 17)}, (_,index) => ({
        id: ++index,
        avatar: getAvatar(),
        message: getRandomElement(messages),
        name: getRandomElement(names)
    }));
};

module.exports = {getRandomInt, getUrl, getRandomElement, getComments};