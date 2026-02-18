const supabaseUrl = "https://biumroifsbjbkbbehspb.supabase.co";
const supabaseKey = "sb_publishable_rOO6y17Kc48f-wb6vcF26Q_xtbT3oCL";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// REGISTER
async function registerUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullName = document.getElementById("fullname").value;
    const role = document.getElementById("role").value;

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        alert(error.message);
        return;
    }

    await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        role: role
    });

    alert("Registration successful!");
}

// LOGIN
async function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert(error.message);
    } else {
        alert("Login successful!");
    }
}

// UPLOAD
async function uploadDocument() {
    const file = document.getElementById("fileInput").files[0];
    const title = document.getElementById("docTitle").value;

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user.id;

    const { data, error } = await supabase.storage
        .from("exam-files")
        .upload(`documents/${Date.now()}-${file.name}`, file);

    if (error) {
        alert(error.message);
        return;
    }

    await supabase.from("documents").insert({
        title: title,
        file_url: data.path,
        instructor_id: userId
    });

    alert("Upload successful!");
}
