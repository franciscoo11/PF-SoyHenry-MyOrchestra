import axios from 'axios'

export async function findOrCreateUser(name: string, mail: string) {
  const response = await axios.post("http://localhost:3000/api/users", {
    name,
    mail,
  });
  return response;
}

export async function searchCurrentUser(name: string) {
  const response = await axios.get(`http://localhost:3000/api/users/${name}`);
  return response.data;
}