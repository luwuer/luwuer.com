export default {
  state: {
    userName: localStorage.getItem('userName') || '',
    notice: '',
    jokes: [],
    talkWays: [],
    noticeHeight: 0,
    loginHeight: 0
  },
  mutations: {
    pixelSetName(state, name) {
      state.userName = name
      localStorage.setItem('userName', name)
    },
    pixelSetNotice(state, notice) {
      state.notice = notice
    },
    pixelSetJokes(state, jokes) {
      state.jokes = jokes
    },
    pixelSetTalkWays(state, ways) {
      state.talkWays = ways
    },
    pixelSetNoticeHeight(state, h) {
      state.noticeHeight = h
    },
    pixelSetLoginHeight(state, h) {
      state.loginHeight = h
    }
  }
}
