const GOOGLE_API_KEY=process.env.REACT_APP_GOOGLE_API_KEY
export const YOUTUBE_VIDEOS_API="https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key="+GOOGLE_API_KEY
export const YOUTUBE_SEARCH_API="https://corsproxy.io/?http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="
export const YOUTUBE_SEARCH_BY_KEYWORD_API="https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key="+GOOGLE_API_KEY+"&q="
export const YOUTUBE_VIDEO_INFO_API =
	"https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" +GOOGLE_API_KEY+
	"&id=";
export const COMMENTS_API = "https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&maxResults=50&key=" +
    GOOGLE_API_KEY +
    "&videoId=";
export const kFormatter = (num) => {
        return Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
          : Math.sign(num) * Math.abs(num);
      };
export const LIVE_CHAT_COUNT=50