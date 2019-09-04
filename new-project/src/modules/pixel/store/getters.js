const getters = {
  pixelUserName: state => state.app.userName,
  pixelNotice: state => state.app.notice,
  pixelJokes: state => state.app.jokes,
  pixelNoticeHeight: state => state.app.noticeHeight,
  pixelLoginHeight: state => state.app.loginHeight,
  pixelTalkWays: state => state.app.talkWays
}
export default getters
