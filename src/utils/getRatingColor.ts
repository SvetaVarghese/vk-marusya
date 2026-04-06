export const getRatingColor = (rating: number) => {
   if (rating >= 8) return "rating--excellent"
   if (rating >= 6) return "rating--good"
   if (rating >= 4) return "rating--average"
   if (rating < 4) return "rating--bad"
}