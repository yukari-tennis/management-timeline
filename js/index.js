async function loadCategories() {
  const { data, error } = await supabaseClient
    .from("categories")
    .select("*")
    .order("id");

  if (error) {
    console.error("カテゴリ取得エラー:", error);
    return;
  }

  const categorySelect = document.getElementById("category");

  data.forEach((category) => {
    const option = document.createElement("option");

    option.value = category.id;
    option.textContent = category.name;

    categorySelect.appendChild(option);
  });
}

loadCategories();

async function loadPeoples() {
  const { data, error } = await supabaseClient
    .from("people")
    .select("*")
    .order("id");

  if (error) {
    console.error("人物取得エラー:", error);
    return;
  }

  const categorySelect = document.getElementById("person");

  data.forEach((person) => {
    const option = document.createElement("option");

    option.value = person.id;
    option.textContent = person.name;

    categorySelect.appendChild(option);
  });
}

loadPeoples();

async function loadEvents() {
  const { data, error } = await supabaseClient
    .from("events")
    .select(`
      id,
      event_date_text,
      title,
      people (
        name
      ),
      categories (
        name
      )
    `)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    console.error("年表取得エラー:", error);
    return;
  }

  console.log("events =", data);

  const eventTable = document.getElementById("eventTable");
  eventTable.innerHTML = "";

  data.forEach((event) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${event.event_date_text ?? ""}</td>
      <td>${event.title ?? ""}</td>
      <td>${event.people?.name ?? ""}</td>
      <td>${event.categories?.name ?? ""}</td>
      <td></td>
      <td>
        <button class="btn btn-sm btn-outline-primary">
          編集
        </button>
      </td>
    `;

    eventTable.appendChild(row);
  });
}

loadEvents();
