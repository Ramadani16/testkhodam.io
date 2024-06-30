const khodams = [
    { name: 'Macan Putih', power: 'Legenda dari makhluk gaib berbentuk macan putih, yang mempunyai keberanian dan kekuatan fisik yang luar biasa.' },
    { name: 'Tuyul', power: 'Mempunyai kemampuan untuk mencuri harta atau memberikan keberuntungan finansial kepada pemiliknya.' },
    { name: 'Monyet', power: 'Makhluk cerdas dan lincah, serta memiliki keterkaitan dengan keahlian dalam berbagai hal.' },
    { name: 'Babi', power: 'Memiliki kecerdasan dan ketahanan yang luar biasa, serta melambangkan kelimpahan atau keberuntungan.' },
    { name: 'Singa', power: 'Memiliki kekuatan, keberanian, dan keadilan. Dalam mitologi, singa sering kali dihubungkan dengan raja atau penguasa yang kuat.' },
    { name: 'Buaya Darat', power: 'Memiliki sifat atau kekuatan unik yang khas, meskipun buaya biasanya dikenal sebagai makhluk air.' },
    { name: 'Kudanil', power: 'Kekuatan dan keberuntungan dalam beberapa budaya, meskipun bukan hewan yang ganas.' },
];

const form = document.getElementById('khodam-form');
const resultDiv = document.getElementById('result');
const khodamNamePara = document.getElementById('khodam-name');
const khodamPowerPara = document.getElementById('khodam-power');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('name').value.trim();
    if (!nameInput) {
        alert('Silakan masukkan nama Anda!');
        return;
    }

    // Cek apakah nama sudah pernah dimasukkan sebelumnya
    const storedKhodam = getStoredKhodam(nameInput);
    if (storedKhodam) {
        displayKhodam(storedKhodam);
    } else {
        // Cari khodam berdasarkan nama
        const foundKhodam = khodams.find(khodam => khodam.name.toLowerCase() === nameInput.toLowerCase());

        if (foundKhodam) {
            // Simpan nama dan khodam ke localStorage
            saveKhodamToStorage(nameInput, foundKhodam);
            displayKhodam(foundKhodam);
        } else {
            const randomKhodam = getRandomKhodam();
            // Simpan nama dan khodam random ke localStorage
            saveKhodamToStorage(nameInput, randomKhodam);
            displayKhodam(randomKhodam);
        }
    }
});

function displayKhodam(khodam) {
    khodamNamePara.textContent = `Nama Khodam: ${khodam.name}`;
    khodamPowerPara.textContent = `Keistimewaan: ${khodam.power}`;
    resultDiv.style.display = 'block';
}

function getRandomKhodam() {
    const randomIndex = Math.floor(Math.random() * khodams.length);
    return khodams[randomIndex];
}

function getStoredKhodam(name) {
    const storedKhodam = JSON.parse(localStorage.getItem('storedKhodams'));
    return storedKhodam && storedKhodam[name] ? storedKhodam[name] : null;
}

function saveKhodamToStorage(name, khodam) {
    let storedKhodams = JSON.parse(localStorage.getItem('storedKhodams')) || {};
    storedKhodams[name] = khodam;
    localStorage.setItem('storedKhodams', JSON.stringify(storedKhodams));
}
