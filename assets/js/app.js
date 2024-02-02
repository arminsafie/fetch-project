//geting var
const subBtn = document.getElementById("sub-btn");
const userBtn = document.getElementById("user-btn");
const todoBtn = document.getElementById("todo-btn");
const postBtn = document.getElementById("post-btn");

const renderUser = (data, root) => {
  const table = document.createElement("table");
  table.classList.add("table");
  const tbody = document.createElement("tbody");

  data.map((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <tr>
          <th scope="row">${item.id}</th>
          <td>${item.name}</td>
          <td>${item.username}</td>
        </tr>
      `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  root.appendChild(table);
};

const renderTodo = (data, root) => {
  const table = document.createElement("table");
  table.classList.add("table");
  const tbody = document.createElement("tbody");
  data.map((item, index) => {
    if (index < 10) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <tr>
          <th scope="row">${item.id}</th>
          <td>${item.title}</td>
        </tr>
      `;
      tbody.appendChild(tr);
    } else {
      return;
    }
  });

  table.appendChild(tbody);
  root.appendChild(table);
};
const renderPost = (data, root) => {
  data.map((item, index) => {
    if (index < 10) {
      const col = document.createElement("div");
      col.classList.add("col-md-3");
      col.classList.add("mb-3");
      const card = document.createElement("div");
      card.classList.add("card");
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      cardBody.innerHTML = `
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.body}</p>
        `;
      card.appendChild(cardBody);
      col.appendChild(card);
      root.appendChild(col);
    }
  });
};

const renderData = (data, type) => {
  const root = document.getElementById("root");
  root.innerHTML = ``;

  switch (type) {
    case "users":
      {
        renderUser(data, root);
      }
      break;
    case "todo":
      {
        renderTodo(data, root);
      }
      break;
    case "post": {
      renderPost(data, root);
    }
  }
};
const sendRec = async (type, url, method = "GET") => {
  const res = await fetch(url, { method });
  const data = await res.json();
  renderData(data, type);
};

const sendPostRequest = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    const responseData = await res.json();
    console.log("Post request successful:", responseData);
  } catch (error) {
    console.error("Error sending post request:", error);
  }
};

userBtn.addEventListener("click", () => {
  sendRec("users", "https://jsonplaceholder.typicode.com/users", "GET");
});

todoBtn.addEventListener("click", () => {
  sendRec("todo", "https://jsonplaceholder.typicode.com/todos", "GET");
});

postBtn.addEventListener("click", () => {
  sendRec("post", "https://jsonplaceholder.typicode.com/posts", "GET");
});

subBtn.addEventListener("click", () => {
  const nameInput = document.getElementById("name");
  const userNameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");

  const postData = {
    name: nameInput.value,
    userName: userNameInput.value,
    email: emailInput.value,
  };

  const data = sendPostRequest(
    "https://jsonplaceholder.typicode.com/posts",
    postData
  );
});
