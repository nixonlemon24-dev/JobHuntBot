// Fetch From API Online Code (for production, using a real API endpoint)
const LOCAL_URL = "http://localhost:3001/api/jobs";

export const fetchJobsFromRapid = async (query, location, page, datePosted) => {
  const res = await fetch(
    `${LOCAL_URL}?query=${query} in ${location}&page=${page}&type=remote&date_posted=${datePosted}`
  );
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  const data = await res.json();
  return data.data ?? [];
};


// api/jobs.js
// const N8N_URL = "https://nixtest.app.n8n.cloud/webhook-test/JobHuntBot";
// const N8N_URL = "http://localhost:5678/webhook-test/JobHuntBot";

// const LOCAL_URL = "http://localhost:3001/api/jobs";
// N8n Code (for reference, not used in production)
// export const filterJobsWithAI = async (message, location) => {
//   const res = await fetch(N8N_URL, {
//     method: "POST",
//     headers: { 
//       "Content-Type": "application/json", 
//       "ngrok-skip-browser-warning": "true" 
//     },
//     body: JSON.stringify({ message, location }),
//   });

//   const raw = await res.json();

//   // n8n AI Agent returns output as a plain string
//   const outputString = Array.isArray(raw) ? raw[0].output : raw.output;

//   // Strip markdown code fences if present
//   const cleaned = outputString
//     .replace(/```json\n?/g, "")
//     .replace(/```/g, "")
//     .trim();

//   // Parse the cleaned JSON string
//   const jobs = JSON.parse(cleaned);

//   // Handle both array and object responses
//   return Array.isArray(jobs) ? jobs : jobs.jobs ?? [];
// };

// export const filterJobsWithAI = async (message, location) => {
//   const res = await fetch(N8N_URL, {
//     method: "POST",
//     headers: { 
//       "Content-Type": "application/json", 
//       "ngrok-skip-browser-warning": "true" 
//     },
//     body: JSON.stringify({ message, location }),
//   });

//   if (!res.ok) {
//     throw new Error(`Request failed: ${res.status} ${res.statusText}`);
//   }

//   const text = await res.text();

//   if (!text || !text.trim()) {
//     throw new Error("Empty response from n8n — check your workflow has a Respond to Webhook node with output.");
//   }

//   let raw;
//   try {
//     raw = JSON.parse(text);
//   } catch (e) {
//     throw new Error(`Invalid JSON from n8n: ${text.slice(0, 200)}`);
//   }

//   const messageBlock = raw?.output?.find(o => o.type === "message");
//   if (!messageBlock) {
//     throw new Error(`No message block in response. Got: ${JSON.stringify(raw).slice(0, 200)}`);
//   }

//   let data;
//   try {
//     data = JSON.parse(messageBlock.content[0].text);
//   } catch (e) {
//     throw new Error(`Inner JSON parse failed: ${messageBlock.content[0].text}`);
//   }

//   return data.jobs ?? [];
// };



// //Anthropic Code
// // API.jsx
// // export const filterJobsWithAI = async (userMessage, jobs, location) => {
// //   const res = await fetch("http://localhost:3001/api/chat", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({ message: userMessage, jobs }),
// //   });

// //   if (!res.ok) {
// //     const err = await res.text();
// //     throw new Error(`Server error ${res.status}: ${err}`);
// //   }

// //   const data = await res.json();
// //   return data.jobs; // ← server returns { jobs: [...] }

// // };