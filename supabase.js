const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
script.onload = () => {
  // Once the script is loaded, define the functions
  const { createClient } = supabase;
  
  const url = "URL_HERE";
  const key = "KEY_HERE";
  const supabaseClient = createClient(url, key);

  async function getTables() {
    const response = await fetch(`${url}/rest/v1/?apikey=${key}`);
    const data = await response.json();
    console.log("Tables:", data.definitions);

    const tableNames = Object.keys(data.definitions);
    tableNames.forEach((tableName) => {
      console.log(`Run getTable('${tableName}') to fetch data from ${tableName}`);
    });
  }

  async function getTable(tableName) {
    const { data, error } = await supabaseClient
      .from(tableName)
      .select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log(`Data from ${tableName}:`, data);
    }
  }

  window.getTables = getTables;
  window.getTable = getTable;

  console.log("Run getTables() to fetch table definitions.");
};
document.head.appendChild(script);
