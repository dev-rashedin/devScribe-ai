'use server';

import  {axiosSecureApi } from "../api";

async function fetchAction(endpoint: string, body: object) {
  try {
    const res = await axiosSecureApi.post(endpoint, body);

    if (res.status < 200 || res.status >= 300) {
      return { success: false, error: 'Failed to fetch results' };
    }

    return { success: true, data: res.data };
  } catch (err: unknown) {
    return {
      success: false,
      error: `An error occurred: ${
        err instanceof Error ? err.message : 'Unknown error'
      }`,
    };
  }
}

//  async function saveHistory(
//   uid: string,
//   service: string,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   messages: any[],
//   title?: string
// ) {
//   return await fetchAction('/history', {
//     uid,
//     service,
//     messages,
//     title,
//   });
// }

export async function explain(_prevState: unknown, formData: FormData) {
  const code = formData.get('code');
  const language = formData.get('language');

  console.log('base url', import.meta.env.VITE_API_BASE_URL);

  const result = await fetchAction('/explain-code', { code, language });
  return result;
}

export async function refactor(_prevState: unknown, formData: FormData) {
  const code = formData.get('code');
  const language = formData.get('language');

  const result = await fetchAction('/refactor-code', { code, language });
  return result;
}

export async function writeArticle(_prevState: unknown, formData: FormData, uid: string) {
  const topic = formData.get('topic');

  const result = await fetchAction('/generate-article', { topic });

  if (!result.success) return result;


  const messages = [
    { role: 'user', content: `Write an article about ${topic}` },
    { role: 'assistant', content: result.data.article },
  ];

  const title = messages[0].content.slice(0, 30) + '...';

  await fetchAction('/history', {
    uid,
    service: 'article-writer',
    title,
    messages,
  });

  return result;
}
