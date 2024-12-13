(async () => {
  // load script helper
  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

  // load sdk
  await loadScript(
    "https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js"
  );
  await loadScript(
    "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore-compat.js"
  );
  await loadScript(
    "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth-compat.js"
  );

  // firebase config
  const firebaseConfig = {
    apiKey: "<YOUR-API-KEY>",
    authDomain: "<YOUR-AUTH-DOMAIN>",
    projectId: "<YOUR-PROJECT-ID>",
  };

  // init firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();

  // log collection for proof of concept
  window.logCollection = async (collectionName) => {
    try {
      const snapshot = await db.collection(collectionName).get();
      snapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
      });
    } catch (error) {
      console.error("Error getting collection:", error);
    }
  };

  // register new acc
  window.registerWithEmail = async (email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("Registered user:", userCredential.user);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  // sign in helper
  window.signInWithEmail = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log("Signed in user:", userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // done init
  console.log("firebase init complete 🎉");

  // example usage
  console.log("example usage:");
  console.log("logCollection('users')");
  console.log("registerWithEmail('test@example.com', 'password')");
  console.log("signInWithEmail('test@example.com', 'password')");
})();
