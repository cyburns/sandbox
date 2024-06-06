async function fetchChallenge(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch challenge:", error);
    return null;
  }
}

function decryptPath(encryptedPath, encryptionMethod) {
  if (encryptionMethod === "nothing") {
    return encryptedPath;
  } else if (encryptionMethod === "encoded as base64") {
    return atob(encryptedPath);
  } else {
    // Handle other encryption methods if any
    return null;
  }
}

async function solveChallenge(initialEndpoint) {
  let currentEndpoint = initialEndpoint;

  // Fetch the initial challenge
  const initialChallenge = await fetchChallenge(currentEndpoint);

  if (!initialChallenge) {
    console.error("Failed to fetch initial challenge.");
    return;
  }

  // Get the encrypted path and encryption method from the initial challenge
  let { encrypted_path, encryption_method } = initialChallenge;

  while (true) {
    // Decrypt the path
    const decryptedPath = decryptPath(encrypted_path, encryption_method);

    if (!decryptedPath) {
      console.error("Failed to decrypt path.");
      return;
    }

    console.log("Decrypted path:", decryptedPath);

    // Check if the decrypted path is a valid URL
    if (!isValidURL(decryptedPath)) {
      console.error("Invalid URL:", decryptedPath);
      return;
    }

    // Fetch the challenge from the decrypted path
    const challenge = await fetchChallenge(decryptedPath);

    if (!challenge) {
      console.log("No more challenges.");
      return;
    }

    // Update encrypted_path and encryption_method for the next iteration
    encrypted_path = challenge.encrypted_path;
    encryption_method = challenge.encryption_method;
  }
}

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const initialEndpoint = "https://ciphersprint.pulley.com/cyrusburns@gmail.com";
solveChallenge(initialEndpoint);
