const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const cars = [
  { id: 1, brand: 'BMW', model: '530i', year: 2022, price: 32500, color: 'შავი', hex: '#171717', fuel: 'ბენზინი', trans: 'ავტომატიკა', km: 42000, images: [photo('photo-1555215695-3004980ad54e'), photo('photo-1552519507-da3b142c6e3d'), photo('photo-1503376780353-7e6692767b70')] },
  { id: 2, brand: 'Mercedes-Benz', model: 'E-Class', year: 2021, price: 38900, color: 'თეთრი', hex: '#f5f5f5', fuel: 'დიზელი', trans: 'ავტომატიკა', km: 51000, images: [photo('photo-1618843479313-40f8afb4b4d8'), photo('photo-1618843479313-40f8afb4b4d8'), photo('photo-1618843479313-40f8afb4b4d8')] },
  { id: 3, brand: 'Toyota', model: 'Camry Hybrid', year: 2023, price: 28900, color: 'ვერცხლისფერი', hex: '#c5c5c5', fuel: 'ჰიბრიდი', trans: 'ავტომატიკა', km: 21000, images: [photo('photo-1621007947382-bb3c3994e3fb'), photo('photo-1621007947382-bb3c3994e3fb'), photo('photo-1621007947382-bb3c3994e3fb')] },
  { id: 4, brand: 'Audi', model: 'A6 Quattro', year: 2022, price: 41500, color: 'ლურჯი', hex: '#233b65', fuel: 'ბენზინი', trans: 'ავტომატიკა', km: 33000, images: [photo('photo-1606664515524-ed2f786a0bd6'), photo('photo-1603584173870-7f23fdae1b7a'), photo('photo-1606664515524-ed2f786a0bd6')] },
  { id: 5, brand: 'Porsche', model: '911 Carrera', year: 2023, price: 145000, color: 'წითელი', hex: '#c62828', fuel: 'ბენზინი', trans: 'ავტომატიკა', km: 8500, images: [photo('photo-1503376780353-7e6692767b70'), photo('photo-1503376780353-7e6692767b70'), photo('photo-1503376780353-7e6692767b70')] },
  { id: 6, brand: 'Tesla', model: 'Model 3', year: 2023, price: 31000, color: 'თეთრი', hex: '#f5f5f5', fuel: 'ელექტრო', trans: 'ავტომატიკა', km: 19000, images: [photo('photo-1560958089-b8a1929cea89'), photo('photo-1560958089-b8a1929cea89'), photo('photo-1560958089-b8a1929cea89')] },
  { id: 7, brand: 'Lexus', model: 'RX 350', year: 2022, price: 47500, color: 'შავი', hex: '#171717', fuel: 'ბენზინი', trans: 'ავტომატიკა', km: 39000, images: [photo('photo-1606664515524-ed2f786a0bd6'), photo('photo-1606664515524-ed2f786a0bd6'), photo('photo-1606664515524-ed2f786a0bd6')] },
  { id: 8, brand: 'Ford', model: 'Mustang GT', year: 2021, price: 42000, color: 'წითელი', hex: '#c62828', fuel: 'ბენზინი', trans: 'მექანიკა', km: 26000, images: [photo('photo-1584345604476-8ec5f82d718a'), photo('photo-1584345604476-8ec5f82d718a'), photo('photo-1584345604476-8ec5f82d718a')] },
  { id: 9, brand: 'Honda', model: 'CR-V', year: 2022, price: 26500, color: 'ნაცრისფერი', hex: '#888888', fuel: 'ჰიბრიდი', trans: 'ავტომატიკა', km: 35000, images: [photo('photo-1519641471654-76ce0107ad1b'), photo('photo-1519641471654-76ce0107ad1b'), photo('photo-1519641471654-76ce0107ad1b')] },
  { id: 10, brand: 'Range Rover', model: 'Sport', year: 2023, price: 89000, color: 'შავი', hex: '#171717', fuel: 'დიზელი', trans: 'ავტომატიკა', km: 16000, images: [photo('photo-1519641471654-76ce0107ad1b'), photo('photo-1519641471654-76ce0107ad1b'), photo('photo-1519641471654-76ce0107ad1b')] },
  { id: 11, brand: 'Hyundai', model: 'Tucson', year: 2022, price: 23900, color: 'ლურჯი', hex: '#233b65', fuel: 'ბენზინი', trans: 'ავტომატიკა', km: 29000, images: [photo('photo-1519641471654-76ce0107ad1b'), photo('photo-1519641471654-76ce0107ad1b'), photo('photo-1519641471654-76ce0107ad1b')] },
  { id: 12, brand: 'Lamborghini', model: 'Huracan', year: 2022, price: 235000, color: 'ყვითელი', hex: '#e9c62e', fuel: 'ბენზინი', trans: 'ავტომატიკა', km: 6200, images: [photo('photo-1544636331-e26879cd4d9b'), photo('photo-1544636331-e26879cd4d9b'), photo('photo-1544636331-e26879cd4d9b')] },
];

const money = (n) => `$${n.toLocaleString('en-US')}`;

function savedCars() {
  try {
    return JSON.parse(localStorage.getItem('veloraSaved')) || [];
  } catch {
    return [];
  }
}

function updateCount() {
  document.getElementById('count').textContent = savedCars().length;
}

function showPage(page) {
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  document.querySelectorAll('nav button').forEach((b) => b.classList.toggle('active', b.dataset.page === page));

  if (page === 'catalog') filterCars();
  if (page === 'cart') renderCart();
  if (page === 'home') renderFeatured();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function card(car) {
  const saved = savedCars().includes(car.id);
  return `
    <article class="car-card" data-id="${car.id}">
      <div class="car-photo">
        <img class="main-photo" data-index="0" src="${car.images[0]}" alt="${car.brand} ${car.model}" loading="lazy" />
        <div class="photo-tools">
          <span class="photo-count">▧ ${car.images.length} ფოტო</span>
          <button class="heart ${saved ? 'saved' : ''}" data-save="${car.id}" aria-label="შენახვა">${saved ? '♥' : '♡'}</button>
        </div>
      </div>
      <div class="car-info">
        <div class="car-heading">
          <div>
            <h3>${car.brand} ${car.model}</h3>
            <span class="car-year">${car.year} წელი</span>
          </div>
          <div class="car-price">${money(car.price)}<small>სრული ფასი</small></div>
        </div>
        <div class="car-specs">
          <span>◷ ${car.km.toLocaleString()} კმ</span>
          <span>⛽ ${car.fuel}</span>
          <span>⚙ ${car.trans}</span>
        </div>
        <div class="car-bottom">
          <span class="car-color"><i class="color-dot" style="background:${car.hex}"></i>${car.color}</span>
          <div class="gallery-buttons">
            <button data-prev="${car.id}" type="button">‹</button>
            <button data-next="${car.id}" type="button">›</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function render(id, list) {
  document.getElementById(id).innerHTML = list.map(card).join('');
}

function renderFeatured() {
  render('featuredCars', cars.slice(0, 3));
}

function renderCart() {
  const list = cars.filter((car) => savedCars().includes(car.id));
  render('cartCars', list);
  document.getElementById('cartCount').textContent = `${list.length} ავტომობილი`;
  document.getElementById('cartEmpty').hidden = list.length > 0;
}

function refresh() {
  updateCount();

  if (document.getElementById('catalog').classList.contains('active')) filterCars();
  if (document.getElementById('cart').classList.contains('active')) renderCart();
  if (document.getElementById('home').classList.contains('active')) renderFeatured();
}

function toggleSaved(id) {
  let list = savedCars();
  list = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem('veloraSaved', JSON.stringify(list));
  refresh();
}

function filterCars() {
  const valueOf = (id) => document.getElementById(id).value;
  const query = valueOf('query').trim().toLowerCase();
  const brand = valueOf('brand');
  const min = Number(valueOf('minPrice')) || 0;
  const max = Number(valueOf('maxPrice')) || Infinity;
  const year = Number(valueOf('year')) || 0;
  const color = valueOf('color');
  const fuel = valueOf('fuel');
  const trans = valueOf('transmission');
  const sort = valueOf('sort');

  let list = cars.filter(
    (car) =>
      (`${car.brand} ${car.model}`).toLowerCase().includes(query) &&
      (!brand || car.brand === brand) &&
      car.price >= min &&
      car.price <= max &&
      car.year >= year &&
      (!color || car.color === color) &&
      (!fuel || car.fuel === fuel) &&
      (!trans || car.trans === trans)
  );

  if (sort === 'low') list.sort((a, b) => a.price - b.price);
  if (sort === 'high') list.sort((a, b) => b.price - a.price);
  if (sort === 'new') list.sort((a, b) => b.year - a.year);

  render('catalogCars', list);
  document.getElementById('resultCount').textContent = `ნაპოვნია ${list.length} ავტომობილი`;
  document.getElementById('noResults').hidden = list.length > 0;
}

function resetFilters() {
  ['query', 'brand', 'minPrice', 'maxPrice', 'year', 'color', 'fuel', 'transmission'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  document.getElementById('sort').value = 'default';
  filterCars();
}

document.addEventListener('click', (event) => {
  const save = event.target.closest('[data-save]');
  if (save) {
    toggleSaved(Number(save.dataset.save));
    return;
  }

  const next = event.target.closest('[data-next]');
  const prev = event.target.closest('[data-prev]');

  if (next || prev) {
    const button = next || prev;
    const car = cars.find((item) => item.id === Number(button.dataset.next || button.dataset.prev));
    const image = button.closest('.car-card').querySelector('.main-photo');
    let index = Number(image.dataset.index || 0);

    index = next ? (index + 1) % car.images.length : (index - 1 + car.images.length) % car.images.length;
    image.dataset.index = index;
    image.src = car.images[index];
  }
});

document.getElementById('homeSearch').addEventListener('submit', (event) => {
  event.preventDefault();
  showPage('catalog');
  document.getElementById('query').value = document.getElementById('homeQuery').value;
  document.getElementById('minPrice').value = document.getElementById('homeMin').value;
  document.getElementById('maxPrice').value = document.getElementById('homeMax').value;
  filterCars();
});

['query', 'brand', 'minPrice', 'maxPrice', 'year', 'color', 'fuel', 'transmission', 'sort'].forEach((id) => {
  document.getElementById(id).addEventListener('input', filterCars);
});

document.getElementById('reset').addEventListener('click', resetFilters);

renderFeatured();
filterCars();
renderCart();
updateCount();
