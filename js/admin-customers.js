const currentUser = getCurrentUser();

if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "../login.html";
}

const customersTable =
    document.getElementById("customersTable");

function renderCustomers() {

    const users = getData("users", []);

    const orders = getData("orders", []);

    const customers = users.filter(
        user => user.role === "customer"
    );

    customersTable.innerHTML = "";

    if (customers.length === 0) {

        customersTable.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No customers registered.
                </td>
            </tr>
        `;

        return;
    }

    customers.forEach(customer => {

        const orderCount = orders.filter(
            order => order.userId === customer.id
        ).length;

        const joined = customer.createdAt
            ? new Date(customer.createdAt).toLocaleDateString("en-IN")
            : "-";

        customersTable.innerHTML += `
            <tr>

                <td>${customer.name}</td>

                <td>${customer.email}</td>

                <td>${customer.phone}</td>

                <td>${orderCount}</td>

                <td>${joined}</td>

            </tr>
        `;
    });
}

function logoutAdmin() {

    localStorage.removeItem("currentUser");

    window.location.href = "../login.html";
}

renderCustomers();