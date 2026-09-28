const currentUser = getCurrentUser();

if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "../login.html";
}

const ordersTable = document.getElementById("ordersTable");

function renderOrders() {

    const orders = getData("orders", []);

    ordersTable.innerHTML = "";

    if (orders.length === 0) {
        ordersTable.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No orders found.
                </td>
            </tr>
        `;
        return;
    }

    [...orders].reverse().forEach(order => {

        const items = order.items
            .map(item => `${item.name} × ${item.quantity}`)
            .join(", ");

        const date = new Date(order.createdAt)
            .toLocaleString("en-IN");

        ordersTable.innerHTML += `
            <tr>

                <td>${order.id}</td>

                <td>
                    ${order.customerName}
                    <br>
                    <small>${order.phone}</small>
                </td>

                <td>${items}</td>

                <td>${formatCurrency(order.total)}</td>

                <td>
                    ${order.paymentMethod}
                    <br>
                    <small>${order.paymentStatus}</small>
                </td>

                <td>${date}</td>

                <td>

                    <select
                        onchange="updateStatus('${order.id}', this.value)"
                        class="status-select">

                        <option value="Placed"
                            ${order.status === "Placed" ? "selected" : ""}>
                            Placed
                        </option>

                        <option value="Preparing"
                            ${order.status === "Preparing" ? "selected" : ""}>
                            Preparing
                        </option>

                        <option value="Out for Delivery"
                            ${order.status === "Out for Delivery" ? "selected" : ""}>
                            Out for Delivery
                        </option>

                        <option value="Delivered"
                            ${order.status === "Delivered" ? "selected" : ""}>
                            Delivered
                        </option>

                        <option value="Cancelled"
                            ${order.status === "Cancelled" ? "selected" : ""}>
                            Cancelled
                        </option>

                    </select>

                </td>

            </tr>
        `;
    });
}

function updateStatus(orderId, newStatus) {

    const orders = getData("orders", []);

    const order = orders.find(
        order => order.id === orderId
    );

    if (!order) return;

    order.status = newStatus;

    saveData("orders", orders);

    alert(`Order ${orderId} updated to ${newStatus}.`);

    renderOrders();
}

function logoutAdmin() {

    localStorage.removeItem("currentUser");

    window.location.href = "../login.html";
}

renderOrders();