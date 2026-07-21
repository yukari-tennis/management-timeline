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