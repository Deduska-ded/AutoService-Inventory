// Sākotnējie dati noliktavai
let data = [
    // Detaļas
    { name: "Eļļas filtrs", code: "OL-221", category: "detalas", qty: 12 },
    { name: "Bremžu disks (priekšējais)", code: "BR-FR-102", category: "detalas", qty: 4 },
    { name: "Bremžu disks (aizmugurējais)", code: "BR-RR-104", category: "detalas", qty: 3 },
    { name: "Bremžu kluči komplekts", code: "BR-PAD-330", category: "detalas", qty: 10 },
    { name: "Gaisa filtrs", code: "AF-019", category: "detalas", qty: 15 },
    { name: "Salona filtrs", code: "CF-087", category: "detalas", qty: 7 },

    // Materiāli
    { name: "Silikona smēre", code: "MAT-18", category: "materiali", qty: 9 },
    { name: "Bremžu tīrītājs", code: "MAT-32", category: "materiali", qty: 6 },
    { name: "Vara smēre", code: "MAT-47", category: "materiali", qty: 5 },
    { name: "Vītņu fiksators", code: "MAT-73", category: "materiali", qty: 8 },
    { name: "Smilšpapīrs (rullis)", code: "MAT-99", category: "materiali", qty: 4 },

    // Instrumenti
    { name: "Atslēgu komplekts 1/2\"", code: "INST-55", category: "instrumenti", qty: 3 },
    { name: "Domkrats 2T", code: "INST-12", category: "instrumenti", qty: 2 },
    { name: "Griezes moments atslēga", code: "INST-88", category: "instrumenti", qty: 1 },
    { name: "Plakanās skrūvgriezis", code: "INST-22", category: "instrumenti", qty: 5 },
    { name: "Krusta skrūvgriezis", code: "INST-23", category: "instrumenti", qty: 5 },

    // Riepas
    { name: "Vasaras riepa 205/55 R16", code: "TIRE-S-205-16", category: "riepas", qty: 16 },
    { name: "Ziemas riepa 195/65 R15", code: "TIRE-W-195-15", category: "riepas", qty: 8 },
    { name: "Vissezonas riepa 225/45 R17", code: "TIRE-A-225-17", category: "riepas", qty: 6 },

    // Eļļas un šķidrumi
    { name: "Motoreļļa 5W30 (4L)", code: "OIL-5W30-4L", category: "skidr", qty: 14 },
    { name: "Motoreļļa 5W40 (1L)", code: "OIL-5W40-1L", category: "skidr", qty: 20 },
    { name: "Dzesēšanas šķidrums G12", code: "COOL-G12-5L", category: "skidr", qty: 6 },
    { name: "Stiklu šķidrums ziemai", code: "WS-WIN-4L", category: "skidr", qty: 10 },
    { name: "Stiklu šķidrums vasarai", code: "WS-SUM-4L", category: "skidr", qty: 8 }
];

// Lasāmie nosaukumi kategorijām
const categoryNames = {
    detalas: "Detaļas",
    materiali: "Materiāli",
    instrumenti: "Instrumenti",
    riepas: "Riepas",
    skidr: "Eļļas un šķidrumi"
};

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.getElementById("saveBtn");

// Tabulas renderēšana ar filtriem
function renderTable() {
    tableBody.innerHTML = "";

    let filtered = data.filter(item => {
        return (
            (categoryFilter.value === "all" || item.category === categoryFilter.value) &&
            (
                item.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                item.code.toLowerCase().includes(searchInput.value.toLowerCase())
            )
        );
    });

    filtered.forEach(item => {
        const originalIndex = data.indexOf(item); // lai +1/-1 strādātu ar pareizo ierakstu

        let row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.code}</td>
                <td>${categoryNames[item.category] || item.category}</td>
                <td>${item.qty}</td>
                <td>
                    <button onclick="increase(${originalIndex})">+1</button>
                    <button onclick="decrease(${originalIndex})">-1</button>
                    <button onclick="removeItem(${originalIndex})" style="background:#d32f2f">Dzēst</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Daudzuma palielināšana
function increase(i) {
    data[i].qty++;
    renderTable();
}

// Daudzuma samazināšana
function decrease(i) {
    if (data[i].qty > 0) {
        data[i].qty--;
        renderTable();
    }
}

// Ieraksta dzēšana
function removeItem(i) {
    if (confirm("Vai tiešām dzēst šo ierakstu?")) {
        data.splice(i, 1);
        renderTable();
    }
}

// Modal loga atvēršana / aizvēršana
addBtn.onclick = () => modal.classList.remove("hidden");
closeBtn.onclick = () => modal.classList.add("hidden");

// Saglabāšana no modal loga
saveBtn.onclick = () => {
    let item = {
        name: document.getElementById("newName").value.trim(),
        code: document.getElementById("newCode").value.trim(),
        category: document.getElementById("newCategory").value,
        qty: Number(document.getElementById("newQty").value)
    };

    if (!item.name || !item.code || isNaN(item.qty)) {
        alert("Lūdzu aizpildi visus laukus pareizi!");
        return;
    }

    data.push(item);

    // Notīrīt laukus
    document.getElementById("newName").value = "";
    document.getElementById("newCode").value = "";
    document.getElementById("newQty").value = "";

    modal.classList.add("hidden");
    renderTable();
};

// Meklēšana / filtrēšana
searchInput.oninput = renderTable;
categoryFilter.onchange = renderTable;

// Pirmreizējā tabulas ielāde
renderTable();
