export function getEmbedURL (url: string) {
   if (!url) return

   const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([\w-]{11})/);
   return match ? `https://www.youtube.com/embed/${match[1]}` : url
}