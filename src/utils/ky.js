import ky from "ky";

console.log({ test: import.meta.env.VITE_API_URL });

export default ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
});
