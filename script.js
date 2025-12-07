let data = [
    { name: "Eļļas filtrs", code: "OL-221", category: "detalas", qty: 12 },
    { name: "Bremžu disks", code: "BR-102", category: "detalas", qty: 4 },
    { name: "Silikona smēre", code: "MAT-18", category: "materiali", qty: 9 },
    { name: "Atslēgu komplekts", code: "INST-55", category: "instrumenti", qty: 3 }
];

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.getElementById("saveBtn");

function renderTable() {
    tableBody.innerHTML = "";
    
    let filtered = data.filter(item => {
        return (
            (categoryFilter.value === "all" || item.category === categoryFilter.value) &&
            (item.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
             item.code.toLowerCase().includes(searchInput.value.toLowerCase()))
        );
    });

    filtered.forEach((item, index) => {
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.code}</td>
                <td>${item.category}</td>
                <td>${item.qty}</td>
                <td>
                    <button onclick="increase(${index})">+1</button>
                    <button onclick="decrease(${index})">-1</button>
                    <button onclick="removeItem(${index})" style="background:#d32f2f">Dzēst</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function increase(i) {
    data[i].qty++;
    renderTable();
}

function decrease(i) {
    if (data[i].qty > 0) data[i].qty--;
    renderTable();
}

function removeItem(i) {
    data.splice(i, 1);
    renderTable();
}

addBtn.onclick = () => modal.classList.remove("hidden");
closeBtn.onclick = () => modal.classList.add("hidden");

saveBtn.onclick = () => {
    let item = {
        name: document.getElementById("newName").value,
        code: document.getElementById("newCode").value,
        category: document.getElementById("newCategory").value,
        qty: Number(document.getElementById("newQty").value)
    };

    if (!item.name || !item.code) return alert("Aizpildi laukus!");

    data.push(item);
    modal.classList.add("hidden");
    renderTable();
};

searchInput.oninput = renderTable;
categoryFilter.onchange = renderTable;

renderTable();
