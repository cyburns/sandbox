import axios from "axios";

async function solveChallenge(email) {
  try {
    // Fetch the first challenge
    const firstChallengeResponse = await axios.get(
      `https://ciphersprint.pulley.com/${email}`
    );
    const firstChallenge = firstChallengeResponse.data;

    console.log("First Challenge:", firstChallenge);

    // Fetch the encrypted path from the first challenge
    const encryptedPathResponse = await axios.get(
      `https://ciphersprint.pulley.com/${firstChallenge.encrypted_path}`
    );
    const encryptedPath = encryptedPathResponse.data;

    console.log("Encrypted Path:", encryptedPath);

    // Handle encryption method
    let decryptedPath;
    switch (encryptedPath.encryption_method) {
      case "nothing":
        decryptedPath = encryptedPath.encrypted_path;
        break;
      case "encoded as base64":
        decryptedPath = Buffer.from(encryptedPath.encrypted_path, 'base64').toString('utf-8');
        break;
      // Add cases for other encryption methods if needed
      default:
        throw new Error("Unsupported encryption method");
    }

    console.log("Decrypted Path:", decryptedPath);

    // Fetch the next challenge using the decrypted path
    const nextChallengeResponse = await axios.get(
      `https://ciphersprint.pulley.com/${decryptedPath}`
    );
    const nextChallenge = nextChallengeResponse.data;

    console.log("Next Challenge:", nextChallenge);

    // Continue solving challenges if needed
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Replace 'cyrusburns@gmail.com' with your email
solveChallenge("cyrusburns@gmail.com");
