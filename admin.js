const supabase = window.supabase.createClient("YOUR_URL","YOUR_KEY");

async function loadStats(){
  const { data: users } = await supabase.from("profiles").select("*");
  const { data: docs } = await supabase.from("documents").select("*");
  const { data: purchases } = await supabase
      .from("purchases")
      .select("*")
      .eq("paid", true);

  document.getElementById("stats").innerHTML = `
    <p>Total Users: ${users.length}</p>
    <p>Total Documents: ${docs.length}</p>
    <p>Total Paid Purchases: ${purchases.length}</p>
  `;
}

async function loadUsers(){
  const { data } = await supabase.from("profiles").select("*");
  document.getElementById("output").innerHTML =
    data.map(u => `<p>${u.full_name} - ${u.role}</p>`).join("");
}

async function loadDocs(){
  const { data } = await supabase.from("documents").select("*");
  document.getElementById("output").innerHTML =
    data.map(d => `<p>${d.title}</p>`).join("");
}

async function loadRevenue(){
  const { data } = await supabase
      .from("purchases")
      .select("amount")
      .eq("paid", true);

  const total = data.reduce((sum, i)=> sum + i.amount, 0);
  document.getElementById("output").innerHTML =
    `<h3>Total Revenue: KES ${total}</h3>`;
}
