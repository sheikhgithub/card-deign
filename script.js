function renderCards(data) {
  const container = document.getElementById("card-container");
  container.innerHTML = ""; // Clear existing content

  data.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = `card ${card.type}`;

    // Header
    const headerClass = card.type === "expired" ? "expired-header" : card.type === "next" ? "next-header" : "";
    const header = `
      <div class="card-header ${headerClass}">
        <span class="status">${card.status}</span>
        <span class="id">${card.id}</span>
      </div>
    `;

    // Body
    let body = `
      <div class="card-body">
        <div class="direction">${card.direction}</div>
        <div class="payout">${card.payout}</div>
    `;

    if (card.price) {
      body += `
        <div class="price-box">
          <div class="label">${card.priceType}</div>
          <div class="price">${card.price}</div>
          <div class="change ${card.changeType}">${card.change}</div>
        </div>
      `;
    }

    body += `
      <div class="details">
        ${card.lockedPrice ? `<div><strong>Locked Price:</strong> ${card.lockedPrice}</div>` : ""}
        <div><strong>Prize Pool:</strong> <span class="bnb">${card.prizePool}</span></div>
      </div>
    `;

    if (card.type === "next") {
      body += `
        <div class="button-group">
          <button class="btn up">Enter UP</button>
          <button class="btn down">Enter DOWN</button>
        </div>
      `;
    }

    body += "</div>"; // Close card-body

    // Footer
    const footerClass = card.footerDirection.toLowerCase();
    const footer = `
      <div class="card-footer ${footerClass}">
        ${card.footerPayout} <strong>${card.footerDirection}</strong>
      </div>
    `;

    cardDiv.innerHTML = header + body + footer;
    container.appendChild(cardDiv);
  });
}

// Call the function with your card data
renderCards(cardData);
fetch('data.json')
  .then(response => response.json())
  .then(cardData => {
    renderCards(cardData); // Assuming you have a function that renders cards
  })
  .catch(error => console.error('Error loading JSON:', error));
