function generateBasicAuthHeader(username, password) {
  // Combine the username and password with a colon
  const credentials = `${username}:${password}`;

  // Encode the credentials in Base64
  const base64Credentials = btoa(credentials);

  // Return the full Basic Authentication header
  return `Basic ${base64Credentials}`;
}

export default generateBasicAuthHeader;
